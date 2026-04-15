// This utility can be expanded for more complex API interactions.
// For this simple contact form, direct fetch in the component is sufficient.
// However, if there were many API calls, this would be the place to centralize them.

interface ApiConfig {
  baseURL?: string;
  headers?: HeadersInit;
}

const defaultConfig: ApiConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const callApi = async <TResponse, TBody = unknown>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: TBody,
  config?: ApiConfig
): Promise<TResponse> => {
  const mergedConfig = { ...defaultConfig, ...config };
  const url = `${mergedConfig.baseURL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: mergedConfig.headers,
  };

  if (body && ['POST', 'PUT'].includes(method)) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API call failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error; // Re-throw to be handled by the caller
  }
};

// Example usage (not directly used by current contact form, but for future expansion):
// import { callApi } from './api';

// async function submitContact(data: ContactFormData) {
//   return callApi<ApiResponse, ContactFormData>('/contact', 'POST', data);
// }
