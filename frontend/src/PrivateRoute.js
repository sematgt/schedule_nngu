import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./Context/Auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  const authHookContent = useAuth();
console.log('authTokens', authTokens);
console.log('auth hook', authHookContent);

  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute