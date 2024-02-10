import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import useGetAllUsers from "../hooks/user/useGetAllUsers";
import useUserDevices from "../hooks/device/useUserDevices";
import { styled } from "@mui/system";

const StyledTableContainer = styled(TableContainer)({
  width: "100%",
  marginTop: "20px",
});

const UserDetails = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { users, loading: usersLoading } = useGetAllUsers();

  useEffect(() => {
    // Load all users only if not already loaded
    if (!allUsers.length && !usersLoading) {
      setAllUsers(users);
    }
  }, [users, usersLoading, allUsers]);

  return (
    <div>
      <h4>User Details</h4>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name:</TableCell>
              <TableCell>Last name:</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Devices Allotted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <DevicesList userId={user._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
};

const DevicesList = ({ userId }) => {
  const { data: devices, loading } = useUserDevices(userId);

  return (
    <div>
      {loading ? "Loading devices..." : null}
      {devices && devices.length === 0 && !loading
        ? "No devices allotted"
        : null}
      {devices && devices.length > 0 ? (
        <p>{devices.map((device) => device.name).join(", ")}</p>
      ) : null}
    </div>
  );
};

export default UserDetails;
