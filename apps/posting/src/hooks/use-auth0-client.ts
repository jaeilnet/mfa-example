import { useContext } from "react";
import { Auth0ClientContext } from "../provider/auth0-client-provider";
import { Auth0Client } from "@auth0/auth0-spa-js";

export const useAuth0Client = (): Auth0Client => {
  const auth0Client = useContext(Auth0ClientContext);

  if (auth0Client === null) {
    throw new Error(
      "useAuth0Client must be used within an Auth0ClientProvider"
    );
  }

  return auth0Client;
};
