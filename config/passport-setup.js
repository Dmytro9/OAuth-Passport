const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			callbackURL: 'http://localhost:3000/auth/google/redirect',
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret
		},
		(accessToken, refreshToken, profile, done) => {
			// check if user already exists in db
			User.findOne({ googleId: profile.id }).then(user => {
				if (!user) {
					new User({
						username: profile.displayName,
						googleId: profile.id,
						thumbnail: profile._json.picture
					})
						.save()
						.then(newUser => {
							console.log(`new usercreated ${newUser}`);
							done(null, newUser);
						});
				} else {
					done(null, user);
					console.log(`user already exists ${user}`);
				}
			});
		}
	)
);
