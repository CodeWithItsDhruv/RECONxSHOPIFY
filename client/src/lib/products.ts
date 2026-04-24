import { client } from './shopify';

// STRICT DATA LAYER (Architect Plan Phase 1)

export interface ProductVariant {
    id: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    available: boolean;
    selectedOptions: { name: string; value: string }[];
}

export interface ProductDTO {
    id: string;
    handle: string;
    title: string;
    descriptionHtml: string;
    price: number;
    formatPrice: string;
    compareAtPrice?: number;
    formatCompareAtPrice?: string;
    vendor: string;
    images: string[];
    options: { name: string; values: string[] }[];
    variants: ProductVariant[];
    // Computed/Helper props for UI convenience
    category: string;
}

// Helpers
const formatCurrency = (amount: number, currencyCode: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0
    }).format(amount);
};

// Safe extractors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getEdges = (node: any) => node?.edges?.map((e: any) => e.node) || [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeProduct = (node: any): ProductDTO => {
    if (!node) throw new Error("Normalize called on null node");

    // 1. Images
    let images: string[] = [];
    if (Array.isArray(node.images)) {
        // SDK Model
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        images = node.images.map((img: any) => img.src || img.url || img);
    } else {
        // GraphQL Connection
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        images = getEdges(node.images).map((img: any) => img.url || img.originalSrc);
    }

    // 2. Variants
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rawVariants: any[] = [];
    if (Array.isArray(node.variants)) {
        rawVariants = node.variants;
    } else {
        rawVariants = getEdges(node.variants);
    }

    const variants: ProductVariant[] = rawVariants.map(v => {
        // Parse prices safely. Use 'amount' if object, or direct string/number.
        const priceVal = v.price?.amount || v.price || '0';
        const compareVal = v.compareAtPrice?.amount || v.compareAtPrice;

        const price = parseFloat(priceVal);
        const compareAt = compareVal ? parseFloat(compareVal) : undefined;

        return {
            id: v.id,
            title: v.title,
            price,
            compareAtPrice: compareAt,
            available: v.availableForSale ?? true, // SDK might default differently
            selectedOptions: v.selectedOptions || []
        };
    });

    // 3. Options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options = (node.options || []).map((opt: any) => ({
        name: opt.name,
        values: opt.values.map((v: any) => v.value || v) // Ensure we get strings
    }));

    // 4. Base Price (from first variant or node price range)
    // We prioritize the first variant for display defaults
    const firstVariant = variants[0];
    const price = firstVariant?.price || 0;
    const compareAtPrice = firstVariant?.compareAtPrice;

    return {
        id: node.id,
        handle: node.handle,
        title: node.title,
        descriptionHtml: node.descriptionHtml || node.description || '',
        price,
        formatPrice: formatCurrency(price),
        compareAtPrice,
        formatCompareAtPrice: compareAtPrice ? formatCurrency(compareAtPrice) : undefined,
        vendor: node.vendor,
        images,
        options,
        variants,
        category: node.productType || 'Uncategorized'
    };
};

export const getAllProducts = async (): Promise<ProductDTO[]> => {
    // SAFE QUERY: Fetches first 50 products instead of "all" (which could be thousands)
    // This prevents the "infinite fetch" crash.
    const query = `
      query getProducts {
        products(first: 50, sortKey: TITLE) {
          edges {
            node {
              id
              handle
              title
              descriptionHtml
              vendor
              productType
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                    }
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      url
                    }
                  }
                }
              }
              options {
                id
                name
                values
              }
            }
          }
        }
      }
    `;

    try {
        // We use the raw client fetch for better control than the SDK's fetchAll
        const client = (await import('./shopify')).client;

        // Note: The js-buy-sdk doesn't openly expose the raw query method easily on the typed client 
        // without some casting or using the expanding resource. 
        // However, since we are using the customized 'client' from our shopify.ts, 
        // lets stick to the SDK method but use the `fetchQuery` if available or fallback to a smarter usage.

        // actually, looking at the SDK, fetchAll is indeed dangerous. 
        // The safest way without rewriting the entire app's data layer to direct graphql
        // is to use client.product.fetchQuery({first: 50}).

        const products = await client.product.fetchQuery({ first: 50 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return products.map((p: any) => normalizeProduct(p));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const getProductByHandle = async (handle: string): Promise<ProductDTO | null> => {
    try {
        const product = await client.product.fetchByHandle(handle);
        if (!product) return null;
        return normalizeProduct(product);
    } catch (error) {
        console.error(`Error fetching product with handle ${handle}:`, error);
        return null;
    }
};
