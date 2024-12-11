import { BrowserRouter } from 'react-router-dom';
import { Admin } from 'react-admin';
import { getFirebaseAuthProvider, LoginPage } from '@app/admin-auth-ui';
import { addApiTokenInterceptor, apiClient } from './apiClient';
import { Dashboard } from '../dashboard';
import { PostsResource } from '../posts';
import { ApiClientProvider } from '../common';

export function App() {
  const authProvider = getFirebaseAuthProvider({
    firebase: {
      projectId: import.meta.env.VITE_ADMIN_AUTH_PROJECT_ID,
      apiKey: import.meta.env.VITE_ADMIN_AUTH_API_KEY,
    },
    tenantId: import.meta.env.VITE_ADMIN_AUTH_TENANT_ID,
  });

  addApiTokenInterceptor(() => authProvider.getIdToken());

  return (
    <BrowserRouter>
      <ApiClientProvider value={apiClient}>
        <Admin
          authProvider={authProvider}
          loginPage={LoginPage}
          dashboard={Dashboard}
          requireAuth={true}
        >
          {PostsResource}
        </Admin>
      </ApiClientProvider>
    </BrowserRouter>
  );
}

export default App;
