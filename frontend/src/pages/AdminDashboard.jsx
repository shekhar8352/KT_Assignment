import React, { useState } from "react";
import SidebarComp from "../components/SidebarComp";
import CreateUser from "../components/CreateUser";
import CreateDevice from "../components/CreateDevice";
import UserDetails from "../components/UserDetails";
import AllocateDevice from "../components/AllocateDevice";
import DeviceStates from "../components/DeviceStates";

const AdminDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("createUser");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <SidebarComp onMenuItemClick={handleMenuItemClick} />
      <div style={{ marginLeft: "50px", padding: "20px", width: "100%" }}>
        <div>
          <h2>Admin Dashboard</h2>
        </div>
        <div style={{ padding: "20px", width: "100%" }}>
          {activeMenuItem === "createUser" && <CreateUser />}
          {activeMenuItem === "createDevice" && <CreateDevice />}
          {activeMenuItem === "users" && <UserDetails />}
          {activeMenuItem === "allocateDevice" && <AllocateDevice />}
          {activeMenuItem === "deviceStates" && <DeviceStates />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
