import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const Loader = () => {
  const styles = useStyles();
  return (
    <Backdrop open={true} className={styles.backdrop}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
