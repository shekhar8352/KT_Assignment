import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Switch,
} from '@mui/material';
import useUserDevices from '../hooks/device/useUserDevices';
import useLightState from '../hooks/device/useLightState';
import useFanState from '../hooks/device/useFanState';
import useMisState from '../hooks/device/useMisState';

const ChangeState = () => {
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
  const { changeLightState } = useLightState();
  const { changeFanState } = useFanState();
  const { changeMISState } = useMisState();

  const handleLightChange = (deviceId, light) => {
    changeLightState(deviceId, !light)
    .then(() => refetch());
  };

  const handleFanChange = (deviceId, fan) => {
    changeFanState(deviceId, !fan)
    .then(() => refetch());
  };

  const handleMisChange = (deviceId, mis) => {
    changeMISState(deviceId, !mis)
    .then(() => refetch());
  };

  return (
    <div>
      <h4>Your Devices</h4>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device Name</TableCell>
              <TableCell>Light</TableCell>
              <TableCell>Fan</TableCell>
              <TableCell>Misc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : devices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No devices found</TableCell>
              </TableRow>
            ) : (
              devices.map((device) => (
                <TableRow key={device._id}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>
                    <Switch
                      checked={device.state ? device.state.light : false}
                      onChange={() => handleLightChange(device._id, device.state ? device.state.light : false)}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={device.state ? device.state.fan : false}
                      onChange={() => handleFanChange(device._id, device.state ? device.state.fan : false)}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={device.state ? device.state.mis : false}
                      onChange={() => handleMisChange(device._id, device.state ? device.state.mis : false)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ChangeState;
