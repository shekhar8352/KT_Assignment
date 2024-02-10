import React, { useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import useAllDevices from '../hooks/device/useAllDevice';
import useUserById from '../hooks/user/useGetUserById';

const DeviceState = () => {
  const { data: devices, loading: devicesLoading } = useAllDevices();

    console.log(devices);
  

  const getUsername = async (userId) => {
    try {
      const user = await useUserById(userId);
      return user?.username || 'Not Found';
    } catch (error) {
      console.error('Error fetching username:', error);
      return 'Not Found';
    }
  };

  return (
    <div>
      <h4>Device States</h4>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device Name</TableCell>
              <TableCell>Allotted To User</TableCell>
              <TableCell>Light</TableCell>
              <TableCell>Fan</TableCell>
              <TableCell>Mis</TableCell>
              {/* Add more columns for other device information */}
            </TableRow>
          </TableHead>
          <TableBody>
            {devicesLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : devices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No devices found</TableCell>
              </TableRow>
            ) : (
              devices.map((device) => (
                <TableRow key={device._id}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>
                    {device.allotted_to_user
                      ? getUsername(device.allotted_to_user)
                      : 'Not Allotted'}
                  </TableCell>
                  <TableCell>{device.state ? device.state.light : 'N/A'}</TableCell>
                  <TableCell>{device.state ? device.state.fan : 'N/A'}</TableCell>
                  <TableCell>{device.state ? device.state.mis : 'N/A'}</TableCell>
                  {/* Add more cells for other device information */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DeviceState;
