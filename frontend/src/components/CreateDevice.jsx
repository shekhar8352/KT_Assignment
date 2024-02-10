import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useCreateDevice from '../hooks/device/useCreateDevice';
import useGetAllUsers from '../hooks/user/useGetAllUsers';

const CreateDevice = () => {
  const [deviceName, setDeviceName] = useState('');
  const [allotedUser, setAllotedUser] = useState('');
  const [allotedUserId, setAllotedUserId] = useState(null);

  const { createDevice, success, errors, loading } = useCreateDevice();
  const { users, loading: usersLoading } = useGetAllUsers();

  useEffect(() => {
    // Load users only if not already loaded
    if (!users.length && !usersLoading) {
      useGetAllUsers();
    }
  }, [useGetAllUsers, users, usersLoading]);

  const handleAllotedUserChange = (event) => {
    const selectedUser = event.target.value;
    setAllotedUser(selectedUser);
    
    // Find the corresponding user_id
    const selectedUserObj = users.find((user) => user.username === selectedUser);
    // console.log(selectedUserObj);
    if (selectedUserObj) {
      setAllotedUserId(selectedUserObj._id);
    } else {
      setAllotedUserId(null);
    }
  };

  const handleCreateDevice = (e) => {
    e.preventDefault();
    if (allotedUserId || allotedUserId === '') {
      // console.log(allotedUserId);
      createDevice(deviceName, allotedUserId);
    } else {
      // console.log("NO");
      createDevice(deviceName);
    }
  };

  return (
    <div>
      <h4>Create Device</h4>
      <form onSubmit={handleCreateDevice}>
        <TextField
          label="Device Name"
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Select
          label="Alloted User"
          value={allotedUser}
          onChange={handleAllotedUserChange}
          fullWidth
          margin="normal"
        >
          {users.map((user) => (
            <MenuItem key={user.user_id} value={user.username}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" disabled={loading} sx={{ marginTop: 2 }}>
          {loading ? 'Creating Device...' : 'Create Device'}
        </Button>
      </form>
      {errors && <div style={{ color: 'red', marginTop: 2 }}>{errors[0].msg}</div>}
      {success && (
        <div style={{ color: 'green', marginTop: 2 }}>Device created successfully!</div>
      )}
    </div>
  );
};

export default CreateDevice;
