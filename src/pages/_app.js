import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // <SessionProvider session={session}>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      </ApolloProvider>
    // </SessionProvider>
  );
}