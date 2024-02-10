import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import AddIcon from "@mui/icons-material/Add";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const SidebarComp = ({ onMenuItemClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (menuItem) => {
    onMenuItemClick && onMenuItemClick(menuItem);
    // handleToggleSidebar();
  };

  return (
    <div id="app" style={{ height: "100vh", display: "flex" }}>
      <Sidebar style={{ height: "100vh" }} collapsed={collapsed}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              handleToggleSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
          </MenuItem>

          <MenuItem
            icon={<PermDataSettingIcon />}
            onClick={() => handleMenuItemClick("State")}
          >
            Change State
          </MenuItem>
          <MenuItem
            icon={<AddIcon />}
            onClick={() => handleMenuItemClick("createRoom")}
          >
            Create Room
          </MenuItem>
          <MenuItem
            icon={<DevicesIcon />}
            onClick={() => handleMenuItemClick("Devices")}
          >
            Devices
          </MenuItem>
          <MenuItem
            icon={<AssignmentIndIcon />}
            onClick={() => handleMenuItemClick("assignDevices")}
          >
            Assign Device
          </MenuItem>
          {/* <MenuItem
            icon={<PermDataSettingIcon />}
            onClick={() => handleMenuItemClick("deviceStates")}
          >
            Device States
          </MenuItem> */}

          <MenuItem icon={<LogoutIcon />}>Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComp;
