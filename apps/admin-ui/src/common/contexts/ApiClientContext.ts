import { createContext, useContext } from 'react';
import { AxiosInstance } from 'axios';

export const ApiClientContext = createContext<AxiosInstance | null>(null);

export const ApiClientProvider = ApiClientContext.Provider;

export function useApiClient() {
  const apiClient = useContext(ApiClientContext);
  if (!apiClient) {
    throw new Error(
      'You forgot to provide apiClient. Use <ApiClientProvider value={yourApiClient}>...</ApiClientProvider>',
    );
  }

  return apiClient;
}
