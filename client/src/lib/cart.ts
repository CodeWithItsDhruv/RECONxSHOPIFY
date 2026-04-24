import { client } from './shopify';

const CHECKOUT_ID_KEY = 'shopify_checkout_id';

export const initCart = async (): Promise<string | null> => {
    let checkoutId = localStorage.getItem(CHECKOUT_ID_KEY);

    if (!checkoutId) {
        const checkout = await client.checkout.create();
        checkoutId = checkout.id;
        localStorage.setItem(CHECKOUT_ID_KEY, checkoutId);
    }

    return checkoutId;
};

export const getCart = async () => {
    let checkoutId = localStorage.getItem(CHECKOUT_ID_KEY);
    if (!checkoutId) {
        checkoutId = await initCart();
    }

    if (!checkoutId) return null;

    try {
        const checkout = await client.checkout.fetch(checkoutId);
        // If completed, clear and create new
        if (checkout && (checkout as any).completedAt) {
            localStorage.removeItem(CHECKOUT_ID_KEY);
            const newId = await initCart();
            return await client.checkout.fetch(newId as string);
        }
        return checkout;
    } catch (error) {
        // If 404 or other error, create new
        console.error("Cart fetch error", error);
        localStorage.removeItem(CHECKOUT_ID_KEY);
        return initCart().then(id => client.checkout.fetch(id as string));
    }
};

export const addToCart = async (variantId: string, quantity: number) => {
    const checkoutId = await initCart();
    if (!checkoutId) return null;

    const lineItemsToAdd = [
        {
            variantId,
            quantity: parseInt(quantity.toString(), 10)
        }
    ];

    return await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
};

export const updateLineItem = async (lineItemId: string, quantity: number) => {
    const checkoutId = await initCart();
    if (!checkoutId) return null;

    const lineItemsToUpdate = [{ id: lineItemId, quantity }];
    return await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
};

export const removeLineItem = async (lineItemId: string) => {
    const checkoutId = await initCart();
    if (!checkoutId) return null;

    return await client.checkout.removeLineItems(checkoutId, [lineItemId]);
};

export const goToCheckout = async () => {
    try {
        console.log("Redirecting to checkout...");
        const cart = await getCart();
        console.log("Cart for checkout:", cart);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (cart && (cart as any).webUrl) {
            console.log("Found webUrl:", (cart as any).webUrl);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.location.href = (cart as any).webUrl;
        } else {
            console.error("No webUrl found in cart object", cart);
            throw new Error("Checkout URL missing");
        }
    } catch (error) {
        console.error("Checkout handling error:", error);
        // We can't use toast here directly unless we pass it or use a global usage, 
        // but let's at least log it. 
        // If we want to show UI feedback, we should throw so the caller (CartContext) catches it.
        throw error;
    }
};
