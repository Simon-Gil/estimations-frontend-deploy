import React, { useEffect, useState } from 'react';
import { IconButton, Typography, Paper, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Tooltip, Box, Modal } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { associateDocument, checkExistingDocument, downloadDocument, getDeleteLink, getDocuments, notifyBack, notyfyDeleteDocument } from '../../../services/document.services';
import Grid from '@mui/material/Grid2';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import DownloadIcon from '@mui/icons-material/Download';
import { SnackbarUtilities } from '../../../Utilities/snackbar-manager';
import axios from 'axios';
import { Document } from '../../../models/document.model';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../../Redux/store';
import { changeDelete } from '../../../Redux/states/delete';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../../Themes/theme';
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmDelete from '../../../Utilities/ConfirmDelete';

interface UploadDocumentProps {
  opportunityId: string;
  closeModal: () => void;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ opportunityId, closeModal }) => {

  const [documents, setDocuments] = useState<Document[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const deleteState = useSelector((store: AppStore) => store.delete);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [documentToDelete, setDocumentToDelete] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteState.delete) {
      dispatch(changeDelete(false));
    }
    fetchDocuments();
  }, []);

  const changeDeleteMode = () => {
    dispatch(changeDelete(!deleteState.delete));
  }

  const fetchDocuments = async () => {
    try {
      const documentsData = await getDocuments(opportunityId);
      setDocuments(documentsData);
      console.log('Documentos:', documentsData);
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
  };

  const handleDownloadDocument = async (fileName: string) => {
    try {
      const url = await downloadDocument(opportunityId, fileName);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error al descargar el documento:', error);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const link = await associateDocument(opportunityId, file.name, file.type);
      await axios.put(link, file, {
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        },
        params: {
          skipInterceptor: true,
        },
      });
      await notifyBack(opportunityId, file.name, file.type);
      fetchDocuments();
      SnackbarUtilities.success(`Documento ${file.name} subido correctamente`);
    } catch (error) {
      console.error('Error al asociar el documento:', error);
    }
  };

  const handleOpenDelete = async (fileName: string) => {
    setDocumentToDelete(fileName);
    setOpenConfirmDelete(true);
  }

  const handleDelete = async () => {
    try {
      //solicitar al back enlace para eliminar el documento
      const link = await getDeleteLink(opportunityId, documentToDelete);
      //Eliminar el documento en aws
      await axios.delete(link,{
        params: {
          skipInterceptor: true,
        },
      });
      //Informarle al back que se eliminó el documento
      await notyfyDeleteDocument(opportunityId, documentToDelete);
      SnackbarUtilities.success(`Documento eliminado correctamente`);
      fetchDocuments();
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    } finally {
      setOpenConfirmDelete(false);
    }
  }

  const confirmDelete = async (confirmed: boolean) => {
    if (confirmed) {
      handleDelete();
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const response = await checkExistingDocument(opportunityId, file.name, file.type);
      console.log('el servicio dice: ', response.existingFile);
      if (response.existingFile === true) {
        setFileToUpload(file); // Guardamos el archivo temporalmente
        setOpenDialog(true);   // Abrimos el diálogo de confirmación
      } else {
        await handleFileUpload(file);
      }
    },
  });

  const handleOverwrite = async () => {
    if (fileToUpload) {
      await handleFileUpload(fileToUpload);
      setFileToUpload(null); // Limpiamos el archivo temporal
    }
    setOpenDialog(false); // Cerramos el diálogo
  };

  const handleCancel = () => {
    setFileToUpload(null);
    setOpenDialog(false);
  };

  return (
    <>
      <Paper elevation={0} style={{ padding: 25, maxWidth: 700, margin: 'auto', borderRadius: 6 }}>
        <Grid container alignItems={'center'} justifyContent='space-between'>
          <Grid size={11}>
            <Typography variant='h6'>Adjuntar Documentos</Typography>
          </Grid>
          <Grid size={1}>
            <IconButton onClick={closeModal}>
              <DisabledByDefaultIcon color='disabled' />
            </IconButton>
          </Grid>
        </Grid>

        <Grid {...getRootProps()}
          sx={{
            marginTop: 2, marginBottom: 1,
            border: '2px dashed', // Borde punteado de 2px
            borderColor: (theme) => theme.palette.primary.main, // Borde color primary
            borderRadius: 2, // Borde redondeado
            padding: '5px',
            textAlign: 'center',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60px',
          }}>
          <input {...getInputProps()} />
          <Grid size={2} marginRight={2}>
            <DriveFolderUploadIcon color='primary' />
          </Grid>
          <Grid size={10}>
            <Typography variant='body2'>Suelta Aquí tu documento o haz Click para buscarlo</Typography>
          </Grid>
        </Grid>

        <Grid sx={{ marginTop: 2 }} container size={12}>
          <Grid size={11}>
            <Typography variant='h6' color='textSecondary' sx={{ marginBottom: 1 }}>Documentos Adjuntos:</Typography>
            {documents.length > 0 ? (
              documents.map((document, index) => (
                <Chip key={index}
                  label={document.fileName}
                  sx={{
                    margin: 0.5,
                    marginBottom: 1,
                    backgroundColor: deleteState.delete ? (theme) => theme.palette.error.main : (theme) => theme.palette.secondary.main,
                    cursor: 'pointer',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: deleteState.delete ? 'red' : (theme) => theme.palette.primary.main, // No cambia el fondo al hacer hover
                      opacity: 1, // Si quieres asegurarte de que no cambie la opacidad también
                    }
                  }}
                  onClick={() => {
                    if (deleteState.delete) {
                      handleOpenDelete(document.fileName);
                      fetchDocuments();
                    } else {
                      handleDownloadDocument(document.fileName);
                    }
                  }}
                  icon={
                    deleteState.delete ? (
                      <CancelIcon sx={{ fontSize: 18, color: '#ffffff !important' }} /> // Muestra el icono CancelIcon si deleteState.delete es true
                    ) : (
                      <DownloadIcon sx={{ fontSize: 18, color: '#ffffff !important' }} /> // Muestra el icono DownloadIcon en caso contrario
                    )
                  }
                />
              ))
            ) : (
              <Typography variant='body2' color='textSecondary'>No hay documentos</Typography>
            )}
          </Grid>
          <Grid size={1} paddingTop={1} display='flex' justifyContent='flex-end' sx={{ cursor: 'pointer' }}>
            <Tooltip title='Seleccionar elementos a eliminar' arrow>
              <Box onClick={() => changeDeleteMode()}
                sx={{ backgroundColor: theme.palette.error.main, height: 32, width: 32, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DeleteIcon fontSize='medium' sx={{ color: 'white' }} />
              </Box>
            </Tooltip>
          </Grid>
        </Grid >

        <Dialog
          open={openDialog}
          onClose={handleCancel}
          PaperProps={{
            elevation: 0,
            sx: {
              padding: 2,
              borderRadius: 2,
              maxWidth: 500,
              backgroundColor: 'background.main', // Accede directamente al color desde el tema
              border: '2px solid',
              borderColor: 'primary.main', // Usa el color principal del tema
            },
          }}
        >
          <DialogTitle>
            <Typography variant='h6' color='primary'>
              Archivo existente
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ya existe un archivo con el nombre
              <Chip key={fileToUpload?.name} label={fileToUpload?.name}
                sx={{ margin: 0.5, marginBottom: 1, backgroundColor: 'transparent', color: 'black', border: 2, borderColor: (theme) => theme.palette.primary.main, }}
              />
              ¿Deseas sobrescribirlo?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
            <Button
              onClick={handleCancel}
              color='secondary'
              variant='outlined'
              sx={{
                borderColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.light,
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleOverwrite}
              color='primary'
              variant='contained'
              sx={{
                marginLeft: 2,
                backgroundColor: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              Sobrescribir
            </Button>
          </DialogActions>
        </Dialog>
      </Paper >
      <Modal
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          p: 1,
          borderRadius: 2,
          padding: 0,
        }}>
          <ConfirmDelete subjectName={'documento'} confirm={confirmDelete} closeModal={() => setOpenConfirmDelete(false)} />
        </Box>
      </Modal>
    </>
  );
};

export default UploadDocument;
