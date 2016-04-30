import express from 'express';
import request from 'request';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import conf from '../config';

const router = express.Router();

router.get('/', function (req, res) {
  // log user out
  delete req.session.token;

  // move success message into local variable so it only appears once (single read)
  const viewData = { success: req.session.success };
  delete req.session.success;

  res.render('login', viewData);
});

router.post('/', async function (req, res, next) {
  let token;
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      token = jwt.sign(user, conf.secret, {
        expiresInMinutes: 1440 // expires in 24 hours
      });
    }
    
    res.redirect('/');
    return res.json({ token: token });
  } catch (e) {
    res.render('login',
      {e: 'An error occurred'});
    if (!token) {
      res.render('login',
        {e: 'Username or password is incorrect', username: req.body.name});
    }
    return next(e);
  }
});

module.exports = router; 