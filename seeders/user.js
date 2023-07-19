const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { createRandomUser, addRandomUser } = require('../utils');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/plant-app', { useNewUrlParser: true, useUnifiedTopology: true });

// creating the user
<<<<<<< HEAD
addRandomUser();
=======
addRandomUser();
>>>>>>> c63dbecd9b2bd1f869ffd4fd1f7dea2d2a041fcd
