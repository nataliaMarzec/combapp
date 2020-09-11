var { Op } = require("sequelize");
const { Factura } = require("../models/sequelizeConnection.js");
const factura = require("../models/factura.js");

module.exports = {
  async create(req, res) {
    const factura = req.body;
  const {id,fechaEmision,tipoComprobante,nroComprobante,ptoVenta} = await Factura.create(factura);
    return res.json({
      id,
      fechaEmision,
      tipoComprobante,
      nroComprobante,
      ptoVenta,
    });
  },
  getFacturas: async (req, res, next) => {
    const facturas = await Factura.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de facturas" });
    } else {
      return res.status(200).json(facturas);
    }
  },

  getFacturaId: async (req, res) => {
    var factura = await Factura.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay factura con ID" });
    } else {
      return res.status(200).json(factura);
    }
  },

  deleteFacturaById: async (req, res) => {
    const factura = await Factura.findByPk(req.params.id);
    await factura.destroy();
    return res.json({ delete: "Factura eliminado" });
  },

  updateFacturaById: (request, result) => {
    const paramID = request.params.id;
    console.log(paramID);
    console.log(request.body);
    Factura.update(request.body, {
      where: { id: paramID },
    })
      .then((num) => {
        console.log(num[0]);
        if (num[0] === 1) {
          result.send({
            message: "Factura completamente actualizado.",
          });
        } else {
          result.send({
            message: `No puede actualiza la Factura con  id=${paramID}!`,
          });
        }
      })
      .catch((err) => {
        result.status(500).send({
          message:
            err.message ||
            `Error mientras actualizaba la Factura con id=${paramID}!`,
        });
      })
    
  },



  
};
