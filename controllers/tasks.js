const express = require('express');
const { User } = require('../models');
const router = express.Router();


router.put('/:userEmail/:taskId', (req, res) => {
    User.find({ email: req.params.userEmail })
    .then(user => {
        if (!user) {
            return res.json({ message: 'User cannot be found'});
        }
        // find task by id
        const task = user[0].plants[0].userPlants[0].plantTasks.id(req.params.taskId); // not sure that works?
        // console.log('---- find task ----', task);
        task.status = req.body.status;
        // console.log('---- task complete', task);

        // save the user
        user[0].save()
        .then(user => {
            // return res.json({ user });
            console.log('user', user);
            console.log('task', task);
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'Task was not updated try again...'})
        });
   
        if (!task) {
            console.log('task cannot be found');
            return res.json({ message: 'Task cannot be found'});
        }
        // return the task to the user
        return res.json({ task }); 
    })
})

module.exports = router;