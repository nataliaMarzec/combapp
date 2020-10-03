
const express = require('express')
const router = new express.Router;
const controllerCliente = require('../controllers/ClienteController');
const controllerUsuario= require('../controllers/UsuarioController');
const { Usuario,Cliente } = require('../models/sequelizeConnection');

const router = require('express').Router();

module.exports = (db) => {

//   router.get('/register', (req, res) => {
//     if (req.isAuthenticated()) {
//       res.redirect('/profile');
//     } else {
//       res.render('register');
//     }
//   });


//   router.get('/profile', (req, res) => {
//     if (req.isAuthenticated()) {
//       Usuario.findOne({
//         where: {
//           id: req.session.passport.usuario.id
//         }
//       }).then(() => {
//         const usuario = {
//           userInfo: req.session.passport.usuario,
//           isloggedin: req.isAuthenticated()
//         };
//         // console.log(usuario);
//         res.render('profile', usuario);
//       });
//     } else {
//       res.redirect('/');
//     }
//   });

//   // Load dashboard page
//   router.get('/', (req, res) => {
//     if (req.isAuthenticated()) {
//       const usuario = {
//         usuario: req.session.passport.usuario,
//         isloggedin: req.isAuthenticated()
//       };
//       res.render('dashboard', usuario);
//     } else {
//       res.render('dashboard');
//     }
//   });

//   router.get('/dashboard', (req, res) => {
//     if (req.isAuthenticated()) {
//       const usuario = {
//         usuario: req.session.passport.usuario,
//         isloggedin: req.isAuthenticated()
//       };
//       res.render('dashboard', usuario);
//     } else {
//       res.render('dashboard');
//     }
//   });

//   router.get('/clientes', function (req, res) {
//     if (req.isAuthenticated()) {
//       Cliente.findAll({}).then(function (dbCliente) {
//         res.render('cliente', {
//           msg: 'Welcome!',
//           clientes: dbCliente
//         });
//       });
//     } else {
//       res.redirect('/');
//     }
//   });


//   router.get('/clientes/:id', function (req, res) {
//     if (req.isAuthenticated()) {
//       Usuario.findOne({ where: { id: req.params.id } }).then(function (dbusuario) {
//         res.render('clientes-detalles', {
//           usuario: dbusuario
//         });
//       });
//     } else {
//       res.redirect('/');
//     }
//   });


//   router.get('/logout', (req, res, next) => {
//     req.logout();
//     req.session.destroy((err) => {
//       if (err) {
//         return next(err);
//       }
//       res.clearCookie('connect.sid', { path: '/' });
//       res.redirect('/');
//     });
//   });


//   router.get('*', function (req, res) {
//     res.render('404');
//   });

  return router;
};







module.exports =router
