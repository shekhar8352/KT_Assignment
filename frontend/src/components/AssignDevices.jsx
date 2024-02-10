import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Snackbar,
} from '@mui/material';
import useUserDevices from '../hooks/device/useUserDevices';
import useRoomByUser from '../hooks/room/useRoomByUser';
import useUpdateRoom from '../hooks/room/useUpdateRoom';

const AssignDevices = () => {
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

  const { data: devices, loading: devicesLoading } = useUserDevices(userId);
  const { data: rooms, loading: roomsLoading } = useRoomByUser(userId);
  const { updateRoom, success, errors, loading: allocateDeviceLoading } = useUpdateRoom();
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (success) {
      setSnackbarMessage('Device allocated successfully');
      setSnackbarOpen(true);
    } else if (errors) {
      setSnackbarMessage("Device is already assigned to a room or room already has a device"); 
      setSnackbarOpen(true);
    }
  }, [success, errors]);

  const handleAllocateDevice = () => {
    console.log(selectedDevice, selectedRoom);
    updateRoom(selectedRoom, selectedDevice);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    console.log("room", rooms);
  }, [rooms, devices]);

  return (
    <div>
    <h4>Allocate Device</h4>
    <Box>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select Device</InputLabel>
        <Select
          value={selectedDevice}
          label="Select Device"
          onChange={(e) => setSelectedDevice(e.target.value)}
          disabled={devicesLoading || allocateDeviceLoading}
        >
          {devicesLoading ? (
            <MenuItem disabled>Loading Devices...</MenuItem>
          ) : (
            devices && devices.map((device) => (
              <MenuItem key={device._id} value={device._id}>
                {device.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Select Room</InputLabel>
        <Select
          value={selectedRoom}
          label="Select Room"
          onChange={(e) => setSelectedRoom(e.target.value)}
          disabled={roomsLoading || allocateDeviceLoading}
        >
          {roomsLoading ? (
            <MenuItem disabled>Loading Rooms...</MenuItem>
          ) : (
            rooms && rooms.map((room) => (
              <MenuItem key={room._id} value={room._id}>
                {room.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>

    <Button
      variant="contained"
      color="primary"
      onClick={handleAllocateDevice}
      disabled={!selectedDevice || !selectedRoom || allocateDeviceLoading}
      sx={{ marginTop: 2 }}
    >
      Allocate Device
    </Button>

    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      message={snackbarMessage}
    />
  </div>
  )
}

export default AssignDevices