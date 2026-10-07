'use strict';
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const DUMMY_HASH =
  '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345';

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      const err = new Error('User already exists');
      err.status = 400;
      return next(err);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password: _, ...responseUser } = newUser.toObject();

    return res.status(201).json(responseUser, 'User registered successfully');
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    const match = await bcrypt.compare(
      password,
      user ? user.password : DUMMY_HASH
    );

    if (!user || !match) {
      return res.error('AuthFailure', 'Invalid email or password', 401);
    }

    const token = generateToken(user._id.toString());

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 86400000,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
    });

    return res.json(
      {
        token,
      },
      'Logged in successfully'
    );
  } catch (err) {
    next(err);
  }
};
