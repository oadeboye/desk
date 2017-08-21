const express = require('express');

const router = express.Router();
const User = require('../models/models').User;
const hashPassword = require('../helper/hash');

const auth = (passport) => {
  // POST Registration
  // Req.body receives: username, fName, lName, password, email
  router.post('/register', (req, res) => {
    const password = hashPassword(req.body.password);

    // Express validation here
    req.check('password', 'Password must be at least 6 characters long').isLength({min: 6});
    req.check('fName', 'First Name field must not be empty').notEmpty();
    req.check('lName', 'Last Name field must not be empty').notEmpty();
    req.check('username', 'Username must not be empty').notEmpty();
    req.check('email', 'Must enter a valid email').notEmpty();
    const errors = req.validationErrors();

    if (errors) {
      console.log(errors);
      res.json({success: false, failure: errors});
    } else {
      User.find({ username: req.body.username })
      .then((user) => {
        if (user.length) {
          console.log("FOUND USERNAME", user[0].username);
          res.json({success: false, failure: [{msg: "Username already exists", param: "username"}]});
        } else {
          const newUser = new User({
            username: req.body.username,
            password,
            email: req.body.email,
            fName: req.body.fName,
            lName: req.body.lName,
          });
          return newUser.save();
        }
      })
      .then(() => {
        console.log("SUCCESSFUL REGISTRATION!");
        res.json({success: true});
      })
      .catch((err) => {
        console.log("UNSUCCESSFUL REGISTRATION", err);
        res.json({ success: false, failure: err.message });
      });
    }
  });

  // POST Login
  // Req.body receives: username, password
  router.post('/login', passport.authenticate('local'), (req, res) => {
    User.findById(req.session.passport.user)
    .then((user) => {
      console.log("LOGGED IN!", user);
      res.json({
        success: true,
        user
      });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
  });

  // GET Logout
  // Ends the session and redirects to login
  router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true, message: 'User successfully logged out' });
  });

  return router;
};

module.exports = auth;
