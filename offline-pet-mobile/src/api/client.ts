const BASE_URL = 'http://localhost:3000';

export async function apiRequest<T>(
  path: string,
  method: 'GET' | 'POST',
  userId: string,
  body?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  return response.json() as Promise<T>;
}
