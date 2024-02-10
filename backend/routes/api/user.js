const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model.js");

// access Public
// Route to Create a User
router.post(
  "/register",
  check("first_name", "First name is required").notEmpty(),
  check("last_name", "Last name is required").notEmpty(),
  check("username", "username is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").isLength({ min: 6 }),

  //isExist
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, username, email, password } = req.body;
    console.log("firstname:", first_name);
    console.log("lastname:", last_name);
    console.log("username:", username);
    console.log("email:", email);
    console.log("password:", password);

    try {
      let emailFound = await User.findOne({ email: email });
      if (emailFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists" }] });
      }

      let usernameFound = await User.findOne({ username: username });
      console.log("username:", usernameFound);
      if (usernameFound) {
        res.status(400).json({ errors: [{ msg: "USername already exists" }] });
      }

      const user = new User({
        first_name,
        last_name,
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          role: 'user'
        },
      };
      console.log("new user payload:", payload);

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

// ROUTE TO GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// ROUTE_TO_GET_USERS_BY_ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server error");
  }
});

module.exports = router;
