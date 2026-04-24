import { client } from './shopify';

// Storefront API GraphQL Mutations
const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION = `
  mutation customerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 5) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Error Normalization
export const normalizeError = (error: string): string => {
  const map: { [key: string]: string } = {
    'UNIDENTIFIED_CUSTOMER': 'Incorrect email or password.',
    'TAKEN': 'This email is already registered.',
    'TOO_SHORT': 'Password is too short.',
    'INVALID': 'Invalid email format.',
  };

  for (const key in map) {
    if (error.includes(key)) return map[key];
  }
  return error; // Return original if no match
};

// Types
export interface Order {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: string;
  currency: string;
  items: { title: string; quantity: number; image?: string }[];
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  orders: Order[];
}

export interface AuthResult {
  token?: string;
  expiresAt?: string;
  user?: Customer;
  error?: string;
}

const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_GRAPHQL_URL = `https://${domain}/api/2024-01/graphql.json`;

const shopifyFetch = async (query: string, variables: any) => {
  const response = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  return response.json();
};

export const signup = async (email: string, password: string, firstName?: string, lastName?: string): Promise<AuthResult> => {
  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName
    }
  };

  try {
    const { data } = await shopifyFetch(CUSTOMER_CREATE_MUTATION, variables);

    if (data?.customerCreate?.customerUserErrors?.length > 0) {
      return { error: normalizeError(data.customerCreate.customerUserErrors[0].message) };
    }

    if (data?.customerCreate?.customer) {
      return login(email, password);
    }

    return { error: 'Signup failed. Please try again.' };
  } catch (error) {
    console.error('Signup error:', error);
    return { error: 'Network error during signup' };
  }
};

export const login = async (email: string, password: string): Promise<AuthResult> => {
  const variables = {
    input: {
      email,
      password
    }
  };

  try {
    const { data } = await shopifyFetch(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, variables);

    if (data?.customerAccessTokenCreate?.customerUserErrors?.length > 0) {
      return { error: normalizeError(data.customerAccessTokenCreate.customerUserErrors[0].message) };
    }

    const token = data?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
    const expiresAt = data?.customerAccessTokenCreate?.customerAccessToken?.expiresAt;

    if (token) {
      const user = await getMe(token);
      return { token, expiresAt, user: user || undefined };
    }

    return { error: 'Login failed. Invalid credentials.' };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Network error during login' };
  }
};

export const renewToken = async (accessToken: string): Promise<AuthResult> => {
  const variables = { customerAccessToken: accessToken };
  try {
    const { data } = await shopifyFetch(CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION, variables);

    if (data?.customerAccessTokenRenew?.customerUserErrors?.length > 0) {
      console.error("Renew failed", data.customerAccessTokenRenew.customerUserErrors);
      return { error: 'Token renewal failed' };
    }

    const newToken = data?.customerAccessTokenRenew?.customerAccessToken?.accessToken;
    const newExpiresAt = data?.customerAccessTokenRenew?.customerAccessToken?.expiresAt;

    if (newToken) {
      return { token: newToken, expiresAt: newExpiresAt };
    }
    return { error: 'No token returned' };
  } catch (e) {
    return { error: 'Network error renewing token' };
  }
}

export const getMe = async (accessToken: string): Promise<Customer | null> => {
  const variables = { customerAccessToken: accessToken };

  try {
    const { data } = await shopifyFetch(CUSTOMER_QUERY, variables);
    const customerNode = data?.customer;

    if (!customerNode) return null;

    // Normalize Orders
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orders = customerNode.orders?.edges?.map((edge: any) => {
      const node = edge.node;
      return {
        id: node.id,
        orderNumber: node.orderNumber,
        processedAt: node.processedAt,
        financialStatus: node.financialStatus,
        fulfillmentStatus: node.fulfillmentStatus,
        totalPrice: node.totalPrice?.amount,
        currency: node.totalPrice?.currencyCode,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: node.lineItems?.edges?.map((li: any) => ({
          title: li.node.title,
          quantity: li.node.quantity,
          image: li.node.variant?.image?.url
        })) || []
      };
    }) || [];

    return {
      id: customerNode.id,
      firstName: customerNode.firstName,
      lastName: customerNode.lastName,
      email: customerNode.email,
      phone: customerNode.phone,
      orders
    };

  } catch (error) {
    console.error('GetMe error:', error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('shopify_customer_token');
  localStorage.removeItem('shopify_token_expires_at');
};
