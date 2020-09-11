var { Op } = require("sequelize");
const { Venta,Articulo,Factura,Cliente} = require("../models/sequelizeConnection.js");

module.exports = {
  
async create(req, res) {
    const venta = req.body;

    const { id,fecha,facturado,saldoCobrado,montoSinCobrar,tipoDePago}= await Venta.create(venta);

    return res.json({
      id,
      fecha,
      facturado,
      saldoCobrado,
      montoSinCobrar,
      tipoDePago,
    });
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

  async update(req, res) {
    const venta= await Venta.findByPk(req.params.id);
    const { id,fecha,facturado,saldoCobrado,montoSinCobrar,tipoDePago} = await venta.update(req.body);

    return res.json({
      id,
      fecha,
      facturado,
      saldoCobrado,
      montoSinCobrar,
      tipoDePago,
    });
  }      
};
