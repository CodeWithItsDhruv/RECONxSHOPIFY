# Shopify Storefront API Troubleshooting Guide

## 1. The Core Issue: Invalid Token
Your current `.env` contains a token with **31 characters**:
`e083ab6806555fdf13f4b9fac878459`

A valid Shopify Storefront Access Token has **32 characters**.
You are missing exactly one character at the end.

## 2. How to Fix (Step-by-Step)

### Step A: Regenerate Token (Shopify Admin)
1. Go to **Settings** > **Apps and sales channels**.
2. Click **Develop apps**.
3. Select your app (e.g., "Recon Autobots").
4. Click the **API credentials** tab.
5. Under "Storefront API integration", click **Configure Storefront API integration** (if available) or check the existing token.
   - **Scopes Required**: Ensure the following are checked:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_tags`
     - `unauthenticated_write_customers`
     - `unauthenticated_read_customer_tags`
     - `unauthenticated_write_checkouts`
6. Click **Save**.
7. Copy the **Storefront access token** (Reveal it).
8. **Verify Length**: Paste it into Notepad and count the characters. It MUST be 32.

### Step B: Update Codebase
1. Open `client/.env` in your editor.
2. Replace the line:

```env
VITE_SHOPIFY_STOREFRONT_TOKEN=YOUR_NEW_32_CHAR_TOKEN
```

3. **Restart Server**:
   - In your terminal, press `Ctrl+C` to stop.
   - Run `npm run dev` again.

## 3. Verification
Once the token is fixed:
- **Products**: Go to `/products`. The 401 error should be gone.
- **Login**: Go to `/login` and try to sign in.
- **Browser**: Open DevTools > Application > Local Storage. Clear everything to remove any stale invalid tokens.
