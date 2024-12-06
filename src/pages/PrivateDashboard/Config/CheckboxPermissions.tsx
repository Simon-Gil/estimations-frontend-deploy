import { Checkbox, FormControlLabel, Tooltip, Typography } from "@mui/material";
import { Action } from "../../../models/permissionsByRole";

interface CheckboxPermissionProps {
    action: Action;
    isChecked: boolean;
    onChange: (id: string, isActive: boolean) => void;
}

const CheckboxPermission: React.FC<CheckboxPermissionProps> = ({ action, isChecked, onChange }) => {

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(action.id, event.target.checked);
    };

    return (
        <Tooltip title={action.description} placement="left">
            <FormControlLabel
                control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                label={
                    <Typography variant="body2">
                      {action.name}
                    </Typography>
                  }
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                }}
            />
        </Tooltip>
    );
};

export default CheckboxPermission;