import {Schema, model} from 'mongoose'

const schema = new Schema({
  content: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  likes: {
    type: Array,
    default: []
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  }
}, {timestamps: true})

const Comment = model('Comment', schema);
export default Comment;