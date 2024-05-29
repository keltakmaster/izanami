import { Form, constraints, format, type } from "@maif/react-forms";
import * as React from "react";
import { WEBHOOK_NAME_REGEXP } from "../utils/patterns";
import { useMutation, useQuery } from "react-query";
import {
  createWebhook,
  deleteWebhook,
  fetchWebhookUsers,
  fetchWebhooks,
  queryTenant,
  tenantQueryKey,
  updateWebhook,
  updateWebhookRightsFor,
  webhookQueryKey,
  webhookUserQueryKey,
} from "../utils/queries";
import { Loader } from "../components/Loader";
import { Tooltip } from "../components/Tooltip";
import { AllContexts } from "../components/AllContextSelect";
import { FeatureSelector } from "../components/FeatureSelector";
import { ProjectSelector } from "../components/ProjectSelector";
import { LightWebhook, TLevel, Webhook } from "../utils/types";
import { GenericTable } from "../components/GenericTable";
import { NavLink } from "react-router-dom";
import {
  IzanamiContext,
  hasRightForWebhook,
  useTenantRight,
} from "../securityContext";
import queryClient from "../queryClient";

import { RightTable } from "../components/RightTable";
import { useState } from "react";
import { InvitationForm } from "../components/InvitationForm";
import { WebhookTransformationEditor } from "../components/Editor";
import Handlebars from "handlebars";
import { Row } from "@tanstack/react-table";

