import { Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import { newProposal } from "../../../services/opportunity.services";
import Grid from '@mui/material/Grid2';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useState } from "react";
import { SnackbarUtilities } from "../../../Utilities/snackbar-manager";

interface CreateProposalProps {
    closeModal: () => void;
    opportunityId: string;
    fetchOpportunities: () => void;
}

const CreateProposal: React.FC<CreateProposalProps> = ({ closeModal, opportunityId, fetchOpportunities }) => {

    const [techProposal, setTechProposal] = useState('');
    const [goalAndContext, setGoalAndContext] = useState('');

    const handleCreateProposal = async (techProposal: string, goalAndContext: string) => {
        try {
            await newProposal(opportunityId, techProposal, goalAndContext);
            SnackbarUtilities.success(`Propuesta creada con éxito`);
            fetchOpportunities();
            closeModal();
        } catch (error) {
            console.error('Error creating proposal:', error);
        }
    };

    return (
        <Paper elevation={0} style={{ padding: 25, maxWidth: 500, margin: 'auto', borderRadius: 6 }}>
            <Grid container alignItems={'center'} justifyContent='space-between'>
                <Grid size={11}>
                    <Typography variant='h3' color='secondary' >Abrir Propuesta</Typography>
                </Grid>
                <Grid size={1} >
                    <IconButton onClick={closeModal}>
                        <DisabledByDefaultIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <TextField
                label="Propuesta Tecnológica"
                variant="filled"
                fullWidth
                margin="normal"
                value={techProposal}
                onChange={(e) => setTechProposal(e.target.value)}
            />
            <TextField
                label="Contexto y Objetivo del Proyecto"
                variant="filled"
                fullWidth
                margin="normal"
                value={goalAndContext}
                onChange={(e) => setGoalAndContext(e.target.value)}
                multiline   
                rows={10} 
            />
            <Button
                sx={{ marginTop: 2, marginBottom: 1, paddingY: 1.2 }}
                type='submit'
                variant='contained'
                color='secondary'
                fullWidth
                onClick={() => handleCreateProposal(techProposal, goalAndContext)}
                >
                <Typography variant="h4" color='white'>
                    Crear
                </Typography>
            </Button>
        </Paper >
    )
}
export default CreateProposal