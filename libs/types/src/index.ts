export type UserRole = 'admin' | 'analyst' | 'operator';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ApiStatus {
  service: string;
  healthy: boolean;
  timestamp: string;
}
