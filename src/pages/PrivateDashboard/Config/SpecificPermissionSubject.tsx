import { Action, PermissionRole } from "../../../models/permissionsByRole";
import { updateRolePermissions } from "../../../services/permissions.services";
import { SnackbarUtilities } from "../../../Utilities/snackbar-manager";
import CheckboxPermission from "./CheckboxPermissions";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

interface SpecificPermissionSubjectProps {
    permission: PermissionRole;
    roleId: string;
    fetchPermissions: () => void;
}

const SpecificPermissionSubject: React.FC<SpecificPermissionSubjectProps> = ({ permission, roleId , fetchPermissions }) => {
    // Estado para almacenar el estado de los checkboxes que reflejan los valores iniciales
    const [permissionState, setPermissionState] = useState<{ [key: string]: boolean }>({});

    // Cuando el componente se monta, precargamos el estado de los checkboxes
    useEffect(() => {
        const initialState: { [key: string]: boolean } = {};

        // Inicializamos el estado con los valores de la API
        const initializePermissionState = (actions: Action[]) => {
            actions.forEach((action) => {
                initialState[action.id] = action.isActive; // Valor inicial de cada permiso
                if (action.childActions && action.childActions.length > 0) {
                    initializePermissionState(action.childActions); // Llamamos recursivamente si hay childActions
                }
            });
        };

        initializePermissionState(permission.actions); // Rellenamos el estado con la información de la API
        setPermissionState(initialState); // Establecemos el estado inicial
    }, [permission]);

    // Maneja el cambio de estado de un checkbox
    const handleCheckboxChange = (id: string, isActive: boolean) => {
        console.log('id:', id, 'isActive:', isActive);

        // Actualizamos solo el estado de ese permiso en el permisoState
        setPermissionState((prevState) => ({
            ...prevState,
            [id]: isActive,
        }));
    };

    // Función para obtener los permisos modificados (granted y revoked)
    const getPermissionChanges = () => {
        const granted: string[] = [];
        const revoked: string[] = [];

        // Solo recorremos el permissionState para detectar los cambios
        // Añadimos permisos a granted si están activados, a revoked si están desactivados
        for (const [id, isActive] of Object.entries(permissionState)) {
            if (isActive) {
                granted.push(id); // Si el estado es true, lo añadimos a granted
            } else {
                revoked.push(id); // Si el estado es false, lo añadimos a revoked
            }
        }

        console.log('granted:', granted);
        console.log('revoked:', revoked);
        return { granted, revoked };
    };

    // Maneja el envío de los permisos
    const handleSavePermissions = async () => {
        const { granted, revoked } = getPermissionChanges();

        // Llamamos al servicio para actualizar los permisos
        try {
            const response = await updateRolePermissions(roleId, granted, revoked);
            console.log('response', response);
            SnackbarUtilities.success('Permisos actualizados correctamente');
            fetchPermissions(); // Recargamos los permisos
        } catch (error) {
            console.error('Error al guardar los permisos', error);
        }
    };

    // Función para renderizar las acciones
    const renderActions = (actions: Action[], depth: number = 0) => {
        return actions.map((action) => (
          <Box
            key={action.id}
            sx={{borderTop: '1px solid #ddd', paddingLeft: `${depth * 15}px`}}
          >
            <CheckboxPermission
              action={action}
              isChecked={permissionState[action.id] || false}
              onChange={handleCheckboxChange}
            />
            {action.childActions.length > 0 && renderActions(action.childActions, depth + 1)}
          </Box>
        ));
      };
      
      
      

    return (
        <Box border={2} borderRadius={2} borderColor={'secondary.main'} padding={2}>
            {renderActions(permission.actions)}
            <Button
            fullWidth
            variant='contained'
            color='secondary'
            onClick={handleSavePermissions}>Guardar Cambios</Button>
        </Box>
    );
};

export default SpecificPermissionSubject;
