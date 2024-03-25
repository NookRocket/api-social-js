const express = require('express');
const UserRepo = require('../repos/user-repo');

const router = express.Router();

router.get('/users', async (req, res) => {
    // Run a query to get all users
    const users = await UserRepo.find();
    // Send the result back to the person
    // who made this request
    res.send(users);
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await UserRepo.findById(id);

    if (user) {
        res.send(user);
    } else {
        res.sendStatus(404);
    }
});

router.post('/users', async (req, res) => {
    // To show what it was input
    // console.log(req.body)
    const { username, bio } = req.body;
    
    // Get back user
    const user = await UserRepo.insert(username, bio);

    // Send it back
    res.send(user);
});

router.put('/users/:id', async (req, res) => {
    // Get user
    const { id } = req.params;
    // Get content
    const { username, bio } = req.body;

    // Get back the update
    const user = await UserRepo.update(id, username, bio);

    // To check if the user is exist
    if (user) {
        // Send it back
        res.send(user);
    } else {
        res.sendStatus(404);
    }

});

router.delete('/users/:id', async (req, res) => {
    // Get user
    const { id } = req.params;

    // Get back the deleted user
    const user = await UserRepo.delete(id); 

    // To check if the user was exist
    if (user) {
        // Send it back
        res.send(user);
    } else {
        res.sendStatus(404);
    }
    
});

module.exports = router;

