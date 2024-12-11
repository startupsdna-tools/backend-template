import { AuthProvider, UserIdentity } from 'react-admin';
import { AuthConfig } from '@app/admin-auth';
import { FirebaseAuth, getFirebaseAuth } from './firebase';

function getLoginUrl() {
  return `/login?redirect=${window.location.pathname}`;
}

export interface FirebaseAuthProvider extends AuthProvider {
  getFirebaseAuth(): FirebaseAuth.Auth;
  getIdToken(): Promise<string | undefined>;
  resetPassword(email: string): Promise<void>;
}

export function getFirebaseAuthProvider(
  config: AuthConfig,
): FirebaseAuthProvider {
  const firebaseAuth = getFirebaseAuth(config);
  const ready = FirebaseAuth.setPersistence(
    firebaseAuth,
    FirebaseAuth.browserLocalPersistence,
  );

  let idToken: string | undefined;
  FirebaseAuth.onIdTokenChanged(firebaseAuth, async (user) => {
    idToken = await user?.getIdToken();
    console.log('idToken:', idToken);
  });

  async function getAccount() {
    await ready;
    await firebaseAuth.authStateReady();
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) {
      throw new Error('Unauthorized');
    }
    return currentUser;
  }

  return {
    getFirebaseAuth(): FirebaseAuth.Auth {
      return firebaseAuth;
    },

    async getIdToken(): Promise<string | undefined> {
      return idToken;
    },

    async login({ email, password }: { email: string; password: string }) {
      await ready;
      await FirebaseAuth.signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
    },

    async logout(): Promise<string | false | void> {
      await FirebaseAuth.signOut(firebaseAuth);
    },

    async checkAuth() {
      return getAccount()
        .then(() => Promise.resolve())
        .catch(() => {
          return Promise.reject({
            message: 'You are not authenticated. Please login.',
            logoutUser: false,
            redirectTo: getLoginUrl(),
          });
        });
    },

    async getIdentity(): Promise<UserIdentity> {
      return getAccount().then((account) => {
        return {
          id: account.uid,
          fullName: account.displayName || account.email || undefined,
          email: account.email || undefined,
          avatar: account.photoURL || undefined,
        };
      });
    },

    checkError({ status }: { status: number }) {
      if (status === 401) {
        return Promise.reject({
          message: 'Unauthenticated. Please login again.',
          logoutUser: false,
          redirectTo: getLoginUrl(),
        });
      }
      return Promise.resolve();
    },

    async getPermissions() {
      return [];
    },

    async update() {
      await getAccount();
    },

    async resetPassword(email: string) {
      await ready;
      await FirebaseAuth.sendPasswordResetEmail(firebaseAuth, email);
    },
  };
}
