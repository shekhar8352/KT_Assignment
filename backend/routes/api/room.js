const express = require("express");
const router = express.Router();
const Room = require("../../models/room.model.js");
const User = require("../../models/user.model.js");
const Device = require("../../models/device.model.js");
// const isAuthenticated = require("../../middlewares/isAuthenticated.js");

// ROUTE_TO_CREATE_ROOM
router.post("/create", async (req, res) => {
  try {
    const { name, user_id, device_id } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json("Invalid user ID");
    }

    const device = await Device.findById(device_id);
    // if (!device) {
    //   return res.status(400).json("Invalid device ID");
    // }

    if (device) {
      if (device.alloted_to_user.toString() !== user_id) {
        return res
          .status(400)
          .json("Device not allocated to the specified user");
      }

      const existingRoom = await Room.findOne({ device_id });
      if (existingRoom) {
        return res.status(400).json("Device already assigned to a room");
      }
    }

    const newRoom = new Room({
      name,
      user_id,
      device_id,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// ROUTE_TO_GET_ROOMS_BY_USER
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userRooms = await Room.find({ user_id: userId });

    res.json(userRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// ROUTE_TO_DELETE_ROOM
router.delete("/delete/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json("Room not found");
    }

    await Room.findByIdAndDelete(roomId);

    res.json("Room deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// ROUTE_TO_UPDATE_ROOM
router.put("/edit/:roomId", async (req, res) => {
  try {
    const { name, device_id } = req.body;
    const roomId = req.params.roomId;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json("Room not found");
    }

    const device = await Device.findById(device_id);

    if (device && device_id.toString() !== room.device_id.toString()) {
      if (!device) {
        return res.status(400).json("Invalid device ID");
      }

      if (device.alloted_to_user.toString() !== room.user_id.toString()) {
        return res
          .status(400)
          .json("Device not allocated to the specified user");
      }

      const existingRoom = await Room.findOne({ device_id });
      if (existingRoom) {
        return res.status(400).json("Device already assigned to a room");
      }
    }

    room.name = name || room.name;
    room.device_id = device_id || room.device_id;

    const updatedRoom = await room.save();

    res.json(updatedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
