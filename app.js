const express = require('express');
const authRoutes = require('./routes/auth-routes');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

// create home route
app.get('/', (req, res) => {
	res.render('home');
});

// set up routes
app.use('/auth', authRoutes);

app.listen(3000, () => {
	console.log('App listening on port 3000');
});
