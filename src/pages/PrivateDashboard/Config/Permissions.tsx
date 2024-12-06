import { useEffect, useState } from "react";
import { getRoles } from "../../../services/permissions.services";
import { SimpleRole } from "../../../models/role.model";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Paper} from "@mui/material";
import RolPermissionsTree from "./RolePermissionsTree";

const Permissions: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [roles, setRoles] = useState<SimpleRole[]>([]);
    const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            try {
                const rolesData = await getRoles();
                setRoles(rolesData);
            } catch (error) {
                console.error('Error al cargar los roles', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
    }, []);

    const handleRoleChange = (event: SelectChangeEvent<string>) => {
        const selectedId = event.target.value;
        setSelectedRoleId(selectedId || null); // Actualiza con el id o null si está vacío.
    };

    return (
        <Paper elevation={3} style={{ padding: 25, width: '100%', margin: 'auto', borderRadius: 6 }}>
            <FormControl fullWidth style={{ marginTop: '20px' }}>
                <InputLabel id="select-role-label">Selecciona un Rol</InputLabel>
                <Select
                    labelId="select-role-label"
                    value={selectedRoleId || ''}
                    onChange={handleRoleChange}
                    disabled={loading}
                    label="Selecciona un Rol"
                >
                    {roles
                        .filter((role) => role.name.toLowerCase() !== 'admm')
                        .map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <RolPermissionsTree roleId={selectedRoleId} />
        </Paper>
    );
}
export default Permissions