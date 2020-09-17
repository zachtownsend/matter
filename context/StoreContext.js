import Client from 'shopify-buy';
import { createContext, useState, useEffect } from 'react';

const client = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_URL,
    storefrontAccessToken: process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN
});

const defaultValues = {
    closeDrawers: () => {},
    isMenuOpen: false,
    toggleMenuOpen: () => {},
    isCartOpen: false,
    toggleCartOpen: () => {},
    cart: [],
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    checkCoupon: () => {},
    removeCoupon: () => {},
    client,
    checkout: {
        lineItems: []
    }
};

export const StoreContext = createContext(defaultValues);

const isBrowser = typeof window !== 'undefined';

export const StoreProvider = ({ children }) => {
    const [checkout, setCheckout] = useState(defaultValues.checkout);
    const [isCartOpen, setCartOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const closeDrawers = () => {
        [setCartOpen, setMenuOpen].forEach((setState) => {
            setState(false);
        });
    };

    const toggleMenuOpen = () => {
        setMenuOpen(!isMenuOpen);

        if (isCartOpen) {
            setCartOpen(false);
        }
    };
    const toggleCartOpen = () => {
        setCartOpen(!isCartOpen);
        if (isMenuOpen) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        initialiseCheckout();
    }, []);

    const getNewId = async () => {
        try {
            const newCheckout = await client.checkout.create();
            if (isBrowser) {
                localStorage.setItem('checkout_id', newCheckout.id);
            }
            return newCheckout;
        } catch (e) {
            console.error(e);
        }
    };

    const initialiseCheckout = async () => {
        try {
            const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null;

            let newCheckout = null;

            if (currentCheckoutId) {
                newCheckout = await client.checkout.fetch(currentCheckoutId);

                if (newCheckout.completedAt) {
                    newCheckout = await getNewId();
                }
            } else {
                newCheckout = await getNewId();
                localStorage.setItem('checkout_id', newCheckout.id);
            }

            setCheckout(newCheckout);
        } catch (e) {
            console.error(e);
        }
    };

    const addProductToCart = async (variantId, qty = 1) => {
        try {
            setLoading(true);
            const lineItems = [
                {
                    variantId,
                    quantity: qty
                }
            ];

            const newCheckout = await client.checkout.addLineItems(checkout.id, lineItems);
            setCheckout(newCheckout);
        } catch (e) {
            console.error(e);
        }

        setLoading(false);
    };

    const removeProductFromCart = async (lineItemId) => {
        try {
            setLoading(true);
            const newCheckout = await client.checkout.removeLineItems(checkout.id, [lineItemId]);
            setCheckout(newCheckout);
        } catch (e) {
            console.error(e);
        }

        setLoading(false);
    };

    const checkCoupon = async (coupon) => {
        try {
            setLoading(true);
            const newCheckout = await client.checkout.addDiscount(checkout.id, coupon);
            console.log(newCheckout);
            if (newCheckout.userErrors.length > 0) {
                console.error(newCheckout.userErrors[0].message);
            }
            setCheckout(newCheckout);
        } catch (e) {
            console.error(e);
        }

        setLoading(false);
    };

    const removeCoupon = async (coupon) => {
        try {
            setLoading(true);
            const newCheckout = await client.checkout.removeDiscount(checkout.id, coupon);
            setCheckout(newCheckout);
        } catch (e) {
            console.error(e);
        }

        setLoading(false);
    };

    return (
        <StoreContext.Provider
            value={{
                ...defaultValues,
                closeDrawers,
                isMenuOpen,
                toggleMenuOpen,
                isCartOpen,
                toggleCartOpen,
                addProductToCart,
                removeProductFromCart,
                checkCoupon,
                removeCoupon,
                client,
                checkout,
                isLoading
            }}>
            {children}
        </StoreContext.Provider>
    );
};
