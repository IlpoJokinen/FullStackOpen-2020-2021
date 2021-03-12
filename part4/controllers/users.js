const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  const saltRounds = 10;
  const passwordHash = body.password
    ? await bcrypt.hash(body.password, saltRounds)
    : null;

  const user = new User({
    username: body.username,
    name: body.name,
    password: passwordHash
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = usersRouter;