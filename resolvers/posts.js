const Post = require('../models/Post');
const checkAuth = require('../utils/auth');
const  { AuthenticationError, UserInputError} = require('apollo-server');

module.exports = {
    Query: {
        async getPost() {
            try {
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            }catch(err) {
                throw new Error(err);
            }
        },
        async getPost(parent, {postId}) {
            try {
                const post = await Post.findById(postId);
                if(post) {
                    return post;
                } else {
                    throw new Error("Posy Not found");
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(parent, {body}, context) {
            const user = checkAuth(context);
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })
            const post = await newPost.save();
            context.pubsub.publish("NEW_POST", {
                newPost: post
            })
            return post
        },
        async deletePost(parent, {postId}, context) {
            const user = checkAuth(context);
            try {
                const post = Post.findById(postId);
                if(user.username === post.username) {
                    await post.delete();
                    return "Post Deleted"
                } else {
                    throw new AuthenticationError("Action Not Allowed");
                }
            } catch (err) {
                throw new Error(err)
            }
        },
        async likePost (parent, {postId}, context) {
            const {username } = checkAuth(context)
            const post = Post.findById(postId);
            if(post) {
                if(post.likes.find((like) => like.ussername === username)) {
                    post.likes.filter((like) => like.username !== username);
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await post.save();
                return post;
            } else throw new UserInputError("Post not found")
        }
    },
    Subscription: {
        newPost: {
            subscribe: (parent, args, {pubsub}) => {
                pubsub.asyncIterator("NEW_POST");
            }
        }
    }
}