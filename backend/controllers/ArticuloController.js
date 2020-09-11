var { Op } = require("sequelize");
const factura = require("../models/factura.js");
const { Articulo } = require("../models/sequelizeConnection.js");

module.exports = {
  async update(req, res) {
    const articulo = req.body;
    const { id, nombre, codigo, descripcion, precio } = await Factura.create(
      factura
    );

    return res.json({
      id,
      nombre,
      codigo,
      descripcion,
      precio,
    });
  },
  async create(req, res) {
    const articulo = req.body;

    const { id, nombre, codigo, descripcion, precio } = await Articulo.create(
      articulo
    );

    return res.json({
      id,
      nombre,
      codigo,
      descripcion,
      precio,
    });
  },

  getArticulos: async (req, res, next) => {
    const articulos = await Articulo.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de articulos" });
    } else {
      return res.status(200).json(articulos);
    }
  },

  getArticuloId: async (req, res) => {
    var articulo = await Articulo.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay articulo con ID" });
    } else {
      return res.status(200).json(articulo);
    }
  },

  deleteArticuloById: async (req, res) => {
    const articulo = await Articulo.findByPk(req.params.id);
    await articulo.destroy();
    return res.json({ delete: "Articulo eliminado" });
  },

  async update(req, res) {
    const articulo = await Articulo.findByPk(req.params.id);
    const { id, nombre, codigo, descripcion, precio } = await articulo.update(
      req.body
    );

    return res.json({
      id,
      nombre,
      codigo,
      descripcion,
      precio,
    });
  },
};
