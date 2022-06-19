import React, {  useMemo, useRef } from "react";
import { useAllState } from "./UserContext";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
// The name here doesn't really matter.

const graphqlEndpoint = "http://localhost:80/graphql";

export default function CustomApolloProvider(props) {
  const { loginToken } = useAllState();

  // const cookies = new Cookies();
  // const token = cookies.get("ut");
  // console.log(token)

  const tokenRef = useRef()

  tokenRef.current = loginToken
  // console.log(tokenRef.current)

  // Ensure that the client is only created once.
  const client = useMemo(() => {
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        auth: tokenRef.current ? `ut ${tokenRef.current}` : null,
      },
    }));

    const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, location, path }) => {
          console.log(`message:${message} location:${location}`);
        });
      }

      if (networkError) {
        console.log(`networkerror: ${networkError}`);
      }
    });

    const httpLink = createUploadLink({
      uri: graphqlEndpoint,
    });

    const link = ApolloLink.from([errorLink, authLink, httpLink]);
    // const wtfLink = ApolloLink.from([authLink, wsLink])

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client} {...props} />;
}
