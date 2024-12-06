import { useSnackbar, VariantType, SnackbarProvider } from 'notistack';

let useSnackbarRef: ReturnType<typeof useSnackbar>;
export const SnackbarUtilitiesConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const SnackbarUtilities = {
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });
  },
  success(msg: string) {
    this.toast(msg, 'success');
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
  info(msg: string) {
    this.toast(msg, 'info');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
};

export { SnackbarProvider };