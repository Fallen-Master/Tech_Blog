const router = require('express').Router();
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth')



router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
      ],
    });
    const post = postData.map((post) => post.get({ plain: true }))

    res.render("homepage", {
      post,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['Username']
        },
        {
          model: Comment
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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ['username'],
      include: [
        {
          model: Post,
          attributes: ['title', 'content', 'date_created']
        },
      ],
    });
    const user = userData.get({ plain: true });


    res.render('dashboard', {
      ...user,
      logged_in: true
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


router.get('/signup', (req, res) => {
  res.render('signup')
  return;
});

module.exports = router;