export type UserRoles = 'user' | 'admin';
export type UserStatuses = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  neptun_code: string;
  role: UserRoles;
  status: UserStatuses;
  user_uid: string;
}
