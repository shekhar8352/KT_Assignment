const express = require("express");
const router = express.Router();
const Device = require("../../models/device.model.js");
const User = require("../../models/user.model.js");
// const isAdmin = require("../../middlewares/isAdmin");

// Middleware to check if the user is an admin
// router.use(isAdmin);

// ROUTE_TO_CREATE_DEVICE
router.post("/create", async (req, res) => {
  try {
    const { name, alloted_to_user, state } = req.body;
    const newDevice = new Device({
      name,
      alloted_to_user,
      state,
    });

    const savedDevice = await newDevice.save();

    res.status(201).json(savedDevice);
    console.log(savedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// ROUTE_TO_ALLOCATE_DEVICE
router.put("/allocate/:deviceId", async (req, res) => {
  try {
    const { userId } = req.body;
    const deviceId = req.params.deviceId;

    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json("Device not found");
    }

    if (device.alloted_to_user) {
      return res.status(400).json("Device already assigned to a user");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json("Invalid user ID");
    }
    
    device.alloted_to_user = userId;

    const updatedDevice = await device.save();

    res.json(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});


// ROUTE_TO_CHANGE_LIGHT_STATE
router.put("/change-light/:deviceId", async (req, res) => {
  try {
    const { light } = req.body;
    const deviceId = req.params.deviceId;

    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json({ msg: "Device not found" });
    }

    if (light !== undefined) {
      device.state.light = light;
    }

    const updatedDevice = await device.save();

    res.json(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// ROUTE_TO_CHANGE_FAN_STATE
router.put("/change-fan/:deviceId", async (req, res) => {
  try {
    const { fan } = req.body;
    const deviceId = req.params.deviceId;

    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json({ msg: "Device not found" });
    }

    if (fan !== undefined) {
      device.state.fan = fan;
    }

    const updatedDevice = await device.save();

    res.json(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// ROUTE_TO_CHANGE_MIS_STATE
router.put("/change-mis/:deviceId", async (req, res) => {
  try {
    const { mis } = req.body;
    const deviceId = req.params.deviceId;

    const device = await Device.findById(deviceId);
    if (!device) {
      return res.status(404).json({ msg: "Device not found" });
    }

    if (mis !== undefined) {
      device.state.mis = mis;
    }

    const updatedDevice = await device.save();

    res.json(updatedDevice);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// ROUTE_TO_FETCH_ALL_DEVICES
router.get("/all", async (req, res) => {
  try {
    const allDevices = await Device.find();

    res.json(allDevices);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// ROUTE_TO_FETCH_DEVICES_BY_ID
router.get("/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;

    const device = await Device.findById(deviceId);

    if (!device) {
      return res.status(404).json({ msg: "Device not found" });
    }

    res.json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// ROUTE_TO_FETCH_ALL_THE_DEVICE_ALLOCATED_TO_SEPCIFIC_USER
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userDevices = await Device.find({ alloted_to_user: userId });

    res.json(userDevices);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});




module.exports = router;
