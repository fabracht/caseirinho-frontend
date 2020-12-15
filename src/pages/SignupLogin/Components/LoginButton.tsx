import { Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <Redirect to="/loja" />;
  } else {
    return (
      <button
        onClick={(ev) => {
          ev.preventDefault();
          loginWithRedirect();
        }}
        className="btn btn-primary btn-block"
        data-toggle="tooltip"
        data-bs-tooltip=""
        type="submit"
        title="I log you in"
      >
        Log In with Auth0
      </button>
    );
  }
};

export default LoginButton;
