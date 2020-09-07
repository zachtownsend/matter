import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import '../styles/globals.css'
import { Layout } from '../components/Layout';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_STOREFRONT_URL,
});

const middlewareLink = setContext(() => ({
    headers: {
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN,
    },
}));

const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
