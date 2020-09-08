import React from 'react';
import client from '../../lib/apollo';
import { gql } from '@apollo/client';

const ProductPage = ({ product }) => {

    return (
        <main>
            <h1>{product.title}</h1>
            <img src={product.images.edges[0].node.transformedSrc} alt={product.images.edges[0].node.altText}/>
        </main>
    )
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: gql`
            {
                products(first: 100) {
                edges {
                  node {
                    handle
                  }
                }
              }
            }
        `
    });

    return {
        paths: data.products.edges.map(page => ({ params: { handle: page.node.handle } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { handle } = params;
    const { data } = await client.query({
        query: gql`
            query product {
              productByHandle(handle: "${handle}") {
                title
                availableForSale
                descriptionHtml
                id
                handle
                images(first: 5) {
                  edges {
                    node {
                      originalSrc
                      src
                      id
                      altText
                      transformedSrc(crop: CENTER, maxHeight: 400, maxWidth: 400)
                    }
                  }
                }
                priceRange {
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
        `
    });

    return {
        props: {
            product: data.productByHandle
        }
    }

}

export default ProductPage;
