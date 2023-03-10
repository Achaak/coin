import type { DefaultSession } from 'next-auth';
import type { UserRole } from '@my-coin/database';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    user?: DefaultSession['user'] & {
      id: string;
      emailVerified: Date | null;
      role: UserRole;
    };
  }
}
