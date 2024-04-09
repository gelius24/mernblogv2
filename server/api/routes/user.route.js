import express from 'express'
import { test, updateUser, deleteUser } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// this file handle what happens in the route /api/user/ 
const router = express.Router();

router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)

export default router;