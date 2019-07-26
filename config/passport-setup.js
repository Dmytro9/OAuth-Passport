const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
	new GoogleStrategy({
		clientID:
			'863543759058-msai6sa06ng1ajvvlr334ttih29edebt.apps.googleusercontent.com',
		clientSecter: 'P7NyjOzpA5FcLlw8KuKrWVYT'
	}),
	() => {}
);
