export interface PermissionGuardProps {
    requiredSubject: string; 
    requiredActions: string[];
    children: React.ReactNode; 
}
