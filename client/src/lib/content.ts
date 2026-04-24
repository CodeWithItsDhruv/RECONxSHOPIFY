import { shopifyConfig } from './shopify';

export interface HomeContentDTO {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  marqueeText: string[];
}

// Fallback content (matches current hardcoded values)
const DEFAULT_CONTENT: HomeContentDTO = {
  heroTitle: "RECON AUTOBOTS",
  heroSubtitle: "Premium Motorcycle Riding Gear & Accessories",
  marqueeText: [
    "AIROH • AXOR • BMC • BLUARMOR • MADDOG • SMK • STUDDS",
    "AIROH • AXOR • BMC • BLUARMOR • MADDOG • SMK • STUDDS",
    "AIROH • AXOR • BMC • BLUARMOR • MADDOG • SMK • STUDDS"
  ]
};

const HOMEPAGE_QUERY = `
  query {
    metaobjects(type: "homepage_content", first: 1) {
      edges {
        node {
          fields {
            key
            value
            reference {
              ... on MediaImage {
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
`;

export const getHomeContent = async (): Promise<HomeContentDTO> => {
  try {
    const response = await fetch(`https://${shopifyConfig.domain}/api/${shopifyConfig.apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontAccessToken,
      },
      body: JSON.stringify({ query: HOMEPAGE_QUERY }),
    });
    const json = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const edge = (json as any).data?.metaobjects?.edges?.[0];

    if (!edge) {
      console.log("No CMS content found, using default.");
      return DEFAULT_CONTENT;
    }

    // Parse fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fields = edge.node.fields;

    // Helper to find field value
    const getVal = (key: string) => fields.find((f: any) => f.key === key)?.value;
    const getImg = (key: string) => fields.find((f: any) => f.key === key)?.reference?.image?.url;

    const marqueeRaw = getVal('marquee_text');

    return {
      heroTitle: getVal('hero_title') || DEFAULT_CONTENT.heroTitle,
      heroSubtitle: getVal('hero_subtitle') || DEFAULT_CONTENT.heroSubtitle,
      heroImage: getImg('hero_image'), // Undefined means use local asset in component
      marqueeText: marqueeRaw ? [marqueeRaw, marqueeRaw, marqueeRaw] : DEFAULT_CONTENT.marqueeText
    };

  } catch (error) {
    console.error("CMS Fetch Error:", error);
    return DEFAULT_CONTENT;
  }
};
