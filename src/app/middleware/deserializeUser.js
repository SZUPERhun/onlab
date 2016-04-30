import _ from 'underscore';

import User from '../models/user';

async function deSerializeUser(req, res, next) {
  const jwt = req.user;
  const user = await User.findOne({ where: { id: jwt.id } });
  if (_.isNull(user)) {
    return next(new InvalidTokenError());
  }
  req.user = user;
  return next();
}