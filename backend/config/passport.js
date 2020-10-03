const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const moment = require('moment');
const { Usuario } = require("../models/sequelizeConnection.js");

module.exports = (db, app, passport) => {

  app.use(session({
    key: 'userId',
    secret: process.env.AUTH_SECRET,
    store: new SequelizeStore({
      db: db.sequelize,
      table: 'Session',
      extendDefaultFields: (defaults, session) => {
        const userId = session && session.passport && session.passport.usuario && session.passport.usuario.id;
        // console.log('-------------------------------------------------------');
        // console.log('userId:', userId);
        // console.log('-------------------------------------------------------');
        if (userId) {
          return {
            data: defaults.data,
            expires: defaults.expires,
            userId: userId
          };
        } else {
          return {
            data: defaults.data,
            expires: defaults.expires
          };
        }
      }
    }),
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    proxy: true,
    cookie: {
      maxAge: moment.duration(5, 'days').asMilliseconds(),
      secure: process.env.APP_SSL === 'true'
    }
  }));

  app.use(passport.initialize());

  app.use(passport.session());

  // Hook up Passport Local Strategy
  passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    // console.log('new local strategy', username, password);
 
    db.findOne({ where: { username: username } }).then((usuario) => {
      // If there's no usuario with the given username
      if (!usuario) {
        return done(null, false, { error: 'No encuentra usuario found.' });
      } else if (!usuario.validPassword(password)) {
        // console.log('pwd correct:', usuario);
        return done(null, false, {
          error: 'Oops! Wrong password.!'
        });
      }
      return done(null, usuario);
    });
  }));

  passport.serializeUser((usuario, cb) => {
    cb(null, usuario);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};