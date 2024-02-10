import React, { useEffect, useState } from 'react';
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
import useGetUserByID from '../hooks/user/useGetUserById';

const DeviceState = () => {
  const { data: devices, loading: devicesLoading } = useAllDevices();
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernamesMap = {};
      const promises = devices.map(async (device) => {
        if (device.allotted_to_user) {
          try {
            const user = await useGetUserByID(device.allotted_to_user);
            usernamesMap[device.allotted_to_user] = user?.username || 'Not Found';
          } catch (error) {
            console.error('Error fetching username:', error);
            usernamesMap[device.allotted_to_user] = 'Not Found';
          }
        }
      });

      await Promise.all(promises);
      setUsernames(usernamesMap);
    };

    if (devices && devices.length > 0) {
      fetchUsernames();
    }
  }, [devices]);

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
                      ? usernames[device.allotted_to_user] || 'Not Found'
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
