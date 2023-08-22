import MainDrawer from '@material-ui/core/Drawer';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { logout } from '../utils/firebase';
import { theme } from '../theme';

const useStyles = makeStyles(() => ({
  list: {
    marginTop: '0.5em',
    backgroundColor: theme.COLORS.white,
    width: '18em',
    position: 'relative',
  },
  activeLink: {
    color: theme.COLORS.main,
  },
  link: {
    color: theme.COLORS.black,
  },
}));

export const Drawer = ({ drawer, toggleDrawer }) => {
  const styles = useStyles();
  const history = useHistory();

  const logoutHandler = async () => {
    logout().then(() => {
      history.push('/login');
    });
  };

  return (
    <MainDrawer anchor='left' open={drawer} transitionDuration={600}>
      <List
        className={styles.list}
        component='nav'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Logistics
          </ListSubheader>
        }
      >
        <ListItem button onClick={() => history.push('/drivers')}>
          <ListItemIcon>
            <ChevronRightIcon />
          </ListItemIcon>
          <ListItemText primary='drivers' />
        </ListItem>
        <ListItem button onClick={() => history.push('/map')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Map' />
        </ListItem>
        <ListItem button onClick={() => history.push('/users')}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary='Users' />
        </ListItem>
        <ListItem button onClick={logoutHandler}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </MainDrawer>
  );
};
