import { Box, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  skeleton: {
    height: '150px',
    margin: '1em'
  },
}));

export const SkeletonLoader = () => {
  const styles = useStyles();

  return (
    <Box sx={{ width: '95%', padding: '0 0.5em' }}>
      {[0, 0, 0, 0].map((_, i) => (
        <Skeleton
          key={i}
          animation='wave'
          variant='rect'
          className={styles.skeleton}
        />
      ))}
    </Box>
  );
};
