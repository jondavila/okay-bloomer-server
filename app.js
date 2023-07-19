const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport);
// create app
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.get('/', (req, res) => {
    return res.json({ message: 'Welcome to my API' });
});

app.use('/posts', require('./controllers/posts'));
app.use('/users', require('./controllers/users'));
app.use('/plantdetails', require('./controllers/plantdetails'));
app.use('/plantguides', require('./controllers/plantguides'));
app.use('/plantlists', require('./controllers/plantlists'));
app.use('/plantfaqs', require('./controllers/plantfaqs'));
<<<<<<< HEAD
app.use('/sanctuary', require('./controllers/sanctuary'));
=======
>>>>>>> bba570f12b3466e7ded1233965dd1814c0cfb173

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`);
});

module.exports = app;