const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
      port: 587,
      secure: false,
    auth: {
      user: "omoruyiohuobahmadns@gmail.com",
      pass: "srrlxixkgenllvqg"
    }
  });


  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take your messages!");
    }
  });



  router.route("/drugnotification").post((req,res) => {
    var firstName = req.body.firstName;
    var email =req.body.email;
    
    
    var content = `DRUG NOTIFICATION FROM OMORUYI OHUOBA HOSPITAL MANAGEMENT AND DRUG NOTIFICATION SYSTEM \n\nGood day ${firstName}! \n\nThis is a notification to take your prescribed medication\n \nKindly log in to our platform to see your dosages.\n \nYou can login here: https://omoruyi-ohuoba-hmadns-production.up.railway.app/ \n\nHave a nice day!`;
    
    var mail = {
      from: "omoruyiohuobahmadns@gmail.com", 
      to: `omoruyiohuobahmadns@gmail.com, ${email}`, 
      subject: "DRUG NOTIFICATION",
      text: content,
    }
    
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
    
    
    });


module.exports = router;

