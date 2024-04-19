package fr.maif.izanami.datastores

import fr.maif.izanami.datastores.webhookImplicits.WebhookRow
import fr.maif.izanami.env.Env
import fr.maif.izanami.env.pgimplicits.EnhancedRow
import fr.maif.izanami.errors.{IzanamiError, WebhookCreationFailed, WebhookDoesNotExists}
import fr.maif.izanami.events.{EventService, IzanamiEvent}
import fr.maif.izanami.models.RightLevels.RightLevel
import fr.maif.izanami.models.{LightWebhook, Webhook, WebhookFeature, WebhookProject}
import fr.maif.izanami.utils.Datastore
import fr.maif.izanami.utils.syntax.implicits.BetterJsValue
import io.vertx.core.json.JsonObject
import io.vertx.sqlclient.Row
import play.api.libs.json.Json

import java.net.{URI, URL}
import java.util
import java.util.UUID
import scala.concurrent.Future
import scala.jdk.CollectionConverters.MapHasAsJava

class WebhooksDatastore(val env: Env) extends Datastore {

  def createWebhookCall(tenant: String, webhook: UUID, eventId: Long): Future[Boolean] = {
    env.postgresql
      .queryOne(
        s"""
         |INSERT INTO webhooks_call_status (webhook, event) VALUES($$1,$$2)
         |RETURNING webhook
         |""".stripMargin,
        List(webhook, java.lang.Long.valueOf(eventId)),
        schemas = Set(tenant)
      ) { r =>
        {
          Some(true)
        }
      }
      .map(o => o.getOrElse(false))
      .recover(ex => {
        false
      })
  }

  def updateWebhookCallDate(tenant: String, webhook: UUID, eventId: Long): Future[Unit] = {
    env.postgresql
      .queryOne(
        s"""
           |UPDATE webhooks_call_status SET last_call=NOW()
           |WHERE webhook=$$1
           |AND event=$$2
           |RETURNING webhook
           |""".stripMargin,
        List(webhook, java.lang.Long.valueOf(eventId)),
        schemas = Set(tenant)
      ) { r =>
        Some(())
      }
      .map(_ => ())
  }

  def deleteWebhookCall(tenant: String, webhook: UUID, eventId: Long): Future[Unit] = {
    env.postgresql
      .queryRaw(
        s"""
           |DELETE FROM webhooks_call_status
           |WHERE webhook=$$1
           |AND event=$$2
           |RETURNING webhook
           |""".stripMargin,
        List(webhook, java.lang.Long.valueOf(eventId)),
        schemas = Set(tenant)
      ) { _ => () }
  }

  def findAbandoneddWebhooks(tenant: String): Future[Seq[(LightWebhook, IzanamiEvent)]] = {
    env.postgresql.queryAll(
      s"""
         |SELECT w.*, e.event,
         |  COALESCE(json_agg(wf.feature) FILTER (WHERE wf.feature IS NOT NULL), '[]') as features,
         |  COALESCE(json_agg(wp.project) FILTER (WHERE wp.project IS NOT NULL), '[]') as projects
         |  FROM webhooks_call_status wcs, events e, webhooks w
         |  LEFT JOIN webhooks_features wf ON wf.webhook=w.id
         |  LEFT JOIN webhooks_projects wp ON wp.webhook=w.id
         |  WHERE EXTRACT(EPOCH FROM (NOW() - wcs.last_call)) > $$1
         |  AND w.id = wcs.webhook
         |  AND e.id = wcs.event
         |  GROUP BY w.id, e.event
         |""".stripMargin,
      List(java.lang.Long.valueOf(300)),
      schemas = Set(tenant)
    ) { r =>
      for (
        webhook      <- r.optLightWebhook();
        event        <- r.optJsObject("event");
        izanamiEvent <- event.asOpt[IzanamiEvent](EventService.eventFormat)
      ) yield (webhook, izanamiEvent)
    }
  }

