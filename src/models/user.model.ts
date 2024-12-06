import { Role } from './role.model';
import { Permission } from './permission.model';

export interface User {
    id: string;
    name: string;
    lastname: string;
    password: string;
    permissions: Permission[];
    roles: Role[];
    email: string;
    department: Department;
    grade: Grade;
    isBlocked: boolean;
}


export interface Department {
    id: string;
    name: string;
}

export interface Grade {
    id: string;
    name: string;
}

export type UpdateUserData = Pick<User, 'id' | 'name' | 'lastname' | 'email' | 'department' | 'grade' | 'roles'>;

export type CreateUserData = Pick<User, 'name' | 'lastname' | 'email' | 'department' | 'grade'>;

export type LoadUserEstimations = Pick<User, 'id' | 'name' | 'lastname' | 'email' | 'department' | 'grade'>;

export type BasicUserData = Pick<User, 'id' | 'name' | 'lastname' | 'email' >;