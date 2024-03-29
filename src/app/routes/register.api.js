import express from 'express';
import request from 'request';
import conf from '../config';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('register');
});

router.post('/', function (req, res) {
  // register using api to maintain clean separation between layers
  request.post({
    url: conf.apiUrl + '/users/register',
    form: req.body,
    json: true
  }, function (error, response) {
    if (error) {
      return res.render('register', { error: 'An error occurred'});
    }

    if (response.statusCode !== 200) {
      return res.render('register', {
        error: response.body,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username
      });
    }

    // return to login page with success message
    req.session.success = 'Registration successful';
    return res.redirect('/login');
  });
});

module.exports = router;