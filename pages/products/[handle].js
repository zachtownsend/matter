import React from 'react';
import client from '../../lib/apollo';
import { gql } from '@apollo/client';
import StoryblokService from '../../lib/storyblok-service';

const ProductPage = ({ product, shop }) => {
    // console.log(content);
    return (
        <main>
            <h1>{product.title}</h1>
            <img
                src={product.images.edges[0].node.transformedSrc}
                alt={product.images.edges[0].node.altText}
            />
        </main>
    );
};

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
        paths: data.products.edges.map((page) => ({ params: { handle: page.node.handle } })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { handle } = params;
    const { data } = await client.query({
        query: gql`
            query {
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
              shop {
                    moneyFormat
                }
            }
        `
    });

    let content;

    try {
        content = await StoryblokService.get(`cdn/stories/products/${handle}`, {
            cv: Date.now()
        });
    } catch (error) {
        content = [];
    }

    return {
        props: {
            product: data.productByHandle,
            content,
            shop: data.shop
        }
    };
}

export default ProductPage;
