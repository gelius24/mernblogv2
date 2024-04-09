import express from 'express'
import { test, updateUser, deleteUser, signOut } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// this file handle what happens in the route /api/user/ 
const router = express.Router();

router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signOut)

export default router;