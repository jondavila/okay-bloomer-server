const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { createRandomUser, addRandomUser } = require('../utils');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/plant-app', { useNewUrlParser: true, useUnifiedTopology: true });

// creating the user
addRandomUser();
