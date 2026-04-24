import fetch from 'node-fetch';

const domain = 'dhruv-rathod-3.myshopify.com';
// Your current token from .env
const token = 'e083ab6806555fdf13f4b9fac878459';

const run = async () => {
    console.log("-----------------------------------------");
    console.log("Checking Shopify Storefront Access Token");
    console.log("Domain:", domain);
    console.log("Token:", token);
    console.log("Length:", token.length);

    if (token.length !== 32) {
        console.error("❌ FAILURE: Token length is " + token.length + ". It MUST be 32 characters.");
        console.log("You consistently miss the last character when copying.");
        return;
    }

    const query = `{ shop { name } }`;
    const url = `https://${domain}/api/2024-01/graphql.json`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': token
            },
            body: JSON.stringify({ query })
        });

        if (response.status === 200) {
            const data = await response.json();
            if (data.errors) {
                console.error("❌ API ERROR:", JSON.stringify(data.errors, null, 2));
            } else {
                console.log("✅ SUCCESS! Token is valid.");
                console.log("Store Name:", data.data.shop.name);
            }
        } else {
            console.error("❌ HTTP ERROR:", response.status, response.statusText);
            console.log("This confirms the token is invalid (401 Unauthorized).");
        }
    } catch (error) {
        console.error("Network Error:", error);
    }
    console.log("-----------------------------------------");
};

run();
