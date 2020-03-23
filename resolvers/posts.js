const Post = require('../models/Post');
const checkAuth = require('../utils/auth');
const  { AuthenticationError, UserInputError} = require('apollo-server');

module.exports = {
    Query: {
        async getPosts() {
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
            if(body.trim() === '') {
                throw new UserInputError("Post must not be empty");
            }
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
                const post = await Post.findById(postId);
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
            const postData = await Post.findById(postId);
            if(postData) {
                let index = postData.likes.findIndex(x => x.username == username);
                if(index > -1) {
                    postData.likes.splice(index, 1)
                } else {
                    postData.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await postData.save();
                return postData;
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