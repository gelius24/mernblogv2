import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';

// this file containe the functions of the different API routes

export const test = (req, res) => {
  res.send('test réussi')
}

// get the users
export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(403, "You can't access users data"))
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find().sort({createdAt: sortDirection}).skip(startIndex).limit(limit);
    // remove the password from this operation
    // ._doc is a mongoose prop who return a js object retreived from mongodb (user show more stuff)
    const usersWithoutPassword = users.map((user) => {
      const {password, ...rest} = user._doc;
      return rest;
    })
    const totalUser = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )
    const lastMonthUsers = await User.countDocuments({
      createdAt: {$gte: oneMonthAgo}
    })
    res.status(200).json({users: usersWithoutPassword, totalUser, lastMonthUsers })
  } catch (error) {
    next(error)
  }
}

// logout (clear the access_token cookie)
export const signOut = (req, res, next) => {
  try {
    res.clearCookie('acces_token').status(200).json('User disconnected.')
  } catch (error) {
    next(error)
  }
}

// delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You not allowed to delete this user.'))
  }
  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json('User deleted.')
  } catch (error) {
    next(error)
  }
}

// after a jwt verification, update the user info in the db.
export const updateUser = async (req, res, next) => {
  // cookie -> access_token: {id: User._id} et utilise process.env.JWT_SECRET
  // params = a l'id dans l'url
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You not allowed to update this user.'))
  }
  if (req.body.username) {
    if(req.body.username.length < 3 || req.body.username.length > 20){
      return next(errorHandler(400, 'username must be between 3 and 20 characters'))
    }
    if(req.body.username.includes(' ')){
      return next(errorHandler(400, 'username cannot contain spaces !'))
    }
    if(req.body.username !== req.body.username.toLowerCase()){
      return next(errorHandler(400, 'username must be in lowercase'))
    }
    // regex 🤓
    // +$ is used to match one or more occurrences of the preceding character or group of characters.
    // S/O chat gpt (* is 0 or more)
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
      return next(errorHandler(400, 'username must be in lowercase'))
    }
  }

  if (req.body.password){
    if (req.body.password.length < 6){
      return next(errorHandler(400, 'Password must be at least 6 characters longs'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
        // update what is included in the request only
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password
        }
      }, {new: true});
      const {password, ...rest} = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error)
    }
  
}

