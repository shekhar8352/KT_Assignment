import React, { useState } from "react";
import UserSidebar from "../components/UserSidebar"
import CreateRoom from "../components/CreateRoom";
import Devices from "../components/Devices";
import AssignDevices from "../components/AssignDevices";
import ChangeState from "../components/ChangeState";

const UserDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("State");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <UserSidebar onMenuItemClick={handleMenuItemClick} />
      <div style={{ marginLeft: "50px", padding: "20px", width: "100%" }}>
        <div>
          <h2>Dashboard</h2>
        </div>
        <div style={{ padding: "20px", width: "100%" }}>
          {activeMenuItem === "createRoom" && <CreateRoom />}
          {activeMenuItem === "Devices" && <Devices />}
          {activeMenuItem === "assignDevices" && <AssignDevices />}
          {activeMenuItem === "State" && <ChangeState />}
          {/* {activeMenuItem === "deviceStates" && <DeviceStates />} */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard