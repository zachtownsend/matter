import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Cart = () => {
    const { checkout, updateQty, removeProductFromCart } = useContext(StoreContext);
    console.log({ checkout });
    return (
        <div className="px-6 py-4">
            <h3>Your basket</h3>
            {checkout.lineItems.length > 0 ? (
                <ul>
                    {checkout.lineItems.map((lineItem) => {
                        console.log(lineItem);
                        return (
                            <li className="flex mb-2" key={lineItem.id}>
                                <div className="w-24 mr-4">
                                    <img
                                        src={lineItem.variant.image.src}
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
                                        <p>{lineItem.variant.price}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>You have nothing in your basket.</p>
            )}
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
