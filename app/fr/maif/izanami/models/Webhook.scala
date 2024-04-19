package fr.maif.izanami.models

import play.api.libs.json.{Format, JsError, JsNull, JsResult, JsString, JsSuccess, JsValue, Json, Reads, Writes}

import java.net.{URI, URL}
import java.util.UUID
import scala.util.Try

case class LightWebhook(
    name: String,
    description: String,
    url: URL,
    headers: Map[String, String],
    features: Set[String],
    projects: Set[String],
    context: String,
    user: String,
    enabled: Boolean,
    bodyTemplate: Option[String],
    id: Option[UUID] = None
)

case class Webhook(
    id: UUID,
    name: String,
    description: String,
    url: URL,
    headers: Map[String, String],
    features: Set[WebhookFeature],
    projects: Set[WebhookProject],
    context: String,
    user: String,
    enabled: Boolean,
    bodyTemplate: Option[String]
)

case class WebhookFeature(id: String, name: String, project: String)
case class WebhookProject(id: String, name: String)

object Webhook {
  val webhookWrite: Writes[Webhook] = o => {
    Json.obj(
      "id"          -> o.id,
      "enabled" -> o.enabled,
      "name"        -> o.name,
      "url"         -> o.url.toString,
      "description" -> o.description,
      "headers"     -> o.headers,
      "context"     -> o.context,
      "user"        -> o.user,
      "features"    -> o.features.map(f =>
        Json.obj(
          "name"    -> f.name,
          "project" -> f.project,
          "id"      -> f.id
        )
      ),
      "projects"    -> o.projects.map(p =>
        Json.obj(
          "name" -> p.name,
          "id"   -> p.id
        )
      ),
      "bodyTemplate" -> o.bodyTemplate
    )
  }
}

object LightWebhook {
  val lightWebhookRead: Reads[LightWebhook] = json => {
    (for (
      name       <- (json \ "name").asOpt[String];
      enabled       <- (json \ "enabled").asOpt[Boolean];
      urlStr     <- (json \ "url").asOpt[String];
      url        <- Try {
                      new URI(urlStr).toURL
                    }.toOption;
      headers     = (json \ "headers").asOpt[Map[String, String]].getOrElse(Map());
      description = (json \ "description").asOpt[String].getOrElse("");
      user        = (json \ "user").asOpt[String].getOrElse("");
      context     = (json \ "context").asOpt[String].getOrElse("");
      features    = (json \ "features").asOpt[Set[String]].getOrElse(Set());
      projects    = (json \ "projects").asOpt[Set[String]].getOrElse(Set());
      bodyTemplate =  (json \ "bodyTemplate").toOption.flatMap {
        case JsString(str) => Some(str)
        case _ => None
      }
    ) yield {
      if (features.isEmpty && projects.isEmpty) {
        JsError("A webhook must have at least one feature or project")
      } else {
        val hook = LightWebhook(
          name = name,
          description = description,
          url = url,
          headers = headers,
          features = features,
          context = context,
          user = user,
          projects = projects,
          enabled = enabled,
          bodyTemplate = bodyTemplate
        )
        JsSuccess(hook)
      }
    })getOrElse(JsError("Bad body format"))
  }
}
