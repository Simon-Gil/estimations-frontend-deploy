import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Permissions from './Permissions';
import { useEffect, useState } from 'react';
import EmailSettings from './EmailSettings';
import SecuritySettings from './SecuritySettings';
import { getSettings, getSettingsPrice } from '../../../services/generalConfig.services';
import { EmailConfig, SecurityConfig } from '../../../models/settings.model';
import { PriceConfig } from '../../../models/prices.model';
import CommercialSettings from './CommercialSettings';
import { useHasAccess } from '../../../hooks/useHasAccess';

function Config() {
    const [activeView, setActiveView] = useState<'permissions' | 'security' | 'email' | 'commercial'>('permissions');
    const [expitationDays, setExpirationDays] = useState<number>(0)
    const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
        maxLoginAttempts: 0,
        blockDurationMinutes: 0,
        expirationAuthTokenHours: 0,
        expirationResetTokenHours: 0
    })
    const [emailConfig, setEmailConfig] = useState<EmailConfig>({
        sendUserFinishedEmail: false,
        sendDoneEstimationEmail: false,
        sendAssignedUserEmail: false
    })
    const [priceConfig, setPriceConfig] = useState<PriceConfig>({ profilePrices: [] })
    const hasEmailPermission = useHasAccess('settings', ['updateEmailConfig'])
    const hasSecurityPermission = useHasAccess('settings', ['updateSecurityConfig'])
    const hasProposalExpPermission = useHasAccess('settings', ['updateProposalExpiration'])
    const hasPricePermission = useHasAccess('settings', ['updateDefaultPriceConfig'])
    const hasRolesPermission = useHasAccess('roles_and_permissions', ['manage'])

    useEffect(() => {

        if (hasProposalExpPermission || hasSecurityPermission || hasEmailPermission) {
            fetchSettings()
        }

        if (hasPricePermission) {
            fetchSettingsPrice()
        }
        
    }, [])

    const fetchSettings = async () => {
        try {
            const response = await getSettings()
            console.log("response get settings", response)
            setSecurityConfig({
                maxLoginAttempts: response.maxLoginAttempts,
                blockDurationMinutes: response.blockDurationMinutes,
                expirationAuthTokenHours: response.expirationAuthTokenHours,
                expirationResetTokenHours: response.expirationResetTokenHours
            })
            setEmailConfig({
                sendUserFinishedEmail: response.sendUserFinishedEmail,
                sendDoneEstimationEmail: response.sendDoneEstimationEmail,
                sendAssignedUserEmail: response.sendAssignedUserEmail
            })
            setExpirationDays(response.expirationProposalDays)
        } catch (error) {
            console.error('Error al cargar los ajustes generales', error)
        }
    }

    const fetchSettingsPrice = async () => {
        try {
            const response = await getSettingsPrice()
            setPriceConfig(response)
            console.log("response get price", response)
        } catch (error) {
            console.error('Error al cargar los ajustes de precio', error)
        }
    }

    return (
        <Grid container width={'100%'} >
            <Grid container spacing={2} size={12}>
                {hasRolesPermission && (
                    <Grid size={3}>
                        <Button
                            sx={{ marginTop: 2, paddingY: 1.2 }}
                            type='submit'
                            variant='contained'
                            color={activeView === 'permissions' ? 'primary' : 'secondary'}
                            fullWidth
                            onClick={() => setActiveView('permissions')}
                        >
                            <Typography variant="body2" color={'white'}>
                                Roles y Permisos
                            </Typography>
                        </Button>
                    </Grid>
                )}
                {hasSecurityPermission && (
                    <Grid size={3}>
                        <Button
                            sx={{ marginTop: 2, paddingY: 1.2 }}
                            type='submit'
                            variant='contained'
                            color={activeView === 'security' ? 'primary' : 'secondary'}
                            fullWidth
                            onClick={() => setActiveView('security')}
                        >
                            <Typography variant="body2" color={'white'}>
                                Ajustes de Seguridad
                            </Typography>
                        </Button>
                    </Grid>
                )}
                {hasEmailPermission && (
                    <Grid size={3}>
                        <Button
                            sx={{ marginTop: 2, paddingY: 1.2 }}
                            type='submit'
                            variant='contained'
                            color={activeView === 'email' ? 'primary' : 'secondary'}
                            fullWidth
                            onClick={() => setActiveView('email')}
                        >
                            <Typography variant="body2" color={'white'}>
                                Envio de Correos
                            </Typography>
                        </Button>
                    </Grid>
                )}
                {(hasPricePermission || hasProposalExpPermission) && (
                    <Grid size={3}>
                        <Button
                            sx={{ marginTop: 2, paddingY: 1.2 }}
                            type='submit'
                            variant='contained'
                            color={activeView === 'commercial' ? 'primary' : 'secondary'}
                            fullWidth
                            onClick={() => setActiveView('commercial')}
                        >
                            <Typography variant="body2" color={'white'}>
                                Ajustes Comerciales
                            </Typography>
                        </Button>
                    </Grid>
                )}
            </Grid>
            <Grid size={12} paddingTop={5}>
                {activeView === 'permissions' && <Permissions />}
                {activeView === 'security' && <SecuritySettings securityConfig={securityConfig} fetchSettings={fetchSettings} />}
                {activeView === 'commercial' && <CommercialSettings expirationDays={expitationDays} priceConfig={priceConfig} fetchSettingsPrice={fetchSettingsPrice} fetchSettings={fetchSettings} />}
                {activeView === 'email' && <EmailSettings emailConfig={emailConfig} fetchSettings={fetchSettings} />}
            </Grid>
        </Grid>
    );
}

export default Config;