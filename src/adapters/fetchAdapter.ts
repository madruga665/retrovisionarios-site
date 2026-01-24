export async function fetchAdapter<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.RETROVISIONARIOS_API_BASE_URL;
  if (!baseUrl) {
    throw new Error(
      'A variável de ambiente RETROVISIONARIOS_API_BASE_URL não está definida.'
    );
  }
  const url = `${baseUrl}${path}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error fetching ${path}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result ?? data;
}
