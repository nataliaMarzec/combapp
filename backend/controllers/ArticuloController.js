var { Op } = require("sequelize");
const factura = require("../models/factura.js");
const { Articulo } = require("../models/sequelizeConnection.js");


module.exports = {
  createArticulo: (req, res) => {
    const articulo = Articulo.create({
      id: req.body.id,
      nombre:req.body.nombre,
      codigo:req.body.codigo,
      descripcion:req.body.descripcion,
      precio:req.body.precio,
    });
    res.status(200).json(articulo);
  },

  async create(req, res) {
    const articulo = req.body;

    const { id, nombre,codigo,descripcion,precio} = await Articulo.create(articulo);

    return res.json({
        id,
        nombre,
        codigo,
        descripcion,
        precio,
    });
  },

  getArticulos: async (req, res, next) => {
    const articulos= await Articulo.findAll();
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

  updateArticuloByID: (request, result) => {
    const articuloID = request.params.id;
    console.log(articuloID);
    console.log(request.body);
    Articulo.update(request.body, {
      where: { id:articuloID },
    })
      .then((num) => {
        console.log(num[0]);
        if (num[0] === 1) {
          result.send({
            message: "Articulo completamente actualizado.",
          }).then(this.getArticulos().updateAll());
        } else {
          result.send({
            message: `No puede actualizar el Articulo con  id=${articuloID}!`,
          });
        }
      })
      .catch((err) => {
        result.status(500).send({
          message:
            err.message ||
            `Error mientras actualizaba el Articulo con id=${articuloID}!`,
        });
      });
  },

  updateArticulo: (req, res) => {
    const articulo = Articulo.update({
        id: req.body.id,
        nombre:req.body.nombre,
        codigo:req.body.codigo,
        descripcion:req.body.descripcion,
        precio:req.body.precio,
      
    }).save(articulo)
    .then((res)=>res.status(200).json(articulo))
    .then(this.getArticulos().updateAll())
    return articulo;

  },

  update(req, res) {
    const articulo = Articulo.findById(req.params.id)
      .update({
      id: req.body.id || articulo.id,
      nombre:req.body.nombre||articulo.nombre,
      codigo:req.body.codigo||articulo.codigo,
      descripcion:req.body.descripcion||articulo.descripcion,
      precio:req.body.precio||articulo.precio,
      }).update(articulo).save(articulo)
      return articulo;
  },


      
};
