import express from "express";
import { createUser, deleteUsers, getUsers, loggedInUser, updateUsers } from "../controllers/userController.js";
import { authentication } from "../middlewares/authMiddleware.js";

//create router object
const router = express.Router();

//register user
router.post('/users', createUser);

//login user
router.post('/users/login', loggedInUser);

//get all users
router.get('/users', authentication, getUsers);

//update users
router.put('/users/:id', authentication, updateUsers);

//delete users
router.delete('/users/:id', authentication, deleteUsers);

export default router;

