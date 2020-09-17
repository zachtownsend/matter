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
    const multipleVariants = variants.edges.length > 1;
    const [firstVariant] = product.variants.edges;
    const [mainImage, secondaryImage] = product.images.edges;
    const { maxVariantPrice: maxPrice, minVariantPrice: minPrice } = product.priceRange;

    const price =
        maxPrice.amount === minPrice.amount
            ? `€${maxPrice.amount}`
            : `€${minPrice.amount} - ${maxPrice.amount}`;

    return (
        <div className="flex flex-col">
            <div className="relative">
                <img
                    className={`w-full ${
                        secondaryImage
                            ? 'relative z-10 opacity-100 hover:opacity-0 transition-opacity'
                            : ''
                    }`}
                    src={mainImage.node.transformedSrc}
                    alt={mainImage.node.altText}
                />
                {secondaryImage && (
                    <img
                        src={secondaryImage.node.transformedSrc}
                        alt={secondaryImage.node.altText}
                        className="absolute top-0 bottom-0 left-0 right-0 z-0"
                    />
                )}
            </div>
            <div>
                <h3>{title}</h3>
                <p>{price}</p>
                {description || null}
            </div>
            <div className="mt-auto">
                {multipleVariants ? (
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
