import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

// create a user and add to the db
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  // secure the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json("user created !");
  } catch (error) {
    next(error);
  }
};

// login process. check if user exixst in db, use JWT for auth
export const signin = async (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password || email === '' || password === '')
    return next(errorHandler(400, "All fields are required"))

  // check in db if credentials are valid
  try {
    const validUser = await User.findOne({email});
    if (!validUser)
      return next(errorHandler(404, 'email not found'))

    // comparason between not hashed and hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // remove the hashed code from to validUser object
    const {password: pass, ...rest} = validUser._doc;

    if (!validPassword)
      return next(errorHandler(404, 'Invalid password'))

    // authenticate the user with JWT (jsonwebtoken)
    const token = jwt.sign(
      {id: validUser._id},
      process.env.JWT_SECRET
    )
    // add the token to the cookies
    res.status(200).cookie('access_token', token
    ,{httpOnly: true}).json(rest)

  } catch (error) {
    
  }
  
}

// handling of google auth
export const google = async (req, res, next) => {
  const {email, name, googlePhotoUrl} = req.body;
  try {
    // check if user exist log him send a cookie with token
    const user = await User.findOne({email})
    if (user) {
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      const {password, ...rest} = user._doc
      res.status(200).cookie('access_token', token, {httpOnly: true})
      .json(rest);
    } else {
      // no user: create one with randow password 
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl
      })
      await newUser.save();
      // then connect the new user to the app with jwt
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
      const {password, ...rest} = newUser._doc
      res.status(200).cookie('access_token', token, {httpOnly: true})
      .json(rest);
    }

  } catch (error) {
    next(error)
  }
}