export async function parseApiResponse<T>(response: Response): Promise<T> {
  const responseText = await response.text();
  let body: (T & { error?: string }) | undefined;

  if (responseText) {
    try {
      body = JSON.parse(responseText) as T & { error?: string };
    } catch {
      if (response.ok) throw new Error(`API returned an invalid response (HTTP ${response.status}).`);
    }
  }

  if (!response.ok) {
    throw new Error(body?.error || `API request failed (HTTP ${response.status}). Check that the backend is running.`);
  }

  if (!body) throw new Error(`API returned an empty response (HTTP ${response.status}).`);
  return body;
}

export async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  return parseApiResponse<T>(await fetch(url, options));
}
