import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { IzanamiContext } from "../securityContext";
import Logo from "../../izanami.png";
import { Configuration, TUser } from "../utils/types";
import { useMutation } from "react-query";
import { updateConfiguration } from "../utils/queries";

export function Login(props: any) {
  const code = new URLSearchParams(props.location.search).get("code");
  if (code) {
    return <TokenWaitScreen code={code} />;
  } else {
    return <LoginForm {...props} />;
  }
}

function TokenWaitScreen({ code }: { code: string }) {
  const fetching = React.useRef<boolean>(false);
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    if (!fetching.current) {
      fetching.current = true;
      setError("");
      fetch("/api/admin/openid-connect-callback", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ code }),
      }).then((response) => {
        if (response.status >= 400) {
          setError("Failed to retrieve token from code");
        } else {
          window.location.href = "/";
        }
      });
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  } else if (fetching) {
    return <div>Fetching...</div>;
  } else {
    return <div>Fetched !!!</div>;
  }
}

function LoginForm(props: { req?: string }) {
  const navigate = useNavigate();
  const req = props.req;
  const { setUser, integrations } = useContext(IzanamiContext);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img
        src={Logo}
        style={{
          marginBottom: 48,
          height: 300,
        }}
      />
      <form
        className="d-flex flex-column container-fluid"
        style={{ maxWidth: "400px" }}
        onSubmit={(e) => {
          e.preventDefault();
          if (error) {
            setError("");
          }
          const data = new FormData(e.target as HTMLFormElement);
          const login = data.get("login");
          const password = data.get("password");
          if (!login || !password) {
            setError("Both login and password must be specified");
          } else {
            setLoading(true);
            e.preventDefault();
            fetch("/api/admin/login?rights=true", {
              method: "POST",
              headers: {
                Authorization: `Basic ${btoa(`${login}:${password}`)}`,
              },
            })
              .then((res) => {
                setLoading(false);
                if (res.status >= 400) {
                  return res.text().then((err) => {
                    throw err;
                  });
                }
                return res.json();
              })
              .then((user: TUser) => {
                setUser(user);
                navigate(req ? req : "/");
              })
              .catch((err) => {
                setLoading(false);
                let error = "An error occured";
                try {
                  const json = JSON.parse(err);
                  if (json?.message) {
                    error += ` : ${json.message}`;
                  }
                } catch (err) {
                  //
                }
                setError(error);
              });
          }
        }}
      >
        <label className="form-label">
          Username{" "}
          <input
            type="text"
            name="login"
            className="form-control"
            onChange={(e) => {
              if (error) {
                setError("");
              }
            }}
          />
        </label>
        <label className="form-label">
          Password{" "}
          <input
            name="password"
            type="password"
            className="form-control"
            onChange={(e) => {
              if (error) {
                setError("");
              }
            }}
          />
        </label>
        <NavLink className={() => "align-self-end"} to={"/forgotten-password"}>
          Forgot password ?
        </NavLink>
        {loading ? (
          <div>Login...</div>
        ) : (
          <>
            <button value="Login" className="btn btn-primary">
              Login
            </button>
            {error && (
              <div className="error-message" style={{ width: "100%" }}>
                {error}
              </div>
            )}

            {integrations?.oidc && (
              <>
                <div className="openid-separator my-3">OR</div>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    window.location.href =
                      "https://izanami.homelab.home/api/admin/openid-connect";
                  }}
                >
                  OpenId connect
                </button>
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
}
