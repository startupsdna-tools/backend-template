import axios from 'axios';

/**
 * Main HTTP client for the app
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL || '/api',
});

export function addApiTokenInterceptor(
  getter: () => Promise<string | undefined>,
) {
  apiClient.interceptors.request.use(async (config) => {
    const token = await getter();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}
