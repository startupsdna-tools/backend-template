import { ClerkProvider, useAuth, useClerk } from '@clerk/clerk-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './Login';
import { useEffect } from 'react';
import {
  Admin as RaAdmin,
  AdminProps as RaAdminProps,
  AuthProvider,
} from 'react-admin';
import { ClerkAuthProvider } from './ClerkAuthProvider';

export type AdminProps = Omit<RaAdminProps, 'loginPage' | 'authProvider'>;

type ClerkProps = {
  publishableKey: string;
};

export function Admin2(props: AdminProps & ClerkProps) {
  const { publishableKey, ...restProps } = props;
  if (!publishableKey) {
    throw new Error('Add your Clerk Publishable Key to the .env.local file');
  }
  const authProvider = new ClerkAuthProvider(publishableKey, {});
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      signInUrl="/login"
      afterSignOutUrl="/"
      telemetry={false}
    >
      <RaAdmin
        authProvider={authProvider}
        loginPage={<Login />}
        requireAuth
        {...restProps}
      />
      {/*<AdminWrapper {...restProps} />*/}
    </ClerkProvider>
  );
}

function AdminWrapper(props: AdminProps) {
  const clerk = useClerk();
  const auth = useAuth();

  const authProvider: AuthProvider = {
    async checkAuth() {
      if (auth.isSignedIn) {
        return Promise.resolve();
      }
      return Promise.reject();
    },
    checkError(error: any): Promise<void> {
      return Promise.resolve(undefined);
    },
    login(params: any): Promise<any> {
      return Promise.resolve(undefined);
    },
    async logout(params: any): Promise<void | false | string> {
      await clerk.signOut();
    },
  };

  return (
    <RaAdmin
      authProvider={authProvider}
      loginPage={<Login />}
      requireAuth
      {...props}
    />
  );
}

function Authenticated(props: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/login');
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return props.children;
}
