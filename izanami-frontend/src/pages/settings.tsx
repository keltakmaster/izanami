import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import queryClient from "../queryClient";
import { string } from "yup";

import {
  mailerQueryKey,
  MutationNames,
  queryConfiguration,
  queryMailerConfiguration,
  updateConfiguration,
  updateMailerConfiguration,
} from "../utils/queries";
import {
  Configuration,
  Mailer,
  MailerConfiguration,
  MailGunConfigurationDetails,
  MailGunRegion,
  MailJetConfigurationDetails,
  SMTPConfigurationDetails,
} from "../utils/types";
import { customStyles } from "../styles/reactSelect";
import { IzanamiContext } from "../securityContext";
import { Form, constraints } from "@maif/react-forms";
import { config } from "process";

const MAILER_OPTIONS = [
  { label: "MailJet", value: "MailJet" },
  { label: "MailGun", value: "MailGun" },
  { label: "SMTP", value: "SMTP" },
  { label: "Console (None)", value: "Console" },
];

// TODO centralize this in utils package
export function yupValidationToStringError(
  yupValidation: () => any,
  error: string
): string | null {
  try {
    yupValidation();
    return null;
  } catch (e) {
    return error;
  }
}

export function Settings() {
  const { askConfirmation } = useContext(IzanamiContext);
  const [selectedMailer, setSelectedMailer] = useState();

  const configurationQuery = useQuery(MutationNames.CONFIGURATION, () =>
    queryConfiguration()
  );

  const configurationMutationQuery = useMutation((data: Configuration) =>
    updateConfiguration(data)
  );

  if (configurationQuery.isLoading) {
    return <div>Loading configuration...</div>;
  } else if (configurationQuery.data) {
    const configuration = configurationQuery.data;
    return (
      <>
        <h1>Global settings</h1>
        <div className="row">
          <div className="col">
            <Form
              schema={{
                mailer: {
                  type: "string",
                  label: "Mail provider",
                  format: "select",
                  defaultValue: MAILER_OPTIONS.find(
                    ({ value }) => value === configuration.mailer
                  )?.value,
                  options: MAILER_OPTIONS,
                  props: { styles: customStyles },
                  onChange: ({ value, setValue }) => {
                    setSelectedMailer(value);
                    setValue("mailer", value);
                  },
                },
                invitationMethod: {
                  label: "Invitation method",
                  type: "string",
                  format: "select",
                  options: [
                    {
                      value: "Response",
                      label:
                        "Request response (invitation url will be displayed right after creating invitation)",
                    },
                    {
                      value: "Mail",
                      label:
                        "By mail (invitation url will be sent by mail to the new user)",
                    },
                  ],
                  defaultValue: configuration.invitationMode,
                  props: {
                    styles: customStyles,
                    "aria-label": "Invitation method",
                  },
                },
                originEmail: {
                  type: "string",
                  format: "email",
                  label: "Origin email",
                  defaultValue: configuration.originEmail,
                  constraints: [
                    constraints.test(
                      "mandatory-email",
                      "Origin email is mandatory if mail provider is not console OR invitation method is by mail",
                      (value, { parent: { mailer } }) => {
                        if (mailer === "Console") {
                          return true;
                        } else {
                          try {
                            string().email().validateSync(value);
                            return true;
                          } catch (error) {
                            return false;
                          }
                        }
                      }
                    ),
                  ],
                },
                anonymousReporting: {
                  type: "bool",
                  label: "Anonymous reporting",
                  defaultValue: configuration.anonymousReporting,
                },
              }}
              onSubmit={({
                mailer,
                invitationMethod,
                originEmail,
                anonymousReporting,
              }) => {
                const wasAnonymousReportingDisabled =
                  !anonymousReporting && configuration.anonymousReporting;
                return configurationMutationQuery
                  .mutateAsync({
                    mailer: mailer,
                    invitationMode: invitationMethod,
                    originEmail: originEmail,
                    anonymousReporting,
                    anonymousReportingLastAsked: wasAnonymousReportingDisabled
                      ? new Date()
                      : configuration.anonymousReportingLastAsked,
                  })
                  .then(() => {
                    queryClient.invalidateQueries(MutationNames.CONFIGURATION);
                  });
              }}
              footer={({ valid }: { valid: () => void }) => {
                return (
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success m-2" onClick={valid}>
                      Update settings
                    </button>
                  </div>
                );
              }}
            />
          </div>
          <div className="col">
            <MailerDetail mailer={selectedMailer ?? configuration.mailer} />
          </div>
        </div>
      </>
    );
  } else {
    return <div>Failed to load configuration</div>;
  }
}

