import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const ErrorMessage = ({ message, onClose }) => {
  return (
    <Snackbar
      open={!!message}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
    >
      <Alert severity='error' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
