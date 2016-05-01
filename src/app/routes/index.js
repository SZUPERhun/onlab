import express from 'express';

const router = express.Router();

/*
 * frontend routes
 * route to handle all angular requests
 */

router.get('/', function(req, res) {
  /*if (req.path !== '/login' && !req.session.token) {
    return res.redirect('/login' + '?returnUrl=' + encodeURIComponent('/' + req.path));
  */return res.render('index');
});

// make JWT token available to angular app
router.get('/token', function (req, res) {
  res.send(req.session.token);
});

module.exports = router;