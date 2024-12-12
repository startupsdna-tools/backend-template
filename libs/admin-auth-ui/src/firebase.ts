import { FirebaseOptions, getApp, initializeApp } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import { FirebaseAuthConfig } from './types';

export { FirebaseAuth };

export function getFirebaseApp(options: FirebaseOptions, name?: string) {
  try {
    return getApp(name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return initializeApp(options, name);
  }
}

export function getFirebaseAuth(config: FirebaseAuthConfig) {
  const app = getFirebaseApp(config.firebase);
  const auth: FirebaseAuth.Auth = FirebaseAuth.getAuth(app);

  if (config.tenantId) {
    auth.tenantId = config.tenantId;
  }

  return auth;
}
