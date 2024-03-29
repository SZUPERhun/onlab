import express from 'express';
import request from 'request';
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

router.post('/', function (req, res) {
  // authenticate using api to maintain clean separation between layers
  request.post({
    url: conf.apiUrl + '/users/authenticate',
    form: req.body,
    json: true
  }, function (error, response, body) {
    if (error) {
      return res.render('login', 
        { error: 'An error occurred' });
    }
    if (!body.token) {
      return res.render('login', 
        { error: 'Username or password is incorrect', username: req.body.username });
    }

    // save JWT token in the session to make it available to the angular app
    req.session.token = body.token;

    // redirect to returnUrl
    /*const returnUrl = req.query.returnUrl 
      && decodeURIComponent(req.query.returnUrl) || '/';*/
    //res.redirect(returnUrl);
    res.redirect('/');
  });
});

module.exports = router; 