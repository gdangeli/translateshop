// Shopify Integration - using Admin API

interface ShopifyConfig {
  shopUrl: string; // e.g., 'my-store.myshopify.com'
  accessToken: string; // Admin API access token
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
    const response = await fetch(`https://${config.shopUrl}/admin/api/2024-01/shop.json`, {
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
    const response = await fetch(
      `https://${config.shopUrl}/admin/api/2024-01/products.json?limit=${limit}`,
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
  translations: Record<string, { title: string; description?: string }>
): Promise<{ success: boolean; error?: string }> {
  // Note: Shopify doesn't have native multi-language support in Storefront
  // This would need Shopify Markets or a translation app
  // For now, we'll provide the metafields approach
  
  try {
    // Update product metafields with translations
    const metafields = Object.entries(translations).flatMap(([lang, trans]) => [
      {
        namespace: 'translations',
        key: `title_${lang}`,
        value: trans.title,
        type: 'single_line_text_field',
      },
      ...(trans.description ? [{
        namespace: 'translations',
        key: `description_${lang}`,
        value: trans.description,
        type: 'multi_line_text_field',
      }] : []),
    ]);

    const response = await fetch(
      `https://${config.shopUrl}/admin/api/2024-01/products/${productId}.json`,
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
