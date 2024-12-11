import { AuthProvider } from 'react-admin';
import { Clerk } from '@clerk/clerk-js';

// infer type of first argument of Clerk.load method
type ClerkOptions = Parameters<(typeof Clerk.prototype)['load']>[0];

export class ClerkAuthProvider implements AuthProvider {
  private readonly clerk: Clerk;
  private readonly loadPromise: Promise<void> | null = null;

  constructor(publishableKey: string, options: ClerkOptions) {
    this.clerk = new Clerk(publishableKey);
    this.loadPromise = this.clerk.load(options);
  }

  login(params: any) {
    return Promise.resolve();
  }

  logout(params: any) {
    return Promise.resolve();
  }

  async checkAuth(params: any) {
    await this.loadPromise;

    if (this.clerk.session?.id) {
      return;
    }

    return Promise.reject();
  }

  checkError(params: any) {
    return Promise.resolve();
  }

  async getIdentity(params: any) {
    await this.loadPromise;

    return {
      id: this.clerk.user?.id,
      fullName: this.clerk.user?.fullName,
      avatar: this.clerk.user?.imageUrl,
    };
  }

  getPermissions(params: any) {
    return Promise.resolve();
  }
}