function MailerDetail(props: { mailer: Mailer }) {
  const { mailer } = props;
  const mailerConfigurationQuery = useQuery(mailerQueryKey(mailer), () =>
    queryMailerConfiguration(mailer)
  );

  const mailerConfigurationMutationQuery = useMutation(
    (data: MailerConfiguration) => updateMailerConfiguration(mailer, data)
  );

  if (mailerConfigurationQuery.isLoading) {
    return <div>Loading configuration...</div>;
  } else if (mailerConfigurationQuery.data) {
    const mailerConfiguration = mailerConfigurationQuery.data;
    if (mailer === "Console") {
      return (
        <p>
          Izanami will write invitations in application logs, it WILL NOT send
          any email.
        </p>
      );
    } else if (mailer === "MailJet") {
      const { secret, apiKey } =
        mailerConfiguration as MailJetConfigurationDetails;
      return (
        <>
          <p>Izanami will use mailjet API to send invitation mails</p>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
          >
            Show / hide configuration details
          </button>
          <div className="collapse" id="collapseExample">
            <MailJetForm
              apiKey={apiKey}
              secret={secret}
              onSubmit={(values) => {
                const { secret, apikey } = values;
                return mailerConfigurationMutationQuery
                  .mutateAsync({
                    secret,
                    apiKey: apikey,
                  })
                  .then(() =>
                    queryClient.invalidateQueries(mailerQueryKey("MailJet"))
                  );
              }}
            />
          </div>
        </>
      );
    } else if (mailer === "MailGun") {
      const { apiKey, region } =
        mailerConfiguration as MailGunConfigurationDetails;
      return (
        <>
          <p>Izanami will use mailgun API to send invitation mails</p>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
          >
            Show / hide configuration details
          </button>
          <div className="collapse" id="collapseExample">
            <MailGunForm
              apiKey={apiKey}
              region={region}
              onSubmit={(values) => {
                const { region, apikey } = values;
                return mailerConfigurationMutationQuery
                  .mutateAsync({
                    region,
                    apiKey: apikey,
                  })
                  .then(() =>
                    queryClient.invalidateQueries(mailerQueryKey("MailGun"))
                  );
              }}
            />
          </div>
        </>
      );
    } else if (mailer === "SMTP") {
      const { host, user, password, auth, port, starttlsEnabled, smtps } =
        mailerConfiguration as SMTPConfigurationDetails;
      return (
        <>
          <p>Izanami will use given SMTP settings to send invitation mails</p>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
          >
            Show / hide configuration details
          </button>
          <div className="collapse" id="collapseExample">
            <SMTPForm
              host={host}
              port={port}
              auth={auth}
              user={user}
              password={password}
              starttlsEnabled={starttlsEnabled}
              smtps={smtps}
              onSubmit={(values) => {
                const { host, port, auth, user, password, tls, smtps } = values;
                return mailerConfigurationMutationQuery
                  .mutateAsync({
                    host,
                    port,
                    auth,
                    user,
                    password,
                    starttlsEnabled: tls,
                    smtps,
                  })
                  .then(() =>
                    queryClient.invalidateQueries(mailerQueryKey("SMTP"))
                  );
              }}
            />
          </div>
        </>
      );
    } else {
      return <p>Unknown mail provider, please file an issue</p>;
    }
  } else {
    return <div>Error while fetching mail provider</div>;
  }
}

function MailJetForm(props: {
  apiKey: string;
  secret: string;
  onSubmit: (data: any) => Promise<any>;
}) {
  const { apiKey, secret, onSubmit } = props;
  return (
    <>
      <Form
        schema={{
          apikey: {
            label: "API key",
            type: "string",
            defaultValue: apiKey,
            props: {
              autoFocus: true,
            },
          },
          secret: {
            label: "Secret",
            type: "string",
            defaultValue: secret,
          },
        }}
        onSubmit={onSubmit}
        footer={({ valid }: { valid: () => void }) => {
          return (
            <div className="d-flex justify-content-end">
              <button className="btn btn-success m-2" onClick={valid}>
                Update MailJet configuration
              </button>
            </div>
          );
        }}
      />
    </>
  );
}

function MailGunForm(props: {
  apiKey: string;
  region: MailGunRegion;
  onSubmit: (data: any) => Promise<any>;
}) {
  const { apiKey, onSubmit, region } = props;
  return (
    <>
      <Form
        schema={{
          apikey: {
            label: "API key",
            type: "string",
            defaultValue: apiKey,
          },
          region: {
            label: "Region",
            type: "string",
            format: "select",
            defaultValue: region,
            props: { styles: customStyles },
            options: [
              {
                label: "US",
                value: "US",
              },
              {
                label: "Europe",
                value: "EUROPE",
              },
            ],
          },
        }}
        onSubmit={onSubmit}
        footer={({ valid }: { valid: () => void }) => {
          return (
            <div className="d-flex justify-content-end">
              <button className="btn btn-success m-2" onClick={valid}>
                Update MailGun configuration
              </button>
            </div>
          );
        }}
      />
    </>
  );
}

function SMTPForm(props: {
  host: string;
  port?: number;
  user?: string;
  password?: string;
  auth: boolean;
  starttlsEnabled: boolean;
  smtps: boolean;
  onSubmit: (data: any) => Promise<any>;
}) {
  const { host, onSubmit, port, user, password, auth, starttlsEnabled, smtps } =
    props;
  return (
    <>
      <Form
        schema={{
          host: {
            type: "string",
            label: "Host*",
            defaultValue: host,
          },
          port: {
            label: "Port",
            type: "number",
            defaultValue: port || "",
          },
          user: {
            label: "User",
            type: "string",
            defaultValue: user || "",
          },
          password: {
            label: "Password",
            type: "string",
            defaultValue: password || "",
          },
          auth: {
            label: "Auth",
            type: "bool",
            defaultValue: auth,
          },
          tls: {
            label: "StartTLS enabled",
            type: "bool",
            defaultValue: starttlsEnabled,
          },
          smtps: {
            label: "SMTPS",
            type: "bool",
            defaultValue: smtps,
          },
        }}
        onSubmit={onSubmit}
        footer={({ valid }: { valid: () => void }) => {
          return (
            <div className="d-flex justify-content-end">
              <button className="btn btn-success m-2" onClick={valid}>
                Update SMTP configuration
              </button>
            </div>
          );
        }}
      />
    </>
  );
}
