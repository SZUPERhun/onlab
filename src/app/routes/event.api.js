import express from 'express';

import Event from '../models/event';

const router = express.Router();

/* GET /api/events listing. */
router.get('/', async function(req, res, next) {
  try {
    const event = await Event.find();
    return res.json(event);
  } catch (e) {
    return next(e);
  }
});

/* POST /api/events */
router.post('/', async function(req, res, next) {
  try {
    const event = await Event.create(req.body);
    return res.json(event);
  } catch (e) {
    return next(e);
  }
});

/* GET /api/events/id/:id */
router.get('/id/:id', async function(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);
    return res.json(event);
  } catch (e) {
    return next(e);
  }
});

/* PUT /api/events/id/:id */
router.put('/id/:id', async function(req, res, next) {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id, req.body, { new: true });
    return res.json(event);
  } catch (e) {
    return next(e);
  }
});

/* DELETE /api/events/id/:id */
router.delete('/id/:id', async function(req, res, next) {
  try {
    const event = await Event.findByIdAndRemove(
      req.params.id, req.body);
    return res.json(event);
  } catch (e) {
    return next(e);
  }
});

/* DELETE /api/events all */

 router.delete('/', async function(req, res, next) {
 try {
 const event = await Event.remove();
 return res.json(event);
 } catch (e) {
 return next(e);
 }
 });


module.exports = router;