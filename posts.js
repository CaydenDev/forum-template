const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('index', { posts });
});


router.post('/new', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.session.username
    });
    await newPost.save();
    res.redirect('/');
});


router.post('/delete/:id', async (req, res) => {
    if (req.session.role === 'admin' || req.session.role === 'moderator') {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } else {
        res.status(403).send('Forbidden');
    }
});

module.exports = router;
