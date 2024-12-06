import {User} from '../models/user.model';
import {Role} from '../models/role.model';
import {Permission} from '../models/permission.model';

export const mappingUser = (user: any): User => {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      email: user.email,
      roles: user.roles.map((role: Role) => ({
        id: String(role.id),
        name: String(role.name),
      })),
      permissions: user.roles.flatMap((role: Role) =>
        role.permissions.map((permission : Permission) => ({
          subject: String(permission.subject),
          action: String(permission.action),
          id: String(permission.id),
          description: String(permission.description),
        }))
      ),
      isBlocked: user.isBlocked,
      department: user.department,
      grade: user.grade,
    };
    
};