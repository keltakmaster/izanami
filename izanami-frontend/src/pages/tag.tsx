import * as React from "react";
import { useMutation, useQuery } from "react-query";
import { FeatureTable } from "../components/FeatureTable";
import queryClient from "../queryClient";
import {
  IzanamiContext,
  hasRightForProject,
  useAdmin,
} from "../securityContext";
import {
  createFeature,
  featureQueryKey,
  queryTag,
  queryTagFeatures,
  queryTenant,
  tagQueryKey,
  tenantQueryKey,
} from "../utils/queries";
import { TFeature, TLevel } from "../utils/types";
import { FeatureForm } from "../components/FeatureForm";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../styles/reactSelect";
import { useParams, NavLink } from "react-router-dom";
import { Loader } from "../components/Loader";

export function Tag(prop: { tag: string; tenant: string }) {
  const { tag, tenant } = prop;
  const tagQuery = useQuery(tagQueryKey(tenant, tag), () =>
    queryTag(tenant, tag)
  );
  const [creating, setCreating] = React.useState(false);
  const { user } = React.useContext(IzanamiContext);
  const admin = useAdmin();
  const creationRight =
    admin ||
    Object.values(user?.rights?.tenants?.[tenant]?.projects || {}).some(
      (right) => right.level === TLevel.Write || right.level === TLevel.Admin
    );

  const featureCreateMutation = useMutation(
    (data: { project: string; feature: any }) =>
      createFeature(tenant, data.project, data.feature),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(featureQueryKey(tenant, tag));
      },
    }
  );

  if (tagQuery.isError) {
    return <div>Failed to load tag</div>;
  } else if (tagQuery.isLoading) {
    return <Loader message="Loading..." />;
  } else if (tagQuery.isSuccess) {
    const { name, description } = tagQuery.data;
    return (
      <>
        <div className="d-flex align-items-center">
          <h1>
            Features with tag{" "}
            <span className="badge bg-warning text-dark btn-sm p-1">
              {name}
            </span>
          </h1>

          {creationRight && (
            <button
              className="btn btn-primary btn-sm mb-2 ms-3"
              type="button"
              onClick={() => setCreating(true)}
            >
              Create new feature
            </button>
          )}
        </div>
        <span>{description}</span>
        {creating && (
          <FeatureForm
            defaultValue={{ tags: [tag] } as TFeature}
            additionalFields={() => <ProjectInput />}
            submit={(feature) =>
              featureCreateMutation
                .mutateAsync({
                  feature,
                  project: feature.project!,
                })
                .then(() => setCreating(false))
            }
            cancel={() => setCreating(false)}
          />
        )}
        <Features tagName={name} tenant={tenant} />
      </>
    );
  }
  return <></>;
}

function ProjectInput() {
  const { tenant } = useParams();
  const tenantQuery = useQuery(tenantQueryKey(tenant!), () =>
    queryTenant(tenant!)
  );
  const { control } = useFormContext<TFeature>();

  if (tenantQuery.isError) {
    return <div>Failed to fetch project</div>;
  } else if (tenantQuery.data) {
    return (
      <label>
        Project
        <Controller
          name="project"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={{ label: value, value }}
              onChange={(e) => {
                onChange(e?.value);
              }}
              styles={customStyles}
              options={tenantQuery.data.projects?.map((p) => ({
                value: p.name,
                label: p.name,
              }))}
            />
          )}
        />
      </label>
    );
  } else {
    return <Loader message="Loading..." />;
  }
}

function Features(props: { tagName: string; tenant: string }): JSX.Element {
  const { tagName, tenant } = props;
  const queryKey = featureQueryKey(tenant, tagName);
  const featureQuery = useQuery(queryKey, () =>
    queryTagFeatures(tenant, tagName)
  );
  const { user } = React.useContext(IzanamiContext);

  if (featureQuery.isError) {
    return <div>Failed to load tag features</div>;
  } else if (featureQuery.isLoading) {
    return <Loader message="Loading features..." />;
  } else if (featureQuery.isSuccess) {
    const features = featureQuery.data;
    return (
      <FeatureTable
        features={features}
        refresh={() => queryClient.invalidateQueries(queryKey)}
        fields={["name", "tags", "project", "enabled", "details", "project"]}
        actions={(feature) => {
          if (
            hasRightForProject(user!, TLevel.Write, feature.project!, tenant)
          ) {
            return ["delete", "edit", "test", "overloads", "url"];
          } else {
            return ["test", "overloads", "url"];
          }
        }}
      />
    );
  }
  return <></>;
}
