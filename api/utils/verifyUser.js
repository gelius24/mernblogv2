import jwt from 'jsonwebtoken'
import {errorHandler} from './error.js'

// if no token or invalid token use my error middleware,
// if valid token add user to the request
// then next() here is updateUser for example since verifyToken is used in mutliple routes
export const verifyToken = (req,res,next) => {
  const token = req.cookies.access_token;
  
  if (!token) return next(errorHandler(401, 'Unauthorized (no token provided).'))
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, 'Unauthorized (the token didnt pass the test !).'))
    req.user = user
    next();
})
}