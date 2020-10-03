var { Op } = require("sequelize");
const {Usuario,Cliente} = require("../models/sequelizeConnection.js");
const passport = require('passport');

module.exports = (passport,db) => {
    return {
      register: (req, res) => {
        if (!req.body.email || !req.body.password) {
          return res.json({ message: 'Email Password son requeridos!' });
        }
  
        db.sync().then(() => {
          const nuevoUsuario = {
            username: req.body.username,
            password: req.body.password,
            dni: req.body.dni,
            esAdministrador: req.body.esAdministrador
          };
          return db.create(nuevoUsuario).then(() => {
            res.status(200).json({ message: 'Ha sido registrado.' });
          });
        }).catch((err) => {
          console.log(err);
          res.status(403).json({ error: 'Email ya existe!' });
        });
      },

      login: (req, res, next) => {
        passport.authenticate('local', (err, usuario) => {
          if (err) {
            return next(err);
          }
          if (usuario) {
            req.logIn(usuario, (err) => {
              if (err) {
                return next(err);
              }
              return res.status(200).json({ loggedIn: true });
            });
          } else {
            res.json({ loggedIn: false, error: 'No puede log in, checkea username y password!' });
          }
        })(req, res, next);
      },

      // logout: (req, res, next) => {
      //   req.logout();
      //   req.session.destroy((err) => {
      //     if (err) {
      //       return next(err);
      //     }
      //     res.clearCookie('connect.sid', { path: '/' });
      //     res.redirect('/');
      //   });
      // },

      updateUsuario: (req, res) => {
        // console.log('req.body:', req.body);
        db.update({
            username: req.body.username,
            password: req.body.password,
            dni: req.body.dni,
            esAdministrador: req.body.esAdministrador
        }, {
          where: { id: req.params.id }
        }).then(result => {
          // console.log(result);
          res.json(result);
        });
      },

      confirmAuth: (req, res) => {
        const username = req.body.username;
        const pwd = req.body.password;
  
        db.findOne({
          where: { username: username }
        }).then((usuario) => {
          if (!usuario) {
            return res.json(false);
          }
          if (!usuario.validPassword(pwd)) {
            return res.json(false);
          }
          return res.json(true);
        });
      },






    };
  };