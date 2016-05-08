import express from 'express';

import Club from '../models/club';

const router = express.Router();

/* GET /api/clubs listing. */
router.get('/', async function(req, res, next) {
  try {
    const club = await Club.find()
      .populate('_creator', 'name').populate('_events');
    return res.json(club);
  } catch (e) {
    return next(e);
  }
});

/* POST /api/clubs */
router.post('/', async function(req, res, next) {
  try {
    const club = await Club.create(req.body);
    return res.json(club);
  } catch (e) {
    return next(e);
  }
});

/* GET /api/clubs/id/:id */
router.get('/id/:id', async function(req, res, next) {
  try {
    const club = await Club.findById(req.params.id)
      .populate('_creator', 'name').populate('_events');
    return res.json(club);
  } catch (e) {
    return next(e);
  }
});

/* PUT /api/clubs/id/:id */
router.put('/id/:id', async function(req, res, next) {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.id, req.body, { new: true });
    return res.json(club);
  } catch (e) {
    return next(e);
  }
});

/* DELETE /api/clubs/id/:id */
router.delete('/id/:id', async function(req, res, next) {
  try {
    const club = await Club.findByIdAndRemove(
      req.params.id, req.body);
    return res.json(club);
  } catch (e) {
    return next(e);
  }
});

/* DELETE /api/clubs all */

router.delete('/', async function(req, res, next) {
  try {
    const club = await Club.remove();
    return res.json(club);
  } catch (e) {
    return next(e);
  }
});


module.exports = router;