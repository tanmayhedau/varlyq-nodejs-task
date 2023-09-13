import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
  createdBy: {
    type: ObjectId,
    ref: "user",
  },
  message: {
    type: String,
  },
  comments: [
    {
      sentBy: ObjectId,
      sentAt: Date,
      comment:String,
      liked: [
        { type: ObjectId }
      ]
    }
  ]
}, { timestamps: true });


const PostModel = mongoose.model('post', postSchema);
export default PostModel;