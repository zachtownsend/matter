import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { sizedImage } from '../lib/helpers';

const Cart = () => {
    const { checkout, updateQty, checkCoupon, removeCoupon, isCartLoading } = useContext(
        StoreContext
    );
    const [coupon, setCoupon] = useState('');
    return (
        <div className="px-6 py-4 relative">
            {isCartLoading && (
                <div className="absolute t-0 l-0 w-full h-full bg-opacity-50 bg-white"></div>
            )}
            <h3>Your basket</h3>
            {checkout.lineItems.length > 0 ? (
                <ul>
                    {checkout.lineItems.map((lineItem) => {
                        const price = (
                            parseFloat(lineItem.variant.price) * lineItem.quantity
                        ).toFixed(2);
                        return (
                            <li className="flex mb-2" key={lineItem.id}>
                                <div className="w-24 mr-4">
                                    <img
                                        src={sizedImage(lineItem.variant.image.src, '96x64')}
                                        alt={lineItem.variant.image.altText}
                                    />
                                </div>
                                <div className="flex flex-1 mr-4">
                                    <div className="flex-1">
                                        <h6>{lineItem.title}</h6>
                                        <div>
                                            <button
                                                className="w-10 h-10 bg-green-500 rounded-md"
                                                onClick={() =>
                                                    updateQty(lineItem.id, lineItem.quantity - 1)
                                                }>
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={lineItem.quantity}
                                                onChange={() => {}}
                                                className="w-10 border-gray-800 text-center appearance-none"
                                            />
                                            <button
                                                className="w-10 h-10 bg-green-500 rounded-md"
                                                onClick={() =>
                                                    updateQty(lineItem.id, lineItem.quantity + 1)
                                                }>
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="underline text-sm mt-2"
                                            onClick={() => {
                                                updateQty(lineItem.id, 0);
                                            }}>
                                            Remove
                                        </button>
                                    </div>
                                    <div className="w-16 text-right">
                                        <p>{price}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>You have nothing in your basket.</p>
            )}
            <div className="border-t-2 border-b-2 border-black my-4 py-4">
                {checkout.discountApplications.length > 0 ? (
                    <div>
                        Coupon:
                        <h5>
                            {checkout.discountApplications[0].code} -
                            {checkout.discountApplications[0].value.percentage}% off
                        </h5>
                        <button
                            className="bg-red-800 text-white px-4 py-2"
                            onClick={() => removeCoupon(checkout.discountApplications[0].code)}>
                            Remove
                        </button>
                    </div>
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            checkCoupon(coupon);
                        }}>
                        <div className="mb-2">
                            <label htmlFor="coupon" className="mr-4">
                                Coupon
                            </label>
                            <input
                                type="text"
                                className="border px-4 py-2 border-black"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                name="coupon"
                                id="coupon"
                            />
                        </div>
                        <button className="bg-green-500 text-white px-4 py-2">Add Coupon</button>
                    </form>
                )}
            </div>
            <div className="mt-auto block">
                <div className="flex">
                    <p className="flex-1">Subtotal:</p>
                    <p className="w-16 text-right">{checkout.totalPrice}</p>
                </div>
                <a
                    href={checkout.webUrl}
                    className="w-full bg-black px-4 py-2 text-white block text-center">
                    Checkout
                </a>
            </div>
        </div>
    );
};

export default Cart;