  def updateWebhook(tenant: String, id: UUID, webhook: LightWebhook): Future[Either[IzanamiError, Unit]] = {
    env.postgresql.executeInTransaction(
      conn => {
        env.postgresql
          .queryOne(
            s"""
           |DELETE FROM webhooks_features WHERE webhook=$$1
           |""".stripMargin,
            List(id),
            conn = Some(conn)
          ) { _ => Some(()) }
          .flatMap(_ =>
            env.postgresql.queryOne(
              s"""
             |DELETE FROM webhooks_projects WHERE webhook=$$1
             |""".stripMargin,
              List(id),
              conn = Some(conn)
            ) { _ => Some(()) }
          )
          .flatMap(_ =>
            env.postgresql.queryOne(
              s"""
             |INSERT INTO webhooks_features(webhook, feature) VALUES($$1, UNNEST($$2::text[]))
             |""".stripMargin,
              List(id, webhook.features.toArray),
              conn = Some(conn)
            ) { _ => Some(()) }
          )
          .flatMap(_ =>
            env.postgresql.queryOne(
              s"""
             |INSERT INTO webhooks_projects(webhook, project) VALUES($$1, UNNEST($$2::uuid[]))
             |""".stripMargin,
              List(id, webhook.projects.map(UUID.fromString).toArray),
              conn = Some(conn)
            ) { _ => Some(()) }
          )
          .flatMap(_ =>
            env.postgresql
              .queryOne(
                s"""
             |UPDATE webhooks SET
             |name=$$2,
             |description=$$3,
             |url=$$4,
             |username=$$5,
             |headers=$$6,
             |context=$$7,
             |enabled=$$8,
             |body_template=$$9
             |WHERE id=$$1
             |RETURNING id
             |""".stripMargin,
                List(
                  id,
                  webhook.name,
                  webhook.description,
                  webhook.url.toString,
                  webhook.user,
                  Json.toJson(webhook.headers).vertxJsValue,
                  webhook.context,
                  java.lang.Boolean.valueOf(webhook.enabled),
                  webhook.bodyTemplate.orNull
                ),
                conn = Some(conn)
              ) { _ => Some(()) }
              .map(_.toRight(WebhookDoesNotExists(id.toString)))
          )
      },
      schemas = Set(tenant)
    )
  }

  def deleteWebhook(tenant: String, webhook: String): Future[Either[IzanamiError, Unit]] = {
    env.postgresql
      .queryOne(
        s"""
         |DELETE FROM webhooks WHERE id=$$1
         |RETURNING id
         |""".stripMargin,
        List(webhook),
        schemas = Set(tenant)
      ) { r => Some(()) }
      .map(_.toRight(WebhookDoesNotExists(webhook)))
  }

  def findWebhooksForScope(
      tenant: String,
      featureIds: Set[String],
      projectNames: Set[String]
  ): Future[Seq[LightWebhook]] = {
    env.postgresql.queryAll(
      s"""
         |SELECT
         |    w.id,
         |    w.name,
         |    w.url,
         |    w.headers,
         |    w.username,
         |    w.description,
         |    w.context,
         |    w.enabled,
         |    w.body_template,
         |    COALESCE(json_agg(wf.feature) FILTER (WHERE wf.feature IS NOT NULL), '[]') as features,
         |    COALESCE(json_agg(wp.project) FILTER (WHERE wp.project IS NOT NULL), '[]') as projects
         |FROM webhooks w
         |LEFT JOIN projects p ON p.name=ANY($$2)
         |LEFT JOIN webhooks_features wf ON (wf.feature=ANY($$1) AND wf.webhook=w.id)
         |LEFT JOIN webhooks_projects wp ON (wp.project=p.id AND wp.webhook=w.id)
         |WHERE wf.feature is not null or wp.project is not null
         |GROUP BY w.id
         |""".stripMargin,
      params = List(featureIds.toArray, projectNames.toArray),
      schemas = Set(tenant)
    ) { r => r.optLightWebhook() }
  }

