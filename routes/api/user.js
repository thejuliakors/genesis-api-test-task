const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const userRepository = require("../../repositories/user");

// Registration of new user
router.post("/create", (req, res) => {
  userRepository.findUser(req.body.email, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    if (!emailValidator.validate(req.body.email)) {
      return res.status(400).json({
        error: "Incorrect email",
      });
    }

    if (!user) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = {
            email: req.body.email, 
            password: hash,
          };
          userRepository.createUser(user, (err, users) => {
            if (err)
              return res.status(400);
            res.status(201).json({
              message: "User created",
            });
          });
        }
      });
    } else {
      res.status(409).json({
        message: `User with email ${req.body.email} already exists`,
      });
    }
  });
});

// Login of existed user
router.post("/login", (req, res) => {
  userRepository.findUser(req.body.email, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }

    if (!user) {
      return res.status(401).json({
        error: "Authorization failed",
      });
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({
          error: "Authorization failed",
        });
      }

      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
          }, 
          "secret",
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "Authorization succeessful",
          token: token,
        });
      }
    });
  });
});

module.exports = router;
