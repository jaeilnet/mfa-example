import React from "react";
import { Auth0Client } from "@auth0/auth0-spa-js";

export const Auth0ClientContext = React.createContext<Auth0Client | null>(null);

export const Auth0ClientProvider = ({ children }: React.PropsWithChildren) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;
  const redirectUrl = process.env.REACT_APP_AUTH0_CALLBACK_URL!;

  const auth0Client = new Auth0Client({
    clientId,
    domain,
    authorizationParams: {
      redirect_uri: redirectUrl,
    },
  });

  return (
    <Auth0ClientContext.Provider value={auth0Client}>
      {children}
    </Auth0ClientContext.Provider>
  );
};
