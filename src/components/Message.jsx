import { Snackbar } from '@material-ui/core';

export const Message = ({ open, message, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      message={message}
      autoHideDuration={2000}
      onClose={onClose}
    />
  );
};
