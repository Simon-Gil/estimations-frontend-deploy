import { useState } from "react";
import { PriceConfig } from "../../../models/prices.model";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SnackbarUtilities } from "../../../Utilities/snackbar-manager";
import { patchDefaultPrice, patchProposalConfig } from "../../../services/generalConfig.services";
import { inputNumberStyles } from "../../../Styles/components.styles";
import { useHasAccess } from '../../../hooks/useHasAccess';

interface CommercialSettingsProps {
    expirationDays: number;
    priceConfig: PriceConfig;
    fetchSettingsPrice: () => void;
    fetchSettings: () => void;
}

const CommercialSettings: React.FC<CommercialSettingsProps> = ({ expirationDays, priceConfig, fetchSettingsPrice, fetchSettings }) => {
    console.log('fetchSettingsPrice', fetchSettingsPrice);
    const [expirationDaysToSend, setExpirationDaysToSend] = useState<number>(expirationDays);
    const hasProposalExpPermission = useHasAccess('settings', ['updateProposalExpiration'])
    const hasPricePermission = useHasAccess('settings', ['updateDefaultPriceConfig'])

    const [prices, setPrices] = useState(
        priceConfig.profilePrices.map((profile) => ({
            id: profile.profile.id,
            name: profile.profile.name,
            priceH: (profile.priceH),
        }))
    );

    const [initialExpirationDays, setInitialExpirationDays] = useState(expirationDays);
    const [initialPrices, setInitialPrices] = useState(
        priceConfig.profilePrices.map((profile) => ({
            id: profile.profile.id,
            priceH: (profile.priceH),
        }))
    );

    const handlePriceChange = (profileId: string, value: number) => {
        setPrices((prevPrices) =>
            prevPrices.map((profile) =>
                profile.id === profileId ? { ...profile, priceH: value } : profile
            )
        );
    };

    const updateConfig = async () => {
        try {
            let hasUpdates = false;

            // Actualiza expirationDays si cambió
            if (expirationDaysToSend !== initialExpirationDays) {
                await patchProposalConfig(expirationDaysToSend);
                setInitialExpirationDays(expirationDaysToSend); // Actualiza el valor inicial
                hasUpdates = true;
            }

            // Actualiza precios si cambiaron
            const updatedPrices = prices.filter((profile, index) => {
                const initialPrice = initialPrices[index];
                return initialPrice && initialPrice.priceH !== profile.priceH;
            });

            if (updatedPrices.length > 0) {
                await patchDefaultPrice({
                    profilePrices: updatedPrices.map((profile) => ({
                        profile: profile.id,
                        priceH: profile.priceH,
                    })),
                });
                setInitialPrices(prices); // Actualiza los precios iniciales
                hasUpdates = true;
            }

            if (hasUpdates) {
                SnackbarUtilities.success("Configuración actualiazada con éxito");
                if (hasProposalExpPermission) {
                    fetchSettings();
                }

                if (hasPricePermission) {
                    fetchSettingsPrice();
                }
            } else {
                SnackbarUtilities.info("No se realizaron cambios");
            }
        } catch (error) {
            console.error("Error al actualizar la configuración de propuesta", error);
        }
    };

    return (
        <Paper elevation={3} style={{ width: "100%", margin: "auto", borderRadius: 6 }}>
            <Box paddingX={30} paddingY={4}>
                <Typography variant="h4" style={{ marginBottom: 20 }}>
                    Ajustes Comerciales
                </Typography>
                {hasProposalExpPermission && (
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={10}>
                            <Typography
                                variant="body1"
                                sx={{ display: "flex", alignItems: "center", height: "45px" }}
                            >
                                Días de validez de una propuesta Comercial:
                            </Typography>
                        </Grid>
                        <Grid size={2}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                type="number"
                                sx={{ width: "80px" }}
                                value={expirationDaysToSend}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    setExpirationDaysToSend(isNaN(value) ? 0 : value);
                                }}
                            />
                        </Grid>
                    </Grid>
                )}
                {hasPricePermission && (
                    <>
                        <Grid marginTop={3}>
                            <Typography
                                variant="body1"
                                sx={{ display: "flex", alignItems: "center", height: "45px" }}
                            >
                                Actualizar precios por defecto de los perfiles:
                            </Typography>
                        </Grid>
                        <Grid container size={12} spacing={2}>
                            {prices.map((profile) => (
                                <Grid size={2.4} key={profile.id}>
                                    <TextField
                                        label={`${profile.name}`}
                                        variant="filled"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        value={typeof profile.priceH === 'number' ? Math.floor(profile.priceH) : Math.floor(parseFloat(profile.priceH))}
                                        InputProps={{
                                            disableUnderline: true,
                                            inputProps: { style: { appearance: "textfield", textAlign: "center" } },
                                        }}
                                        InputLabelProps={{ style: { textAlign: "center", width: "100%" } }}
                                        sx={inputNumberStyles}
                                        onChange={(e) => {
                                            const value = parseFloat(e.target.value);
                                            if (value < 1) {
                                                SnackbarUtilities.warning("Asigna un precio válido");
                                                handlePriceChange(profile.id, 1);
                                            } else {
                                                handlePriceChange(profile.id, value);
                                            }
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
                <Button
                    sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={updateConfig}
                >
                    <Typography variant="h4" color="white">
                        Actualizar
                    </Typography>
                </Button>
            </Box>
        </Paper>
    );
};

export default CommercialSettings;
