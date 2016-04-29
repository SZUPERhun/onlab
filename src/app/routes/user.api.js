import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import conf from '../config';

const router = express.Router();

/* GET /api/users listing. */
router.get('/', async function(req, res, next) {
  try {
    const user = await User.find();
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/* POST /api/users */
router.post('/', async function(req, res, next) {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/* GET /api/users/id/:id */
router.get('/id/:id', async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/* PUT /api/users/id/:id */
router.put('/id/:id', async function(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, req.body, { new: true });
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/* DELETE /api/users/id/:id */
router.delete('/id/:id', async function(req, res, next) {
  try {
    const user = await User.findByIdAndRemove(
      req.params.id, req.body);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/* POST /api/users/register */
router.post('/register', async function(req, res, next) {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/* POST /api/users/authenticate */
router.post('/authenticate', async function(req, res, next) {
  try {
    let token;
    const user = await User.findOne({ name: req.body.name });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      token = jwt.sign({sub: user._id}, conf.secret)
    }
    return res.json({ token: token });
  } catch (e) {
    return next(e);
  }
});

/* GET /api/users/current */
router.get('/current', async function(req, res, next) {
  try {
    const user = await User.findById(jwt.decode(req.session.token, conf.secret).sub);
      return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/* DELETE /api/users all */
/*
 router.delete('/', async function(req, res, next) {
 try {
 const user = await User.remove();
 return res.json(user);
 } catch (e) {
 return next(e);
 }
 });
 */

module.exports = router;