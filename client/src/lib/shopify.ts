import Client from 'shopify-buy';

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

if (!domain || !storefrontAccessToken) {
    console.warn('Shopify credentials are missing in environment variables.');
}

export const shopifyConfig = {
    domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'mock.myshopify.com',
    storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'mock-token',
    apiVersion: '2024-01'
};

export const client = Client.buildClient(shopifyConfig);

export default client;
