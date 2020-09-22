import { gql } from '@apollo/client';
import client from '../../lib/apollo';

export default async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { data } = await client.query({
        query: gql`
            {
                products(first: 250) {
                    edges {
                        node {
                            title
                            handle
                        }
                    }
                }
            }
        `
    });

    const products = data.products.edges.map(({ node }) => ({
        name: node.title,
        value: node.handle
    }));

    res.status(200).send(products);
};
