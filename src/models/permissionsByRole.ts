export interface PermissionsRoleList {
    subjects: PermissionRole[];
}

export interface PermissionRole {
    subject: string;
    actions: Action[];
}
  
export interface Action {
    action: string;
    childActions: Array<Action>;
    id: string;
    description: string;
    name: string;
    isActive: boolean;
}

