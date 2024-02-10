import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useCreateRoom from "../hooks/room/useCreateRoom";
import useUserDevices from "../hooks/device/useUserDevices";

const CreateRoom = () => {
  // const [roomName, setRoomName] = useState("");
  const [allotedDevice, setAllotedDevice] = useState('');
  const [allotedDeviceId, setAllotedDeviceId] = useState(null);

  // const { createRoom, success, errors, loading } = useCreateRoom();

  const getUserIDFromToken = () => {
    const token = localStorage.getItem("Token");

    if (token) {
      try {
        const tokenParts = token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));

        const userId = payload.user.id;
        console.log(userId);
        return userId;
      } catch (error) {
        console.error("Error parsing token payload:", error);
      }
    }

    return null;
  };

  const userId = getUserIDFromToken();
  const { devices, loading: usersLoading } = useUserDevices(userId);

  useEffect(() => {
    // Load users only if not already loaded
    if (!devices.length && !usersLoading) {
      useUserDevices()
    }
  }, [useUserDevices, devices, usersLoading]);

  const handleAllotedUserChange = (event) => {
    const selectedDevice = event.target.value;
    setAllotedDevice(selectedDevice);
    
    const selectedDeviceObj = devices.find((device) => device.name === selectedDevice);
    if (selectedDeviceObj) {
      // setAllotedUserId(selectedDeviceObj._id);
      setAllotedDeviceId(selectedDeviceObj?._id || null);
    } else {
      setAllotedDeviceId(null);
    }
  };

  // const handleCreateRoom = (e) => {
  //   e.preventDefault();
  //   if (allotedDeviceId || allotedDeviceId === '') {
  //     // console.log(allotedUserId);
  //     createRoom(deviceName, userId, allotedDeviceId);
  //   } else {
  //     // console.log("NO");
  //     createRoom(deviceName, userId);
  //   }
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create Room
      </Typography>
      {/* <TextField
        label="Room Name"
        variant="outlined"
        margin="normal"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      /> */}
      <Select
        label="Alloted Device"
        value={allotedDevice}
        onChange={handleAllotedUserChange}
        fullWidth
        margin="normal"
      >
        {devices.map((device) => (
          <MenuItem key={device._id} value={device._id}>
            {device._id}
          </MenuItem>
        ))}
      </Select>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleCreateRoom}
        disabled={loading || !roomName.trim()}
      >
        {loading ? "Creating Room..." : "Create Room"}
      </Button> */}
      {/* {errors && <Typography color="error">{errors[0].msg}</Typography>}
      {success && (
        <Typography color="success">Room created successfully!</Typography>
      )} */}
    </Box>
  );
};

export default CreateRoom;

