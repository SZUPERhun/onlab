import express from 'express';
import User from '../models/user';

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

/* GET /api/users/id */
router.get('/:id', async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/* PUT /api/users/id */
router.put('/:id', async function(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, req.body, { new: true });
    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/* DELETE /api/users/id */
router.delete('/:id', async function(req, res, next) {
  try {
    const user = await User.findByIdAndRemove(
      req.params.id, req.body);
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