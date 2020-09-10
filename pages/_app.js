import { ApolloProvider } from '@apollo/client';
import '../styles/globals.css';
import { Layout } from '../components/Layout';
import client from '../lib/apollo';
import { StoreContext, StoreProvider } from '../context/StoreContext';

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <StoreProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </StoreProvider>
        </ApolloProvider>
    );
}

export default MyApp;
