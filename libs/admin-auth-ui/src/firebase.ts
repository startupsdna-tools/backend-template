import { getApp, initializeApp } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import { AuthConfig } from '@app/admin-auth';

export { FirebaseAuth };

export function getFirebaseApp(config: AuthConfig, name?: string) {
  try {
    return getApp(name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return initializeApp(config.firebase, name);
  }
}

export function getFirebaseAuth(config: AuthConfig) {
  const app = getFirebaseApp(config);
  const auth: FirebaseAuth.Auth = FirebaseAuth.getAuth(app);

  if (config.tenantId) {
    auth.tenantId = config.tenantId;
  }

  return auth;
}
