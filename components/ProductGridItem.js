import React, { useContext } from 'react';
import Link from 'next/link';
import { StoreContext } from '../context/StoreContext';

/**
 * LOGIC
 *
 * if product has 1 variant, use first variant
 *
 * if product has more than 1 variant, don't show add to cart button (maybe a popup?)
 */
const ProductGridItem = ({ product }) => {
    const { addProductToCart } = useContext(StoreContext);
    const { handle, availableForSale, descriptionHtml: description, title, variants } = product;
    const variableProduct = variants.edges.length > 1;
    const [firstVariant] = product.variants.edges;
    const [mainImage, secondaryImage] = product.images.edges;
    const { maxVariantPrice: maxPrice, minVariantPrice: minPrice } = product.priceRange;
    console.log({ mainImage });

    const price =
        maxPrice.amount === minPrice.amount
            ? `€${maxPrice.amount}`
            : `€${maxPrice.amount} - ${maxPrice.amount}`;

    return (
        <div>
            <div>
                <img
                    className="w-full"
                    src={mainImage.node.transformedSrc}
                    alt={mainImage.node.altText}
                />
            </div>
            <div>
                <h3>{title}</h3>
                <p>{price}</p>
                {description || null}
            </div>
            <div>
                {variableProduct ? (
                    <a
                        href={`/products/${handle}`}
                        className="px-3 py-2 bg-green-500 text-white rounded-sm">
                        Choose...
                    </a>
                ) : (
                    <button
                        onClick={() => addProductToCart(firstVariant.node.id)}
                        className="px-3 py-2 bg-green-500 text-white rounded-sm">
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductGridItem;
