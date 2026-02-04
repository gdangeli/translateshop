// Shopify Integration - using Admin API

interface ShopifyConfig {
  shopUrl: string; // e.g., 'my-store.myshopify.com'
  accessToken: string; // Admin API access token
}

function normalizeShopifyUrl(url: string): string {
  let normalized = url.trim();
  // Remove protocol if present
  normalized = normalized.replace(/^https?:\/\//, '');
  // Remove trailing slash
  normalized = normalized.replace(/\/$/, '');
  return normalized;
}

interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  handle: string;
  variants: Array<{
    id: number;
    title: string;
    price: string;
  }>;
}

export async function testShopifyConnection(config: ShopifyConfig): Promise<{ success: boolean; shopName?: string; error?: string }> {
  try {
    const shopUrl = normalizeShopifyUrl(config.shopUrl);
    const response = await fetch(`https://${shopUrl}/admin/api/2024-01/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': config.accessToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `API Error: ${response.status} - ${error}` };
    }

    const data = await response.json();
    return { success: true, shopName: data.shop.name };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Connection failed' };
  }
}

export async function fetchShopifyProducts(config: ShopifyConfig, limit = 250): Promise<{ products: any[]; error?: string }> {
  try {
    const shopUrl = normalizeShopifyUrl(config.shopUrl);
    const response = await fetch(
      `https://${shopUrl}/admin/api/2024-01/products.json?limit=${limit}`,
      {
        headers: {
          'X-Shopify-Access-Token': config.accessToken,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return { products: [], error: `API Error: ${response.status}` };
    }

    const data = await response.json();
    
    // Transform to our format
    const products = data.products.map((p: ShopifyProduct) => ({
      externalId: p.id.toString(),
      title: p.title,
      description: p.body_html?.replace(/<[^>]*>/g, '') || '', // Strip HTML
      handle: p.handle,
    }));

    return { products };
  } catch (error) {
    return { products: [], error: error instanceof Error ? error.message : 'Fetch failed' };
  }
}

export async function updateShopifyProduct(
  config: ShopifyConfig,
  productId: string,
  data: { 
    metafields?: Array<{ namespace: string; key: string; value: string; type: string }>;
    translations?: Record<string, { title: string; description?: string }>;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    let metafields: Array<{ namespace: string; key: string; value: string; type: string }> = [];

    // Use provided metafields directly if given
    if (data.metafields) {
      metafields = data.metafields;
    }
    // Or build from translations object (legacy format)
    else if (data.translations) {
      metafields = Object.entries(data.translations).flatMap(([lang, trans]) => [
        {
          namespace: 'translateshop',
          key: `title_${lang}`,
          value: trans.title,
          type: 'single_line_text_field',
        },
        ...(trans.description ? [{
          namespace: 'translateshop',
          key: `description_${lang}`,
          value: trans.description,
          type: 'multi_line_text_field',
        }] : []),
      ]);
    }

    const shopUrl = normalizeShopifyUrl(config.shopUrl);
    const response = await fetch(
      `https://${shopUrl}/admin/api/2024-01/products/${productId}.json`,
      {
        method: 'PUT',
        headers: {
          'X-Shopify-Access-Token': config.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            id: productId,
            metafields,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `API Error: ${response.status} - ${error}` };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Update failed' };
  }
}
