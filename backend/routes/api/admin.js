const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin.models.js");

// access Public
// Route to Create an admin
router.post(
  "/",
  check("username", "username is required").notEmpty(),
  check("password", "Password is required").isLength({ min: 6 }),

  //isExist
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    console.log("username:", username);
    console.log("password:", password);

    try {
      let usernameFound = await Admin.findOne({ username: username });
      console.log("username:", usernameFound);
      if (usernameFound) {
        res.status(400).json({ errors: [{ msg: "USername already exists" }] });
      }

      const admin = new Admin({
        username,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const payload = {
        user: {
          id: admin.id,
          username: admin.username,
        },
      };
      console.log("new admin payload:", payload);

      jwt.sign(
        payload,
        process.env.MY_SECRET_TOKEN,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          console.log(token);
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;