import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Grid2 } from "@mui/material";
import { TextField, Card, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRoomAction } from "../../store/actions/rooms";
import { useNavigate } from "react-router-dom";

const AddRooms = () => {
  const navigate = useNavigate();
  const allowAdd = useSelector(
    (state) =>
      state.users.isAdmin1 ||
      state.users.isAdmin2 ||
      state.users.isAdmin3 ||
      state.users.isSuperAdmin
  );
  const [state, setState] = React.useState("");
  const [state1, setState1] = React.useState(0);
  const [err, setErr] = React.useState(false);
  const [error, setError] = React.useState({
    roomNo: "",
    capacity: "",
  });
  const [success, setSuccess] = React.useState("");
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.rooms.addErrors);
  const added = useSelector((state) => state.rooms.added);

  useEffect(() => {
    if (!allowAdd) {
      navigate("/notAuthorized");
    }
  }, [allowAdd]);

  const textout = (e) => {
    let res = e.target.value.replace(/[^0-9]/gi, "");
    setState(res);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErr(true);
      setError({ ...errors.errors });
      setSuccess("");
    } else {
      setError({
        roomNo: "",
        capacity: "",
      });
    }

    if (added) {
      setSuccess("Room added successfully!");
      setError({
        roomNo: "",
        capacity: "",
      });
    } else {
      setSuccess("");
    }
  }, [errors, added]);

  const handleCapChange = (e) => {
    let res = e.target.value.replace(/[^0-9]/gi, "");
    while (res[0] === "0") res = res.substring(1);
    setState1(res);
  };

  const handleClickOpen = () => {
    let isValid = true;
    if (state === "") {
      isValid = false;
      setErr(true);
      setError((prevState) => ({
        ...prevState,
        roomNo: "Empty field",
      }));
    }

    if (state1 <= 0) {
      isValid = false;
      setErr(true);
      setError((prevState) => ({
        ...prevState,
        capacity: "Should be numeric positive value",
      }));
    }

    if (isValid) {
      dispatch(
        addRoomAction({
          data: {
            roomNo: "LT-" + state,
            capacity: state1,
          },
          navigate,
        })
      );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginBottom="100px"
      flex="1"
    >
      <Typography style={{ marginBottom: "20px", color: "green" }}>
        {success}
      </Typography>
      <Card
        variant="outlined"
        sx={{
          boxShadow: 10,
          borderRadius: 3,
          padding: 6,
        }}
      >
        <form>
          <Grid2 container direction="column" spacing={2}>
            <Grid2 item>
              <TextField
                label="Room Number"
                value={state}
                onChange={textout}
                error={err && Boolean(error.roomNo)}
                helperText={error.roomNo}
                required
              />
            </Grid2>
            <Grid2 item>
              <TextField
                label="Capacity"
                value={state1}
                onChange={handleCapChange}
                error={err && Boolean(error.capacity)}
                helperText={error.capacity}
                required
              />
            </Grid2>
            <Grid2 item>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ width: "100px", marginTop: "20px" }}
                  onClick={handleClickOpen}
                >
                  Add
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </form>
      </Card>
    </Box>
  );
};

export default AddRooms;
