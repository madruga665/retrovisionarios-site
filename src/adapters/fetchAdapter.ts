export async function fetchAdapter<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.RETROVISIONARIOS_API_BASE_URL;
  if (!baseUrl) console.warn('⚠️ API Base URL not configured!');
  const url = `${baseUrl}${path}`;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`Error fetching ${path}: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
