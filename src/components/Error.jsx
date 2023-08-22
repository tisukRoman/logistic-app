import { Alert } from '@material-ui/lab';

export const Error = ({ error }) => {
  return <Alert severity='error'>{error}</Alert>;
};