export function WebHooks(props: { tenant: string }) {
  const tenant = props.tenant;
  const [creating, setCreating] = React.useState(false);
  const { askConfirmation } = React.useContext(IzanamiContext);
  const hasTenantWriteLevel = useTenantRight(tenant, TLevel.Write);

  const webhookCreationMutation = useMutation(
    (data: { webhook: LightWebhook }) => createWebhook(tenant!, data.webhook),
    {
      onSuccess: () => queryClient.invalidateQueries(webhookQueryKey(tenant)),
    }
  );

  const webhookUpdateMutation = useMutation(
    (data: { id: string; webhook: LightWebhook }) =>
      updateWebhook(tenant!, data.id, data.webhook),
    {
      onSuccess: () => queryClient.invalidateQueries(webhookQueryKey(tenant)),
    }
  );

  const webhookDeletion = useMutation(
    (data: { id: string }) => deleteWebhook(tenant!, data.id),
    {
      onSuccess: () => queryClient.invalidateQueries(webhookQueryKey(tenant)),
    }
  );

  const webhookQuery = useQuery(webhookQueryKey(tenant), () =>
    fetchWebhooks(tenant)
  );

  if (webhookQuery.isError) {
    return <div>Failed to fetch webhooks for this tenant</div>;
  } else if (webhookQuery.data) {
    return (
      <>
        <div className="d-flex align-items-center">
          <h1>Webhooks</h1>
          {hasTenantWriteLevel && !creating && webhookQuery?.data?.length > 0 && (
            <button
              className="btn btn-primary btn-sm mb-2 ms-3"
              type="button"
              onClick={() => setCreating(true)}
            >
              Create new webhook
            </button>
          )}
        </div>
        {creating && (
          <WebHookCreationForm
            tenant={tenant}
            cancel={() => setCreating(false)}
            submit={(webhook) => {
              const bodyOverloadedActive = webhook.bodyOverloadedActive;
              const objectHeaders = webhook.headers.reduce(
                (
                  acc: { [x: string]: string },
                  { name, value }: { name: string; value: string }
                ) => {
                  acc[name] = value;
                  return acc;
                },
                {}
              );
              return webhookCreationMutation
                .mutateAsync({
                  webhook: {
                    ...webhook,
                    headers: objectHeaders,
                    bodyTemplate: bodyOverloadedActive
                      ? webhook.bodyTemplate
                      : undefined,
                  },
                })
                .then(() => setCreating(false));
            }}
          />
        )}
        {!creating && webhookQuery.data.length === 0 && (
          <div className="item-block">
            <div className="item-text">
              There is no webhooks for this tenant.
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => setCreating(true)}
            >
              Create new webhook
            </button>
          </div>
        )}
        {webhookQuery.data.length > 0 && (
          <GenericTable
            idAccessor={(hook) => hook.id}
            data={webhookQuery.data}
            columns={[
              {
                accessorKey: "name",
                header: () => "Name",
                size: 15,
                minSize: 100,
              },
              {
                accessorKey: "enabled",
                cell: (info: any) =>
                  info.getValue() ? (
                    <span className="activation-status enabled-status">
                      Enabled
                    </span>
                  ) : (
                    <span className="activation-status">Disabled</span>
                  ),
                header: () => "Status",
                minSize: 150,
                size: 10,
                meta: {
                  valueType: "status",
                },
              },
              {
                id: "description",
                header: () => "Description",
                size: 20,
                cell: (props: any) => {
                  return <>{props.getValue()}</>;
                },
              },
              {
                accessorKey: "url",
                header: () => "URL",
                size: 25,
              },
              {
                header: () => "Scope",
                id: "scope",
                minSize: 200,
                accessorKey: "features",
                size: 25,
                filterFn: (
                  row: Row<Webhook>,
                  columnId: string,
                  filterValue: any
                ) => {
                  if (!filterValue || filterValue?.length === 0) {
                    return true;
                  }
                  console.log("filterValue", filterValue);
                  const featureMatch = Boolean(
                    row.original?.features?.find(({ name }) =>
                      name.includes(filterValue)
                    ) || false
                  );

                  const projectMatch = Boolean(
                    row.original?.projects?.find(({ name }) =>
                      name.includes(filterValue)
                    ) || false
                  );

                  return featureMatch || projectMatch;
                },
                cell: (info) => {
                  const features = info.row.original?.features ?? [];
                  const projects = info.row.original?.projects ?? [];

                  return (
                    <>
                      {projects.map(({ name, id }) => (
                        <div key={id}>
                          <NavLink
                            className="white-link"
                            to={`/tenants/${tenant}/projects/${name}`}
                          >
                            <i className="fas fa-building" aria-hidden />
                            &nbsp;
                            {name}
                          </NavLink>
                        </div>
                      ))}
                      {features.map(({ project, name, id }) => (
                        <div key={id}>
                          {name} (
                          <NavLink
                            className="white-link"
                            to={`/tenants/${tenant}/projects/${project}`}
                          >
                            <i className="fas fa-building" aria-hidden />
                            &nbsp;{project}
                          </NavLink>
                          )
                        </div>
                      ))}
                    </>
                  );
                },
              },
            ]}
            customRowActions={{
              edit: {
                icon: (
                  <>
                    <i className="bi bi-pencil-square" aria-hidden></i> Edit
                  </>
                ),
                hasRight: (user, webhook) =>
                  hasRightForWebhook(user, TLevel.Write, webhook.name, tenant),
                customForm: (data, cancel) => (
                  <WebHookCreationForm
                    tenant={tenant}
                    cancel={() => cancel()}
                    submit={(hook) => {
                      webhookUpdateMutation
                        .mutateAsync({
                          id: data.id,
                          webhook: {
                            ...hook,
                            bodyTemplate: hook.bodyOverloadedActive
                              ? hook.bodyTemplate
                              : undefined,
                          },
                        })
                        .then(() => cancel());
                    }}
                    defaultValue={data}
                  />
                ),
              },
              rights: {
                icon: (
                  <>
                    <i className="fa-solid fa-lock"></i> Rights
                  </>
                ),
                hasRight: (user, webhook) =>
                  hasRightForWebhook(user, TLevel.Admin, webhook.name, tenant),
                customForm: (webhook: Webhook, cancel) => (
                  <>
                    <WebhookRightTable tenant={tenant} webhook={webhook} />
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-danger m-2" onClick={cancel}>
                        Cancel
                      </button>
                    </div>
                  </>
                ),
              },
              delete: {
                icon: (
                  <>
                    <i className="bi bi-trash" aria-hidden></i>&nbsp;Delete
                  </>
                ),
                action: (webhook: Webhook) =>
                  askConfirmation(
                    `Are you sure you want to delete webhook ${webhook.name} ?`,
                    () => webhookDeletion.mutateAsync({ id: webhook.id })
                  ),
                hasRight: (user, webhook) =>
                  hasRightForWebhook(user, TLevel.Admin, webhook.name, tenant),
              },
            }}
          />
        )}
      </>
    );
  } else {
    return <Loader message="Loading webhooks..." />;
  }
}

