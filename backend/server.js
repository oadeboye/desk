const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');

const auth = require('./routes/auth');
const routes = require('./routes/routes');
const hashPassword = require('./helper/hash');

const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

// passport setup
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new LocalStrategy((username, password, done) => {
  const hash = hashPassword(password);
  // Find the user with the given username
  User.findOne({username: username})
    .then((user) => {
      // If no user is present, authentication failed
      if (!user) {
        console.log('USER NOT FOUND', user);
        return done(null, false, {message: 'Incorrect username.'});
      }
      // If passwords do not match, authentication failed
      if (user.password !== hash) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      // Authentication succeeded
      return done(null, user);
    })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
}));


app.use('/api/auth', auth(passport));
app.use('/api', routes);

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, (error) => {
  error
      ? console.error(error)
      : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
