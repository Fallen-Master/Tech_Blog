const router = require('express').Router();
const { Post, User } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const post = postData.map((pos) => pos.get({ plain: true }))
    res.render('homePage', {
      post,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['content']
        }
      ]
    });
    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('./dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ['username'],
      include: [
        {
          model: Post,
          attributes: ['title', 'content', 'dateCreated']
        },
      ],
    });
    const userPost = userData.Post.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
      userPost,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;