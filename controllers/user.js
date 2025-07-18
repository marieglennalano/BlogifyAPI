// [SECTION] Dependencies and Modules
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const { errorHandler } = auth;

// [SECTION] Check if the email already exists
module.exports.checkEmailExists = (req, res) => {
  if (req.body.email.includes('@')) {
    return User.find({ email: req.body.email })
      .then(result => {
        if (result.length > 0) {
          return res.status(409).send(true);
        } else {
          return res.status(404).send(false);
        }
      })
      .catch(error => errorHandler(error, req, res));
  } else {
    res.status(400).send(false);
  }
};

// [SECTION] User registration
module.exports.registerUser = (req, res) => {
  if (!req.body.email.includes('@')) {
    return res.status(400).send({ message: 'Invalid email format' });
  } else if (req.body.mobileNo.length !== 11) {
    return res.status(400).send({ message: 'Mobile number is invalid' });
  } else if (req.body.password.length < 8) {
    return res
      .status(400)
      .send({ message: 'Password must be at least 8 characters long' });
  } else {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    return newUser
      .save()
      .then(result =>
        res.status(201).send({
          message: 'User registered successfully',
          user: result,
        })
      )
      .catch(error => errorHandler(error, req, res));
  }
};

// [SECTION] User authentication
module.exports.loginUser = (req, res) => {
  if (req.body.email.includes('@')) {
    return User.findOne({ email: req.body.email })
      .then(result => {
        if (result == null) {
          return res.status(404).send({ message: 'No email found' });
        } else {
          const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            result.password
          );
          if (isPasswordCorrect) {
            return res.status(200).send({
              message: 'User logged in successfully',
              token: auth.createAccessToken(result),
            });
          } else {
            return res
              .status(401)
              .send({ message: 'Incorrect email or password' });
          }
        }
      })
      .catch(error => errorHandler(error, req, res));
  } else {
    return res.status(400).send({ message: 'Invalid email format' });
  }
};

// [SECTION] Google OAuth Login
module.exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify token from Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { email, given_name, family_name } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Register new Google user
      user = new User({
        email,
        firstName: given_name || 'Google',
        lastName: family_name || 'User',
        mobileNo: '00000000000',
        password: 'google_oauth' // dummy, never used
      });

      await user.save();
    }

    // Issue your JWT
    const jwtToken = auth.createAccessToken(user);

    res.status(200).json({
      message: 'Google login successful',
      token: jwtToken
    });
  } catch (err) {
    console.error('Google login error:', err.message);
    res.status(401).json({ message: 'Google authentication failed' });
  }
};

// [SECTION] Get user profile
module.exports.getProfile = (req, res) => {
  return User.findById(req.user.id)
    .then(user => {
      if (!user) {
        return res.status(200).send({ message: 'Invalid signature' });
      } else {
        user.password = '';
        return res.status(200).send(user);
      }
    })
    .catch(error => errorHandler(error, req, res));
};

// [SECTION] Change password
module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hashSync(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// [SECTION] Update user information
module.exports.updateUserInfo = async (req, res) => {
  const { firstName, lastName, mobileNumber } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ message: 'User not found' });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.mobileNumber = mobileNumber || user.mobileNo;

    await user.save();

    res.status(200).json({
      message: 'User information updated successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        mobileNo: user.mobileNo,
        email: user.email,
      },
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// [SECTION] Count Users
exports.countUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Error counting users' });
  }
};
