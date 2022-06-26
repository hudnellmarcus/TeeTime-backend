const express = require('express');
const TeeTime = require('../models/teetimes')
const router = express.Router();
// const { append } = require('express/lib/response');
// const User = require('../models/user')
// const session = require('express-session')



//Index
router.get("/dashboard", async (req, res) => {
    try {
        res.json(await TeeTime.find({}));
    } catch (error) {
        res.status(400).json("There's been an error please check the console")
    }
});


// New
router.get('/new', (req, res) => {
    res.render('new.ejs', {
        currentUser: req.session.currentUser
    });
});



// Delete
router.delete('dashboard/:id', (req, res) => {
    TeeTime.findByIdAndDelete(req.params.id, () => {
        res.redirect('/dashboard');
    });
});


// Update
router.put('dashboard/:id', async (req, res) => {
    try {
        res.json(
            await TeeTime.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }

});




// Create
router.post('/dashboard', async (req, res) => {
    try {
        res.json(await TeeTime.create(req.body));
    } catch (error) {
        res.status(400).json("There's been an error check the console")
    }

});




//Edit
router.get('/edit/:id', (req, res) => {
    TeeTime.findById(req.params.id, (error, foundTeeTime) => {
        res.render('edit.ejs', {
            teetime: foundTeeTime,
            currentUser: req.session.currentUser
        });
    });
});




// Show 
router.get('/:id', (req, res) => {
    TeeTime.findById(req.params.id, (err, foundTeeTime) => {
        res.render('show.ejs', {
            currentUser: req.session.currentUser,
            teetime: foundTeeTime,
        });
    });
});






module.exports = router;




