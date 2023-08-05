import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { environmentVariables as EV } from "../consts";

const Auth0Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Auth0Provider
      domain={EV.domain}
      clientId={EV.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: EV.audience,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0Wrapper;
