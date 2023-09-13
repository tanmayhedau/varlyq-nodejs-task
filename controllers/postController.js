import PostModel from "../models/postModel.js";


//create api
export const createPost = async (req, res) => {
  try {
    const createdBy = req.params.userId;
    const { message } = req.body;

    //validations
    if (!message) {
      return res.status(400).json({ success: false, mssg: `Write some comments here` });
    }

    //authorization
    if (req.userId !== createdBy) {
      return res.status(403).json({ success: false, message: "Unauthorized user" });
    }

    //query to create post
    const post = await PostModel.create({ createdBy, message });  //initially there will be no comments to new post
    return res.status(201).json({ success: true, mssg: `Post created successfully`, post });
  } catch (error) {
    return res.status(500).json({ error: `Error from createPost ${error.message}` });
  }
};


//get api
export const getPost = async (req, res) => {
  try {
    const posts = await PostModel.find({}).populate({
      path: 'createdBy',
      select: 'name email mobile',
    })
      .populate({
        path: 'comments',
        populate: {
          path: 'sentBy',
          select: 'name email mobile',
        },
      })
      .exec();
    if (!posts) {
      return res.status(404).json({ success: false, message: `No posts found` });
    }
    return res.status(200).json({ success: true, message: "Fetched all posts", count: posts.length, posts });
  } catch (error) {
    return res.status(500).json({ error: `Error from createPost ${error.message}` });
  }
};


//post comment api
export const createComments = async (req, res) => {
  try {
    const { postId, sentBy } = req.params;
    const { comment } = req.body;

    //validation
    if (!comment) {
      return res.status(400).json({ success: false, message: `write some comment` });
    }

    //authorization
    if (req.userId !== sentBy) {
      return res.status(403).json({ success: false, message: "Unauthorized user" });
    }

    //check if post is present
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: `No posts found` });
    }

    let newComments = {
      sentBy,
      sentAt: new Date().toISOString(),
      comment,
      liked: [],   //Start with an empty array of likes
    };

    post.comments.push(newComments);

    // Save the updated post to the database
    const updatedPost = await post.save();

    return res.status(201).json({ success: true, message: 'Comment added successfully', post: updatedPost });

  } catch (error) {
    return res.status(500).json({ error: `Error from createComment ${error.message}` });
  }
};


//like a post api
export const likeAPost = async (req, res) => {
  try {
    const { postId, userId, commentId } = req.params;

    //check if post is present
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: `No posts found` });
    }

    //mongoose method to find subdocument
    let comment = post.comments.id(commentId);

    // Add the userId to the liked array
    comment.liked.push(userId);

    // Save the updated post to the database
    const updatedPost = await post.save();

    res.status(200).json({ success: true, message: 'Like added to comment successfully', post: updatedPost });

  } catch (error) {
    return res.status(500).json({ error: `Error from likeAPost ${error.message}` });
  }
};


//update post 
export const updatePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const { message } = req.body;

    //authorization
    if (req.userId !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized user" });
    }

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: `No posts found` });
    }

    if (post.createdBy.toString() === userId) {
      //update query
      const post = await PostModel.findByIdAndUpdate(postId, { $set: { message } }, { new: true });
      await post.save();
      return res.status(200).json({ success: true, message: "Post updated successfully", post });
    } else {
      return res.status(403).json({ success: false, message: `you are not creator of this post` });
    }

  } catch (error) {
    return res.status(500).json({ error: `Error from updatePost ${error.message}` });
  }
};


//delete a post 
export const deletePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    //authorization
    if (req.userId !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized user" });
    }

    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: `No posts found` });
    }

    if (post.createdBy.toString() === userId) {
      //delete query
      const deletepost = await PostModel.findByIdAndDelete(postId);
      return res.status(200).json({ success: true, message: "Post deleted successfully" });
    } else {
      return res.status(403).json({ success: false, message: `you are not creator of this post` });
    }


  } catch (error) {
    return res.status(500).json({ error: `Error from deletePost ${error.message}` });
  }
};