import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

console.log(process.env);
const httpLink = createHttpLink({
    uri: process.env.STOREFRONT_URL || process.env.NEXT_PUBLIC_STOREFRONT_URL
});

const middlewareLink = setContext(() => ({
    headers: {
        'X-Shopify-Storefront-Access-Token':
            process.env.STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN
    }
}));

const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;
