import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import styled from "styled-components";
import { theme } from "../theme";
import { FormInput } from "../components/FormInput";
import { Message } from "../components/Message";
import { getList, signup } from "../utils/firebase";

const Container = styled.div`
  margin: 0 auto;
  max-width: 22em;
`;

const useStyles = makeStyles(() => ({
  dialog: {
    width: "100%",
  },
  formControl: {
    marginTop: "1.5em",
    width: "100%",
  },
  buttons: {
    marginTop: "2em",
    color: theme.COLORS.main,
  },
}));

export const CreateUserModal = ({ modal, setModal }) => {
  const styles = useStyles();
  const { user: authUser } = useUser();
  const [message, setMessage] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState({
    name: "",
    role: "manager",
    roomId: authUser.roomId,
    email: "",
    password: "",
  });

  useEffect(() => {
    async function loadRoomOptions() {
      const data = await getList("rooms");
      console.log(data);
      setRooms(data);
    }
    loadRoomOptions();
  }, []);

  const updateUserForm = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const cancelHandler = () => {
    setModal(false);
  };

  const submitHandler = async () => {
    try {
      if (Object.values(user).some((v) => !!v === false)) {
        setMessage("Fill all the fields");
        return;
      }
      await signup("users", user);
      setModal(false);
    } catch (err) {
      setMessage(err.message.split(": ")[1]);
    }
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        transitionDuration={500}
        open={modal}
        onClose={cancelHandler}
        aria-labelledby="create-user-title"
      >
        <Message
          message={message}
          open={!!message}
          onClose={() => setMessage(null)}
        />
        <DialogTitle id="create-user-title">Create User</DialogTitle>
        <DialogContent>
          <Container>
            <FormInput
              name="name"
              type="text"
              value={user.name}
              onChange={updateUserForm}
              id="user_name_input"
              label="Name"
              error={false}
            />
            <FormControl className={styles.formControl}>
              <InputLabel id="user_roomId_input">Room</InputLabel>
              <Select
                labelId="user_roomId_input"
                id="user_roomId_input"
                name="roomId"
                value={user.roomId}
                onChange={updateUserForm}
              >
                {rooms.length ? (
                  rooms.map(({ id }) => (
                    <MenuItem value={id} key={id}>
                      #{id}
                      {+authUser.roomId === +id && " (current)"}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={user.roomId}>
                    #{user.roomId} (current)
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl className={styles.formControl}>
              <InputLabel id="user_role_input">Role</InputLabel>
              <Select
                labelId="user_role_input"
                id="user_role_input"
                name="role"
                value={user.role}
                onChange={updateUserForm}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
              </Select>
            </FormControl>
            <FormInput
              name="email"
              type="email"
              value={user.email}
              onChange={updateUserForm}
              id="user_email_input"
              label="Email"
              error={false}
            />
            <FormInput
              name="password"
              type="password"
              value={user.password}
              onChange={updateUserForm}
              id="user_password_input"
              label="Password"
              error={false}
            />
          </Container>
        </DialogContent>
        <DialogActions className={styles.buttons}>
          <Button onClick={cancelHandler} color="inherit">
            Cancel
          </Button>
          <Button onClick={submitHandler} color="inherit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
