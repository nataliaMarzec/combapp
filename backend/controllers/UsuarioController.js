var { Op } = require("sequelize");
const { Usuario } = require("../models/sequelizeConnection.js");
const usuario = require("../models/usuario.js");

module.exports = {
  create: async (req, res) => {
    const usuario = req.body;

    const { id, username, password } = await Usuario.create(usuario);

    return res
      .json({
        id,
        username,
        password,
      })
      .res.status(200)
      .json({ usuario: "usuario creado" });
  },

  getUsuarios: async (req, res, next) => {
    const clientes = await Usuario.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de usuarios" });
    } else {
      return res.status(200).json(clientes);
    }
  },

  getUsuarioId: async (req, res) => {
    var usuario = await Usuario.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay usuario con ID" });
    } else {
      return res.status(200).json(usuario);
    }
  },

  deleteUsuarioById: async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    await usuario.destroy();
    return res.json({ delete: "Usuario eliminado" });
  },

  async update(req, res) {
    const usuario = await Usuario.findByPk(req.params.id);
    const { id, username, password } = await usuario.update(req.body);

    return res.json({
      id,
      username,
      password,
    });
  },
};