import {Schema, model} from 'mongoose'

const postSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyAZ0PJnNnC29xhrPi_uVSjcG5XbMmPiolIQ&s'
  },
  category: {
    type: String,
    default: 'uncategorized'
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  }
}, {timestamps: true})

const Post = model('Post', postSchema)
export default Post;