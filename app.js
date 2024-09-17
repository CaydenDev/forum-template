const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const config = require('./config/config');
const PostRoutes = require('./routes/posts');
const UserRoutes = require('./routes/users');

const app = express();


mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoURI })
}));

app.use(express.static('public'));


app.use('/posts', PostRoutes);
app.use('/users', UserRoutes);


app.get('/', (req, res) => {
    res.render('index');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