function WebhookRightTable(props: { tenant: string; webhook: Webhook }) {
  const { tenant, webhook } = props;
  const [creating, setCreating] = useState(false);

  const webhookRighQuery = useQuery(
    webhookUserQueryKey(tenant, webhook.id),
    () => fetchWebhookUsers(tenant, webhook.id)
  );

  const webhookRightUpdateMutation = useMutation(
    (data: { user: string; right?: TLevel }) =>
      updateWebhookRightsFor(tenant, webhook.id, data.user, data.right),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(webhookUserQueryKey(tenant, webhook.id)),
    }
  );

  if (webhookRighQuery.error) {
    return <div>Failed to retrieve webhook users</div>;
  } else if (webhookRighQuery.data) {
    return (
      <>
        <h4>
          Authorized users for {webhook.name}
          <button
            className="btn btn-primary btn-sm ms-3"
            type="button"
            onClick={() => setCreating(true)}
          >
            Invite user
          </button>
        </h4>
        {creating && (
          <InvitationForm
            cancel={() => setCreating(false)}
            submit={({ users, level }) => {
              Promise.all(
                users.map((user) => {
                  webhookRightUpdateMutation.mutateAsync({
                    user,
                    right: level,
                  });
                })
              ).then(() => setCreating(false));
            }}
          />
        )}
        <RightTable
          data={webhookRighQuery.data}
          canEdit={true}
          onRightChange={(datum, level) =>
            webhookRightUpdateMutation.mutateAsync({
              user: datum.username,
              right: level,
            })
          }
        />
      </>
    );
  } else {
    return <Loader message="Loading webhook users..." />;
  }
}

function WebHookCreationForm(props: {
  tenant: string;
  cancel: () => void;
  submit: (data: any) => void;
  defaultValue?: Webhook;
}) {
  const tenant = props.tenant;
  const projectQuery = useQuery(tenantQueryKey(tenant), () =>
    queryTenant(tenant)
  );
  const maybeDefault = props.defaultValue;

  if (projectQuery.isError) {
    return <div>Failed to fetch projects for this tenant</div>;
  } else if (projectQuery.data) {
    return (
      <div className="sub_container anim__rightToLeft">
        <h4>Create new webhook</h4>
        <Form
          schema={{
            name: {
              defaultValue: maybeDefault?.name ?? "",
              label: () => (
                <>
                  Name*
                  <Tooltip id="webhook-name">
                    Name of the webhook.
                    <br />
                    Use something meaningfull, it can be modified without
                    impact.
                  </Tooltip>
                </>
              ),
              type: type.string,
              props: {
                autoFocus: true,
              },
              constraints: [
                constraints.required("Name is required"),
                constraints.matches(
                  WEBHOOK_NAME_REGEXP,
                  `Key name must match regex ${WEBHOOK_NAME_REGEXP.toString()}`
                ),
              ],
            },
            enabled: {
              defaultValue: maybeDefault?.enabled ?? false,
              label: "Enabled",
              type: type.bool,
            },
            description: {
              label: "Description",
              type: type.string,
              format: format.textarea,
              defaultValue: maybeDefault?.description ?? "",
            },
            url: {
              label: () => (
                <>
                  URL*
                  <Tooltip id="webhook-url">
                    URL to call.
                    <br />
                    This will be called each time related features are modified.
                  </Tooltip>
                </>
              ),
              type: type.string,
              defaultValue: maybeDefault?.url ?? "",
              constraints: [
                constraints.required("URL is required"),
                constraints.test(
                  "url",
                  "Should be a valid http/https url",
                  (value) => {
                    try {
                      new URL(value);
                      return value.startsWith("http");
                    } catch (err) {
                      return false;
                    }
                  }
                ),
              ],
            },
            headers: {
              label: () => (
                <>
                  Headers
                  <Tooltip id="webhook-headers">
                    Headers to use for HTTP(S) calls.
                    <br />
                    This can be used to provide some authentication information.
                  </Tooltip>
                </>
              ),
              type: type.object,
              defaultValue: Object.entries(maybeDefault?.headers ?? {}).map(
                ([key, value]) => ({ name: key, value })
              ),
              array: true,
              render: ({ value, onChange }) => {
                return (
                  <Headers
                    value={value}
                    onChange={(newArray) => {
                      onChange?.(newArray);
                    }}
                  />
                );
              },
            },
            features: {
              defaultValue: maybeDefault?.features?.map((f) => f.id) ?? [],
              label: () => (
                <>
                  Features (project)
                  <Tooltip id="webhooks-features">
                    Update of selected features will trigger calls on provided
                    url.
                  </Tooltip>
                </>
              ),
              isMulti: true,
              type: type.string,
              format: format.select,
              render: ({ value, onChange }) => {
                return <FeatureSelector value={value} onChange={onChange} />;
              },
              arrayConstraints: [
                constraints.test(
                  "feature-or-project",
                  "You must select at least one feature or project",
                  (value, { parent: { projects } }) => {
                    return value.length > 0 || projects.length > 0;
                  }
                ),
              ],
            },
            projects: {
              defaultValue: maybeDefault?.projects?.map((p) => p.id) ?? [],
              label: () => (
                <>
                  Projects
                  <Tooltip id="webhook-projects">
                    Update of on of these projects features
                    <br />
                    will trigger calls on provided url.
                  </Tooltip>
                </>
              ),
              type: type.string,
              isMulti: true,
              format: format.select,
              render: ({ value, onChange }) => {
                return <ProjectSelector value={value} onChange={onChange} />;
              },
              arrayConstraints: [
                constraints.test(
                  "feature-or-project",
                  "You must select at least one feature or project",
                  (value, { parent: { features } }) => {
                    return value.length > 0 || features.length > 0;
                  }
                ),
              ],
            },
            context: {
              defaultValue: maybeDefault?.context ?? "",
              label: () => (
                <>
                  Context
                  <Tooltip id="webhook-context">
                    Context to use for activation and conditions.
                  </Tooltip>
                </>
              ),
              type: type.string,
              render: ({ value, onChange }) => {
                return (
                  <AllContexts onChange={(v) => onChange?.(v)} value={value} />
                );
              },
            },
            user: {
              defaultValue: maybeDefault?.user ?? "",
              label: () => {
                return (
                  <>
                    User
                    <Tooltip id="webhook-context">
                      User used to compute user based activation conditions
                      <br />
                      such as percentage and user list features.
                    </Tooltip>
                  </>
                );
              },
              type: type.string,
            },
            bodyOverloadedActive: {
              label: () => (
                <>
                  Custom body
                  <Tooltip id="webhook-body-format-customization-tooltip">
                    Allow replacing built-in webhook call body with custom body.
                  </Tooltip>
                </>
              ),
              type: type.bool,
              defaultValue: !!maybeDefault?.bodyTemplate,
            },
            bodyTemplate: {
              constraints: [
                constraints.test(
                  "handlebars",
                  "Should be a valid handlebar template",
                  (value) => {
                    try {
                      const template = Handlebars.compile(value);
                      template({});
                      return true;
                    } catch (e) {
                      console.error(e);
                      return false;
                    }
                  }
                ),
              ],
              visible: ({ rawValues: { bodyOverloadedActive } }) =>
                bodyOverloadedActive,
              label: () => {
                return (
                  <>
                    Body format
                    <Tooltip id="webhook-body-format">
                      Customize call body using an handlebar template.
                    </Tooltip>
                  </>
                );
              },
              type: type.string,
              defaultValue:
                maybeDefault?.bodyTemplate ??
                `{
  "active": {{payload.active}}
}`,
              render: ({ value, onChange }) => {
                return (
                  <WebhookTransformationEditor
                    value={value}
                    onChange={(v) => onChange?.(v)}
                  />
                );
              },
            },
          }}
          onSubmit={(webhook: any) => {
            props.submit(webhook);
          }}
          footer={({ valid }: { valid: () => void }) => (
            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-danger m-2"
                onClick={() => props.cancel()}
              >
                Cancel
              </button>
              <button className="btn btn-success m-2" onClick={valid}>
                Save
              </button>
            </div>
          )}
        />
      </div>
    );
  } else if (projectQuery) {
    return <Loader message="Loading projects..." />;
  }
}

