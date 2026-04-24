import Client from 'shopify-buy';

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

if (!domain || !storefrontAccessToken) {
    console.warn('Shopify credentials are missing in environment variables.');
}

export const shopifyConfig = {
    domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'recon-9795.myshopify.com',
    storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '2911e28f650b3b3fad0497277486ea8b',
    apiVersion: '2024-01'
};

export const client = Client.buildClient(shopifyConfig);

export default client;
