import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({
  sentBy: {
    type: ObjectId,
    ref: "user",
  },
  sentAt: Date,
  comment: String,
  liked: [
    {
      type: ObjectId,
      ref: "user",
    }
  ]
});

const postSchema = new mongoose.Schema({
  createdBy: {
    type: ObjectId,
    ref: "user",
  },
  message: {
    type: String,
  },
  comments: [
    commentSchema
  ]
}, { timestamps: true });


const PostModel = mongoose.model('post', postSchema);
export default PostModel;