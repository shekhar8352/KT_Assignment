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
import useAllDevices from '../hooks/device/useAllDevice';
import useGetAllUsers from '../hooks/user/useGetAllUsers';
import useEditDevice from '../hooks/device/useEditDevice';

const AllocateDevice = () => {
  const { data: devices, loading: devicesLoading } = useAllDevices();
  const { users, loading: usersLoading } = useGetAllUsers();
  const { allocateDevice, success, errors, loading: allocateDeviceLoading } = useEditDevice();
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (success) {
      setSnackbarMessage('Device allocated successfully');
      setSnackbarOpen(true);
    } else if (errors) {
      setSnackbarMessage("Device is already assigned to a user"); 
      setSnackbarOpen(true);
    }
  }, [success, errors]);

  const handleAllocateDevice = () => {
    console.log(selectedDevice, selectedUser);
    allocateDevice(selectedDevice, selectedUser);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
              devices.map((device) => (
                <MenuItem key={device._id} value={device._id}>
                  {device.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Select User</InputLabel>
          <Select
            value={selectedUser}
            label="Select User"
            onChange={(e) => setSelectedUser(e.target.value)}
            disabled={usersLoading || allocateDeviceLoading}
          >
            {usersLoading ? (
              <MenuItem disabled>Loading Users...</MenuItem>
            ) : (
              users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.username}
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
        disabled={!selectedDevice || !selectedUser || allocateDeviceLoading}
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
  );
};

export default AllocateDevice;
