const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model.js");

router.post(
  '/',
  check('username','Username is required').notEmpty(),
  check('password','Please enter a 6 or more characters').exists(),
  async(req,res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({ errors: errors.array() });
      } 
      const {username,password} = req.body;
      try{
          let user = await User.findOne({username});
          if(!user){
              return res.status(400).json({errors: [{msg:'Invalid Credentials'}]});
          }
          const isMatch  = await bcrypt.compare(password,user.password);
          if(!isMatch){
              return res.status(400).json({errors: [{msg:'Invalid Credentials'}]})
          }
          console.log("user id:",user.id);
          const payload = {
              user:{
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  username: user.username,
                  email: user.email,
                  role: 'user'
              }
          }
          console.log("user log in payload:",payload);

          jwt.sign(
              payload,
              process.env.MY_SECRET_TOKEN,
              {expiresIn: 360000},
              (err,token)=>{
                  if(err) throw err;
                  console.log('token ',token);
                  return res.status(200).json({token});
              }
          );

      }catch(err){
          console.error(err);
          res.status(500).send('Server Error');
      }
  }
)
module.exports = router;