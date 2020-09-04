var { Op } = require("sequelize");
const { Venta } = require("../models/sequelizeConnection.js");

module.exports = {
  
  createVenta: (req, res) => {
    const venta = Venta.create({
      fecha: req.body.fecha,
      facturado: req.body.facturado,
      saldoCobrado: req.body.saldoCobrado,
      montoSinCobrar: req.body.montoSinCobrar,
      tipoDePago: req.body.tipoDePago,
    });
    res.status(200).json(venta);
  },

  getVentas: async (req, res, next) => {
    const ventas = await Venta.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de ventas" });
    } else {
      return res.status(200).json(ventas);
    }
  },

  getVentaId: async (req, res) => {
    var venta = await Venta.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay venta con ID" });
    } else {
      return res.status(200).json(venta);
    }
  },

  deleteVentaById: async (req, res) => {
    const venta = await Venta.findByPk(req.params.id);
    await venta.destroy();
    return res.json({ delete: "Venta eliminado" });
  },

  updateVentaById: (request, result) => {
    const paramID = request.params.id;
    console.log(paramID);
    console.log(request.body);
    Venta.update(request.body, {
      where: { id: paramID },
    })
      .then((num) => {
        console.log(num[0]);
        if (num[0] === 1) {
          result.send({
            message: "Venta completamente actualizado.",
          });
        } else {
          result.send({
            message: `No puede actualiza la Venta con  id=${paramID}!`,
          });
        }
      })
      .catch((err) => {
        result.status(500).send({
          message:
            err.message ||
            `Error mientras actualizaba la Venta con id=${paramID}!`,
        });
      });
  },
};
