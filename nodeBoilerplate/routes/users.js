const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/getUsers', (req, res) => {
  UserController.getUsers(req.query)
    .then(users => {
      res.json({
        message: 'Successfully retrieved users!',
        data: users
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Could not retrieve users, see error message',
        error: err
      });
    });
});

router.get('/:username', (req, res, next) => {
  UserController.getUsers({ username: req.params.username })
    .then(user => {
      if (user.length === 0) {
        res.render('errorPage', {
          message: 'Could not find the user you submitted.'
        });
      } else {
        res.render('user', {
          username: user[0].username
        });
      }
    })
    .catch(err => {
      res.status(404).json({
        error: err
      });
    });
});

router.post('/createUser', (req, res) => {
  console.log(req.body);
  UserController.createUser(req.body)
    .then(result => {
      res.render('registered');
    })
    .catch(err => {
      res.status(400).render('signup', {
        failure: true
      });
    });
});

module.exports = router;
