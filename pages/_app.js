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

MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return {
        pageProps
    };
};

export default MyApp;
