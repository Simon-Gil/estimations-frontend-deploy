import { Navigate } from 'react-router-dom';
import { useHasAccess } from '../hooks/useHasAccess';
import React, { ReactNode } from 'react';

interface PermissionGuardProps {
  subjects: string[]; 
  requiredActions?: string[];
  children: ReactNode; // Añadir children de tipo ReactNode
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ subjects, requiredActions = [], children }) => {
  const hasAccess = subjects.some(subject => useHasAccess(subject, requiredActions));

  if (!hasAccess) {
    return <Navigate to={'/dashboard'} />;
  }

  return <>{children}</>; // Renderiza los children directamente
};

export default PermissionGuard;
