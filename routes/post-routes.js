import express from "express";
import { authentication } from "../middlewares/authMiddleware.js";
import { createPost, getPost, createComments, likeAPost, updatePost, deletePost } from "../controllers/postController.js";

//create router object
const router = express.Router();

//create post
router.post('/posts/:userId', authentication, createPost);

//get all posts
router.get('/posts', authentication, getPost);

//create comments
router.post('/posts/:postId/:sentBy', authentication, createComments);

//like a post
router.post('/posts/:postId/:userId/:commentId', likeAPost);

//update post
router.put('/posts/:postId/:userId/', authentication, updatePost);

//delete post
router.delete('/posts/:postId/:userId/', authentication, deletePost);


export default router;

