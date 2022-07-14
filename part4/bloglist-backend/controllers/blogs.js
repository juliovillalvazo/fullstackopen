const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');

// const getTokenFrom = (request) => {
//     const auth = request.get('authorization');
//     if (auth && auth.toLowerCase().startsWith('bearer ')) {
//         return auth.substring(7);
//     }
//     return null;
// };

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        res.json(blog);
    } else {
        res.status(404).end();
    }
});

blogsRouter.post('/', async (request, response) => {
    const { body } = request;

    const { user } = request;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog);
});

blogsRouter.put('/:id', async (req, res) => {
    const { user, title, author, url, likes } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { user, title, author, url, likes },
        { new: true, runValidators: true, context: 'query' }
    );

    res.json(updatedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const { user } = req;

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(req.params.id);
        res.status(204).end();
    } else {
        return res.status(401).json({
            error: "Can't delete blog not created by you!!",
        });
    }
});

module.exports = blogsRouter;
