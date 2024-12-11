import { AuthProvider, UserIdentity } from 'react-admin';
import { FirebaseAuth, getFirebaseAuth } from './firebase';
import { FirebaseAuthConfig } from './types';

function getLoginUrl() {
  return `/login?redirect=${window.location.pathname}`;
}

function getAvatar({ photoURL, displayName }: FirebaseAuth.User) {
  if (photoURL) {
    return photoURL;
  }

  if (displayName) {
    return `https://ui-avatars.com/api/?background=random&name=${displayName}`;
  }
}

export interface FirebaseAuthProvider extends AuthProvider {
  getFirebaseAuth(): FirebaseAuth.Auth;
  getIdToken(): Promise<string | undefined>;
  resetPassword(email: string): Promise<void>;
  update(data: AccountUpdateDto): Promise<void>;
}

export type AccountUpdateDto = {
  fullName?: string;
  password?: string;
};

export function getFirebaseAuthProvider(
  config: FirebaseAuthConfig,
): FirebaseAuthProvider {
  const auth = getFirebaseAuth(config);
  const ready = FirebaseAuth.setPersistence(
    auth,
    FirebaseAuth.browserLocalPersistence,
  );

  let idToken: string | undefined;
  FirebaseAuth.onIdTokenChanged(auth, async (user) => {
    idToken = await user?.getIdToken();
  });

  async function getCurrentUser() {
    await ready;
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Unauthorized');
    }
    return currentUser;
  }

  return {
    getFirebaseAuth() {
      return auth;
    },

    async getIdToken() {
      return idToken;
    },

    async login({ email, password }: { email: string; password: string }) {
      await ready;
      await FirebaseAuth.signInWithEmailAndPassword(auth, email, password);
    },

    async logout() {
      await FirebaseAuth.signOut(auth);
    },

    async checkAuth() {
      return getCurrentUser()
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
      const user = await getCurrentUser();
      return {
        id: user.uid,
        fullName: user.displayName || user.email || undefined,
        email: user.email || undefined,
        avatar: getAvatar(user),
      };
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

    async resetPassword(email: string) {
      await ready;
      await FirebaseAuth.sendPasswordResetEmail(auth, email);
    },

    async update(data: AccountUpdateDto) {
      const currentUser = await getCurrentUser();
      await FirebaseAuth.updateProfile(currentUser, {
        displayName: data.fullName,
      });
      if (data.password) {
        await FirebaseAuth.updatePassword(currentUser, data.password);
      }
    },
  };
}
