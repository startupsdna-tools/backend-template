import { BrowserRouter } from 'react-router-dom';
import { Admin } from 'react-admin';
import { Admin2, ClerkAuthProvider, Login } from '@app/admin-auth-ui';
import { Dashboard } from './Dashboard';
import { PostsResource } from './PostsResource';

export default function App() {
  /*
  const authProvider = new ClerkAuthProvider(
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    {},
  );
*/

  return (
    <BrowserRouter>
      {/*
      <Admin
        authProvider={authProvider}
        loginPage={Login}
        dashboard={Dashboard}
      >
        {PostsResource}
      </Admin>
*/}
      <Admin2
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        dashboard={Dashboard}
      >
        {PostsResource}
      </Admin2>
    </BrowserRouter>
  );
}
