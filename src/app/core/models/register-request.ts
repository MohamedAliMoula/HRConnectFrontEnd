export interface RegisterRequest {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: RoleType;
  mfaEnabled?: string;
  birthday?: Date;
  phoneNumber?: number;
  ncin?: string;
  company?: string;
  image?: string;
}
export enum RoleType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE='Employee',
  COMPTABLE='Comptable'
}