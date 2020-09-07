import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import '../styles/globals.css'
import { Layout } from '../components/Layout';

const httpLink = createHttpLink({
  uri: process.env.STOREFRONT_URL || 'https://gittiexp.myshopify.com/api/2019-07/graphql.json',
});

const middlewareLink = setContext(() => ({
    headers: {
        'X-Shopify-Storefront-Access-Token': process.env.STOREFRONT_ACCESS_TOKEN || '06f480bcee9c3b61aa251e1e54ad629d',
    },
}));

const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache(),
});

console.log(client);

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
