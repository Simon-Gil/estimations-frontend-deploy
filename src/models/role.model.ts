import { Permission } from './permission.model';

export interface Role {
    id: string;
    name: string;
    permissions: Permission[];
}
  

export type SimpleRole = Pick<Role, 'id' | 'name'>;