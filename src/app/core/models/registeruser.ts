export interface Users {
    id:number;
    firstname: string;
    lastname: string;
    email: string;
    role: Roles;
    birthday: Date;
    mfaEnabled: boolean;
    phoneNumber: number;
    ncin: string;
    image:string;
    blocking:boolean;
    company: string;
  }
  
  export enum Roles {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    EMPLOYEE='EMPLOYEE',
    COMPTABLE='COMPTABLE'
  }