  def listWebhook(tenant: String, user: String): Future[Seq[Webhook]] = {
    env.postgresql.queryAll(
      s"""
         SELECT
         |    w.id,
         |    w.name,
         |    w.url,
         |    w.description,
         |    w.headers,
         |    w.username,
         |    w.context,
         |    w.enabled,
         |    w.body_template,
         |    COALESCE(json_agg(json_build_object('name', p.name, 'id', p.id)) FILTER (WHERE p.id IS NOT NULL), '[]') as projects,
         |    COALESCE(json_agg(json_build_object('name', f.name, 'id', f.id, 'project', f.project)) FILTER (WHERE f.id IS NOT NULL), '[]') as features
         |FROM webhooks w
         |LEFT OUTER JOIN webhooks_features wf ON wf.webhook = w.id
         |LEFT OUTER JOIN features f ON f.id=wf.feature
         |LEFT OUTER JOIN webhooks_projects wp ON wp.webhook = w.id
         |LEFT OUTER JOIN projects p ON p.id = wp.project
         |LEFT OUTER JOIN izanami.users u ON u.username=$$1
         |LEFT OUTER JOIN users_webhooks_rights wr ON (wr.username=u.username AND wr.webhook=w.name)
         |LEFT OUTER JOIN izanami.users_tenants_rights utr ON (utr.username=u.username AND utr.tenant=$$2)
         |WHERE
         |  wr.level IS NOT NULL
         |  OR utr.level = 'ADMIN'
         |  OR u.admin = true
         |GROUP BY w.id""".stripMargin,
      params = List(user, tenant),
      schemas = Set(tenant)
    ) { r =>
      {
        for (
          name        <- r.optString("name");
          enabled     <- r.optBoolean("enabled");
          description <- r.optString("description");
          context     <- r.optString("context");
          user        <- r.optString("username");
          url         <- r.optString("url");
          headersJson <- r.optJsObject("headers");
          headers     <- headersJson.asOpt[Map[String, String]];
          id          <- r.optUUID("id");
          featureJson <- r.optJsArray("features");
          features     = featureJson.value
                           .map(jsObj => {
                             for (
                               fname <- (jsObj \ "name").asOpt[String];
                               pname <- (jsObj \ "project").asOpt[String];
                               id    <- (jsObj \ "id").asOpt[String]
                             ) yield WebhookFeature(name = fname, project = pname, id = id)
                           })
                           .collect { case Some(value) =>
                             value
                           }
                           .toSet;
          projectJson <- r.optJsArray("projects");
          projects     = projectJson.value
                           .map(jsObj => {
                             for (
                               pname <- (jsObj \ "name").asOpt[String];
                               id    <- (jsObj \ "id").asOpt[String]
                             ) yield WebhookProject(name = pname, id = id)
                           })
                           .collect { case Some(value) =>
                             value
                           }
                           .toSet;
          bodyTemplate = r.optString("body_template")
        )
          yield Webhook(
            name = name,
            id = id,
            headers = headers,
            url = URI.create(url).toURL,
            features = features,
            projects = projects,
            description = description,
            context = context,
            user = user,
            enabled = enabled,
            bodyTemplate = bodyTemplate
          )
      }
    }
  }
  def createWebhook(tenant: String, webhook: LightWebhook, username: String): Future[Either[IzanamiError, String]] = {
    env.postgresql.executeInTransaction(
      conn => {
        env.datastores.featureContext.env.postgresql
          .queryOne(
            s"""
           |INSERT INTO webhooks (name, description, url, headers, context, username, enabled, body_template) VALUES ($$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8)
           |RETURNING id
           |""".stripMargin,
            List(
              webhook.name,
              webhook.description,
              webhook.url.toString,
              Json.toJson(webhook.headers).vertxJsValue,
              webhook.context,
              webhook.user,
              java.lang.Boolean.valueOf(webhook.enabled),
              webhook.bodyTemplate.orNull
            ),
            conn = Some(conn)
          ) { r => r.optUUID("id").map(_.toString) }
          .map(_.toRight(WebhookCreationFailed()))
          .flatMap {
            case Right(id) if webhook.features.nonEmpty =>
              env.postgresql
                .queryOne(
                  s"""
               |INSERT INTO webhooks_features (webhook, feature) VALUES ($$1, UNNEST($$2::text[]))
               |""".stripMargin,
                  params = List(id, webhook.features.toArray),
                  conn = Some(conn)
                ) { _ => Some(id) }
                .map(_ => Right(id))
            case either                                 => Future.successful(either)
          }
          .flatMap {
            case Right(id) if webhook.projects.nonEmpty =>
              env.postgresql
                .queryOne(
                  s"""
                     |INSERT INTO webhooks_projects (webhook, project) VALUES ($$1, UNNEST($$2::uuid[]))
                     |""".stripMargin,
                  params = List(id, webhook.projects.map(str => UUID.fromString(str)).toArray),
                  conn = Some(conn)
                ) { _ => Some(id) }
                .map(_ => Right(id))
            case either                                 => Future.successful(either)
          }
          .flatMap {
            case Right(id) =>
              env.postgresql
                .queryOne(
                  s"""
                     |INSERT INTO users_webhooks_rights (webhook, username, level) VALUES ($$1, $$2, 'ADMIN')
                     |""".stripMargin,
                  params = List(webhook.name, username),
                  conn = Some(conn)
                ) { _ => Some(id) }
                .map(_ => Right(id))
            case either    => Future.successful(either)
          }
      },
      schemas = Set(tenant)
    )
  }
}

object webhookImplicits {
  implicit class WebhookRow(val r: Row) extends AnyVal {
    def optLightWebhook(): Option[LightWebhook] = {
      {
        for (
          name         <- r.optString("name");
          enabled      <- r.optBoolean("enabled");
          description  <- r.optString("description");
          context      <- r.optString("context");
          user         <- r.optString("username");
          url          <- r.optString("url");
          headersJson  <- r.optJsObject("headers");
          headers      <- headersJson.asOpt[Map[String, String]];
          id           <- r.optUUID("id");
          featuresJson <- r.optJsArray("features");
          features      = featuresJson.value.map(_.as[String]).toSet;
          projectsJson <- r.optJsArray("projects");
          projects      = projectsJson.value.map(_.as[String]).toSet;
          bodyTemplate  = r.optString("body_template")
        )
          yield LightWebhook(
            name = name,
            description = description,
            url = URI.create(url).toURL,
            headers = headers,
            features = features,
            projects = projects,
            context = context,
            user = user,
            enabled = enabled,
            id = Some(id),
            bodyTemplate = bodyTemplate
          )
      }
    }
  }
}