function Headers(props: {
  value: { name: string; value: string }[];
  onChange: (newValue: { name: string; value: string }[]) => void;
}) {
  const arr = props.value;
  return (
    <div className="container-fluid row-gap-3">
      {arr.length > 0 && (
        <div className="row">
          <label className="col-6 col-lg-3">Header name</label>
          <label className="col">Header value</label>
        </div>
      )}
      {arr.map(({ name, value }, index) => (
        <div className="row" key={`header-${index}`}>
          <div className="col-6 col-lg-3">
            <label hidden htmlFor={`header-${index}-name`}>
              Header {index} name
            </label>
            <input
              className="form-control"
              id={`header-${index}-name`}
              value={name}
              onChange={(e) => {
                const v = e.target.value;
                props.onChange([
                  ...arr
                    .slice(0, index)
                    .concat([{ name: v, value }])
                    .concat(arr.slice(index + 1)),
                ]);
              }}
            />
          </div>
          <div className="col">
            <label hidden htmlFor={`header-${index}-value`}>
              Header {index} value
            </label>
            <input
              className="form-control"
              id={`header-${index}-value`}
              value={value}
              onChange={(e) => {
                const v = e.target.value;
                props.onChange([
                  ...arr
                    .slice(0, index)
                    .concat([{ name, value: v }])
                    .concat(arr.slice(index + 1)),
                ]);
              }}
            />
          </div>
          <div className="col-1 d-flex justify-content-end">
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                props.onChange([
                  ...arr.slice(0, index).concat(arr.slice(index + 1)),
                ]);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="row justify-content-end mt-3">
        <div className="col-auto">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              props.onChange([...arr, { name: "", value: "" }]);
            }}
          >
            Add header
          </button>
        </div>
      </div>
    </div>
  );
}
