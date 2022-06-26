// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user')


// New (registration page)
userRouter.get('/register', (req, res) => {
	res.render('users/new.ejs', {
        currentUser: req.session.user
    });
});


// Create - Create User 
userRouter.post('/register', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    User.create(req.body, (error, createdUser) => {
        res.redirect('/');
    });
});




module.exports = userRouter;





