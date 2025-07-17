//[SECTION] Dependencies and Modules
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth');

const { errorHandler } = auth;

//[SECTION] Check if the email already exists

module.exports.checkEmailExists = (req, res) => {

    if(req.body.email.includes("@")){
        return User.find({ email : req.body.email })
        .then(result => {

            if (result.length > 0) {
                return res.status(409).send(true);
            } else {
                return res.status(404).send(false);
            };
        })
        .catch(error => errorHandler(error, req, res));
    } else{
        res.status(400).send(false)
    }
};


//[SECTION] User registration

module.exports.registerUser = (req, res) => {

    // Checks if the email is in the right format
    if (!req.body.email.includes("@")){
        // if the email is not in the right format, send a message 'Invalid email format'.
        return res.status(400).send({ message: 'Invalid email format' });
    }
    // Checks if the mobile number has the correct number of characters
    else if (req.body.mobileNo.length !== 11){
        // if the mobile number is not in the correct number of characters, send a message 'Mobile number is invalid'.
        return res.status(400).send({ message: 'Mobile number is invalid' });
    }
    // Checks if the password has atleast 8 characters
    else if (req.body.password.length < 8) {
        // If the password is not atleast 8 characters, send a message 'Password must be atleast 8 characters long'.
        return res.status(400).send({ message: 'Password must be atleast 8 characters long' });
    // If all needed requirements are achieved
    } else {
        let newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            mobileNo : req.body.mobileNo,
            password : bcrypt.hashSync(req.body.password, 10)
        })

        return newUser.save()
        // if all needed requirements are achieved, send a success message 'User registered successfully' and return the newly created user.
        .then((result) => res.status(201).send({
            message: 'User registered successfully',
            user: result
        }))
        .catch(error => errorHandler(error, req, res));
    }
};

//[SECTION] User authentication
module.exports.loginUser = (req, res) => {

    if(req.body.email.includes("@")){
        return User.findOne({ email : req.body.email })
        .then(result => {
            if(result == null){
                return res.status(404).send({ message: 'No email found' });
            } else {
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
                if (isPasswordCorrect) {
                return res.status(200).send({ 
                    message: 'User logged in successfully',
                    token: auth.createAccessToken(result)
                });
                } else {
                    return res.status(401).send({ message: 'Incorrect email or password' });
                }
            }
        })
        .catch(error => errorHandler(error, req, res));
    } else{
        return res.status(400).send({ message: 'Invalid email format' });
    }
};

//[SECTION] Get user profile
module.exports.getProfile = (req, res) => {
    return User.findById(req.user.id)
    .then(user => {

        if(!user){
            // if the user has invalid token, send a message 'invalid signature'.
            return res.status(200).send({ message: 'invalid signature' })
        }else {
            // if the user is found, return the user.
            user.password = "";
            return res.status(200).send(user);
        }  
    })
    .catch(error => errorHandler(error, req, res));
};


// [SECTION] Change password
module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id); // assuming req.user is set by authMiddleware

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    
    user.password = await bcrypt.hashSync(newPassword, 10);

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

//[SECTION] Update user information
module.exports.updateUserInfo = async (req, res) => {
  const { firstName, lastName, mobileNumber } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

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
        email: user.email, // just for reference
      },
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};