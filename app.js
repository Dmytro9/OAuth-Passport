const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const keys = require('./config/keys');
require('./config/passport-setup');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [keys.session.cookieKey]
	})
);

// init passport
app.use(passport.initialize());
app.use(passport.session());

// db
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () =>
	console.log('Connected to mongodb')
);

// create home route
app.get('/', (req, res) => {
	res.render('home', { user: req.user });
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(3000, () => {
	console.log('App listening on port 3000');
});
