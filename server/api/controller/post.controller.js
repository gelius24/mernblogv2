import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

// Delete a post
export const deletePost = async (req, res, next) => {
  // check if user is an admin
  if (!req.user.isAdmin || req.user.id !== req.params.userId)
    return next(errorHandler(403, "You are not allowed to delete this"));
  // db operation are put here for the code to not crash if anything bad happen
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("post successfully deleted.");
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId)
    return next(errorHandler(403, "You are not allowed to update this post"));
  try {
    const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          slug
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error)
  }
};

// Return one or multiple posts
export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    let sortDirection = (req.query.order === "asc" ? 1 : -1);
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAd: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

// add post to mongo db
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
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
