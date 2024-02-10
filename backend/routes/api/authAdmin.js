const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin.models.js");

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
          let admin = await Admin.findOne({username});
          if(!admin){
              return res.status(400).json({errors: ['Invalid Credentials']});
          }
          const isMatch  = await bcrypt.compare(password, admin.password);
          if(!isMatch){
              return res.status(400).json({errors: ['Invalid Credentials']})
          }
          console.log("admin id:", admin.id);
          const payload = {
              admin:{
                  id: admin.id,
                  username: admin.username,
                  role: admin.role
              }
          }
          console.log("admin log in payload:",payload);

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