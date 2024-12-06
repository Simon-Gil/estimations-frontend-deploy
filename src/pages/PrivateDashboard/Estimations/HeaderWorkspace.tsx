import { Box, Typography } from '@mui/material';

const CustomHeader = () => {
    // Títulos y anchos personalizados para cada división
    const titles = ["Cat 1", "Cat 2", "Tarea", "Dirección", "Front", "Back", "Research", "Interfaces"];
    const widths = ["9%", "10%", "22%", "11.3%", "11.3%", "11.3%", "11.3%", "11.3%"];

    // Suma total de los anchos

    return (
        <Box display="flex"
            sx={{
                width: '100% !important',
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
                paddingTop: 0.5,
                paddingBottom: 3.5,
                marginBottom: -3,
                backgroundColor: 'secondary.main' // Fondo color secondary
            }}>
            {titles.map((title, index) => (
                <Box
                    key={index}
                    width={widths[index]} // Usar el porcentaje aquí
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="body2" color='white'>
                        {title}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default CustomHeader;
