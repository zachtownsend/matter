import { ApolloProvider } from '@apollo/client';
import '../styles/globals.css'
import { Layout } from '../components/Layout';
import client from '../lib/apollo';

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
