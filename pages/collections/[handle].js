import React, { useContext } from 'react';
import { gql } from '@apollo/client';
import client from '../../lib/apollo';
import Container from '../../components/Container';
import { StoreContext } from '../../context/StoreContext';
import ProductGridItem from '../../components/ProductGridItem';

const CollectionPage = ({ id, title, descriptionHtml, image, products }) => {
    const { addProductToCart, checkout } = useContext(StoreContext);
    return (
        <main>
            <Container>
                <header>
                    <h1>{title}</h1>
                    {descriptionHtml || null}
                </header>
            </Container>
            <Container tag="section">
                <div className="grid grid-cols-4 gap-4">
                    {products.map(({ node: product }) => {
                        return <ProductGridItem key={product.id} product={product} />;
                    })}
                </div>
            </Container>
        </main>
    );
};

export async function getStaticPaths() {
    const { data } = await client.query({
        query: gql`
            {
                collections(first: 100) {
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
        paths: data.collections.edges.map((page) => ({ params: { handle: page.node.handle } })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const { handle } = params;
    const { data } = await client.query({
        query: gql`
            query {
                collectionByHandle(handle: "${handle}") {
                    id
                    title
                    descriptionHtml
                    image {
                        originalSrc
                        src
                        id
                        altText
                        transformedSrc(crop: CENTER, maxHeight: 400, maxWidth: 400)
                    }
                    products(first: 10) {
                        edges {
                            node {
                                title
                                availableForSale
                                descriptionHtml
                                id
                                handle
                                priceRange {
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                    maxVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                                images(first: 2) {
                                    edges {
                                        node {
                                            id
                                            altText
                                            transformedSrc(crop: CENTER, maxHeight: 365, maxWidth: 244)
                                        }
                                    }
                                }
                                variants(first: 10) {
                                    edges {
                                        node {
                                            id
                                            title
                                            availableForSale
                                            image {
                                                id
                                                altText
                                                transformedSrc(
                                                    crop: CENTER
                                                    maxHeight: 280
                                                    maxWidth: 187
                                                )
                                            }
                                            priceV2 {
                                                amount
                                                currencyCode
                                            }
                                            compareAtPriceV2 {
                                                amount
                                                currencyCode
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                shop {
                    moneyFormat
                }
            }
        `
    });

    const { id, title, descriptionHtml, image } = data.collectionByHandle;
    return {
        props: {
            id,
            title,
            descriptionHtml,
            image,
            products: data.collectionByHandle.products.edges,
            shop: data.shop
        }
    };
}

export default CollectionPage;
