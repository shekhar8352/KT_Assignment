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
import useUserDevices from '../hooks/device/useUserDevices';

const Devices = () => {
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

  const { data: devices, loading } = useUserDevices(userId);

  // useEffect(() => {
  //   // Additional logic or side effects can be added here if needed
  // }, [devices]);

  return (
    <div>
      <h4>Your Devices</h4>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2}>Loading...</TableCell>
              </TableRow>
            ) : devices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>No devices found</TableCell>
              </TableRow>
            ) : (
              devices.map((device) => (
                <TableRow key={device._id}>
                  <TableCell>{device.name}</TableCell>
                  {/* <TableCell>{device.state ? device.state : 'N/A'}</TableCell> */}
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

export default Devices;
