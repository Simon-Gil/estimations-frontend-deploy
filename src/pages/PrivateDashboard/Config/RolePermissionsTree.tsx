import { useEffect, useState } from "react";
import { getRolePermissions } from "../../../services/permissions.services";
import { PermissionsRoleList } from "../../../models/permissionsByRole";
import SpecificPermissionSubject from "./SpecificPermissionSubject";
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid2';


interface RolePermissionsTreeProps {
  roleId: string | null;
}

const RolePermissionsTree: React.FC<RolePermissionsTreeProps> = ({ roleId }) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [initialPermissions, setInitialPermissions] = useState<PermissionsRoleList>();
  
  const fetchPermissions = async () => {
    if (roleId) {
      const permissions = await getRolePermissions(roleId);
      setInitialPermissions(permissions);
    }
  };

  useEffect(() => {

    fetchPermissions();
  }, [roleId]);

  const handleSelectSubject = (subjectKey: string) => {
    setSelectedSubject(subjectKey);
  };

  return (
    <Grid container paddingTop={2} spacing={2}>
      <Grid size={4}>
        {/* Botones de Subjects */}
        {roleId &&
          initialPermissions &&
          initialPermissions.subjects.map((subject) => (
            <Button
              key={subject.subject}
              fullWidth
              color="secondary"
              variant={selectedSubject === subject.subject ? "contained" : "outlined"}
              onClick={() => handleSelectSubject(subject.subject)}
              style={{ textAlign: "left", marginBottom: "8px" }}
            >
              {subject.subject === "user" && "Usuarios"}
              {subject.subject === "settings" && "Ajustes"}
              {subject.subject === "account" && "Cuentas"}
              {subject.subject === "opportunity" && "Oportunidades"}
              {subject.subject === "proposal" && "Propuestas"}
              {subject.subject === "estimation" && "Estimaciones"}
              {subject.subject === "task" && "Tareas"}
              {subject.subject === "roles_and_permissions" && "Roles y Permisos"}
            </Button>
          ))}
      </Grid>
      <Grid size={8}>
        {/* Mostrar el SpecificPermissionSubject seleccionado */}
        {selectedSubject && roleId && initialPermissions && (
          (() => {
            const selectedPermission = initialPermissions.subjects.find(
              (subject) => subject.subject === selectedSubject
            );

            if (selectedPermission) {
              return (
                <SpecificPermissionSubject
                  roleId={roleId}
                  permission={selectedPermission}
                  fetchPermissions={fetchPermissions}
                />
              );
            }
            return null;
          })()
        )}
      </Grid>

    </Grid>
  );
};
export default RolePermissionsTree;