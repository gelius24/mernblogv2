import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You not allowed to create a post"));

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Fill the required fields"));
  }
  // 😥
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
    // matches any character that is not a lowercase letter, uppercase letter, digit, or hyphen
    // the 'g' at the end signifies a global search, it will match all occurrences of the pattern in the string
    //so here we erease all symbols 
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    next(error)
  }
};
