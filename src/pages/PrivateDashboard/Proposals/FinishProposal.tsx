import { Button, IconButton, Paper, Slider, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { SnackbarUtilities } from "../../../Utilities/snackbar-manager";
import { useEffect, useState } from "react";
import { finishProposal, getPDF, updateProposal, setFinishDetailsProposal } from "../../../services/proposal.services";
import React from "react";
import { Proposal } from "../../../models/opportunity.models";

interface FinishProposalProps {
    min: number | undefined;
    max: number | undefined;
    proposal: Proposal;
    closeModal: () => void;
    fetchProposal: () => void;
}

const FinishProposal: React.FC<FinishProposalProps> = ({ proposal, closeModal, min, max, fetchProposal }) => {

    const techProposal = proposal.techProposal;
    const goalAndContext = proposal.goalAndContext;
    const [total, setTotal] = useState(proposal.total);
    const [months, setMonths] = useState(proposal.estimatedMonths? proposal.estimatedMonths : 0);
    const extendedMin = min !== undefined ? Number(min) - Number(min) * 0.1 : 0;
    const extendedMax = max !== undefined ? Number(max) + Number(max) * 0.7 : 0;
    const [proposalModified, setProposalModified] = useState(false);
    const [techProposalModified, setTechProposalModified] = useState(techProposal);
    const [goalAndContextModified, setGoalAndContextModified] = useState(goalAndContext);
    console.log('proposal:', proposal);

    useEffect(() => {
        if (techProposal !== techProposalModified || goalAndContext !== goalAndContextModified) {
            setProposalModified(true);
        } else {
            setProposalModified(false);
        }
    }, [techProposal, goalAndContext, techProposalModified, goalAndContextModified]);

    const handleTotalChange = (event: Event, newValue: number | number[]) => {
        setTotal(newValue as number);
    };

    const handleMonthsChange = (event: Event, newValue: number | number[]) => {
        setMonths(newValue as number);
    };

    const handleFinishProposal = async () => {
        try {
            if (proposalModified) {
                console.log('se actualiza techProposal y goalAndContext');
                await updateProposal(proposal.id, techProposalModified, goalAndContextModified);
            }
            console.log('Total:', total, 'Months:', months);
            await setFinishDetailsProposal(proposal.id, total, months);

            SnackbarUtilities.success(`Propuesta actualizada con éxito`);
            if (proposal.status === 'ready_for_validation') {
                await finishProposal(proposal.id);
                SnackbarUtilities.success(`Propuesta finalizada con éxito`);
            }
            getFunctional();
            fetchProposal();
        } catch (error) {
            console.error('Error creating proposal:', error);
        }
    };

    const getFunctional = async () => {
        try {
            const blob = await getPDF(proposal.id);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'document.pdf';
            link.click();
            URL.revokeObjectURL(url);
            SnackbarUtilities.success(`Descargando PDF`);
        } catch (error) {
            console.error('Error getting proposal:', error);
        }
    }

    return (
        <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid size={11}>
                    <Typography variant='h3' color='secondary' >Finalizar Propuesta</Typography>
                </Grid>
                <Grid size={1} >
                    <IconButton onClick={closeModal}>
                        <DisabledByDefaultIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" >
                <Grid size={12}>
                    <TextField
                        label="Propuesta Tecnológica"
                        fullWidth
                        variant="filled"
                        margin="normal"
                        value={techProposalModified}
                        onChange={(e) => setTechProposalModified(e.target.value)}
                    />
                    <TextField
                        label="Contexto y Objetivo del Proyecto"
                        fullWidth
                        variant="filled"
                        margin="normal"
                        multiline
                        rows={4}
                        value={goalAndContextModified}
                        onChange={(e) => setGoalAndContextModified(e.target.value)}
                    />
                    <Typography variant="body1" color="primary" sx={{ marginBottom: 1 }}>
                        Total (€): {total}
                    </Typography>
                    <Slider
                        value={total}
                        onChange={handleTotalChange}
                        step={10}
                        min={extendedMin}
                        max={extendedMax}
                        valueLabelDisplay="auto"
                        color="primary"
                    />
                    <Grid container justifyContent="space-between" sx={{ marginTop: -1, marginBottom: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                            Mínimo estimado <strong>{min}€</strong>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Máximo estimado <strong>{max}€</strong>
                        </Typography>
                    </Grid>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={total}
                        onChange={(e) => setTotal(Number(e.target.value))}
                    />
                </Grid>
                <Grid size={12}>
                    <Typography variant="body1" color="primary">Meses: {months}</Typography>
                    <Slider
                        value={months}
                        onChange={handleMonthsChange}
                        min={1}
                        max={36}
                        step={1}
                        valueLabelDisplay="auto"
                        color="primary"
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        sx={{ marginTop: 0 }}
                    />
                </Grid>
            </Grid>
            <Button
                sx={{ marginTop: 2, paddingY: 1.2 }}
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                onClick={() => handleFinishProposal()}
            >
                <Typography variant="h4" color='white'>
                    {proposal.status === 'done' ? 'Actualizar' : 'Finalizar'}
                </Typography>
            </Button>
        </Paper >
    )
}
export default FinishProposal