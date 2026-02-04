// WooCommerce Integration - using REST API

interface WooCommerceConfig {
  siteUrl: string; // e.g., 'https://my-store.com'
  consumerKey: string;
  consumerSecret: string;
}

interface WooProduct {
  id: number;
  name: string;
  description: string;
  short_description: string;
  slug: string;
  lang?: string; // For WPML/Polylang
}

function getAuthHeader(config: WooCommerceConfig): string {
  // Use btoa for browser/edge compatibility (Buffer not available in Edge Runtime)
  const credentials = typeof Buffer !== 'undefined' 
    ? Buffer.from(`${config.consumerKey}:${config.consumerSecret}`).toString('base64')
    : btoa(`${config.consumerKey}:${config.consumerSecret}`);
  return `Basic ${credentials}`;
}

function normalizeUrl(url: string): string {
  let normalized = url.trim().replace(/\/$/, '');
  // Add https:// if no protocol
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`;
  }
  return normalized;
}

export async function testWooCommerceConnection(config: WooCommerceConfig): Promise<{ success: boolean; siteName?: string; error?: string }> {
  try {
    // Clean up and normalize URL
    const baseUrl = normalizeUrl(config.siteUrl);
    
    const response = await fetch(`${baseUrl}/wp-json/wc/v3/system_status`, {
      headers: {
        'Authorization': getAuthHeader(config),
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return { success: false, error: 'Ungültige API-Zugangsdaten' };
      }
      const error = await response.text();
      return { success: false, error: `API Error: ${response.status}` };
    }

    const data = await response.json();
    return { success: true, siteName: data.environment?.site_url || config.siteUrl };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Connection failed' };
  }
}

export async function fetchWooCommerceProducts(config: WooCommerceConfig, perPage = 100): Promise<{ products: any[]; error?: string }> {
  try {
    const baseUrl = normalizeUrl(config.siteUrl);
    
    const response = await fetch(
      `${baseUrl}/wp-json/wc/v3/products?per_page=${perPage}`,
      {
        headers: {
          'Authorization': getAuthHeader(config),
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
    const products = data.map((p: WooProduct) => ({
      externalId: p.id.toString(),
      title: p.name,
      description: p.description?.replace(/<[^>]*>/g, '') || '', // Strip HTML
      shortDescription: p.short_description?.replace(/<[^>]*>/g, '') || '',
      slug: p.slug,
      lang: p.lang,
    }));

    return { products };
  } catch (error) {
    return { products: [], error: error instanceof Error ? error.message : 'Fetch failed' };
  }
}

export async function updateWooCommerceProduct(
  config: WooCommerceConfig,
  productId: string,
  data: { 
    name?: string; 
    description?: string; 
    short_description?: string;
    meta_data?: Array<{ key: string; value: string }>;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const baseUrl = normalizeUrl(config.siteUrl);
    
    const response = await fetch(
      `${baseUrl}/wp-json/wc/v3/products/${productId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': getAuthHeader(config),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

// For WPML/Polylang multilingual support
export async function fetchWooCommerceProductTranslations(
  config: WooCommerceConfig,
  productId: string
): Promise<{ translations: Record<string, any>; error?: string }> {
  try {
    const baseUrl = normalizeUrl(config.siteUrl);
    
    // Try WPML endpoint first
    const response = await fetch(
      `${baseUrl}/wp-json/wpml/v1/products/${productId}/translations`,
      {
        headers: {
          'Authorization': getAuthHeader(config),
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { translations: data };
    }

    // Fallback: no multilingual plugin
    return { translations: {} };
  } catch (error) {
    return { translations: {}, error: error instanceof Error ? error.message : 'Fetch failed' };
  }
}
