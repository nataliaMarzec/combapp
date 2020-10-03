var { Op } = require("sequelize");
const {
  Venta,
  Articulo,
  Factura,
  Cliente,
} = require("../models/sequelizeConnection.js");

module.exports = {
  async create(req, res) {
    const venta = req.body;

    const {
      id,
      fecha,
      facturado,
      saldoCobrado,
      montoSinCobrar,
      tipoDePago,
    } = await Venta.create(venta);

    return res
      .json({
        id,
        fecha,
        facturado,
        saldoCobrado,
        montoSinCobrar,
        tipoDePago,
      })
      .res.status(200)
      .json(venta);
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
    const venta = await Venta.findByPk(req.params.id);
    const {
      id,
      fecha,
      facturado,
      saldoCobrado,
      montoSinCobrar,
      tipoDePago,
    } = await venta.update(req.body);

    return res.json({
      id,
      fecha,
      facturado,
      saldoCobrado,
      montoSinCobrar,
      tipoDePago,
    });
  },
  getVentasFacturadas: async (req, res, next) => {
    const ventasFacturadas = await Venta.findAll({
      where: { facturado: true },
    });
    if ([req.body.values] > 0) {
      res.status(200).json("ventas facturadas obtenidas:", ventasFacturadas);
    } else {
      if (Venta)
        return res.status(400).json(err, "no obtiene ventas facturadas");
    }
  },

  getVentasFecha: async (req, res, next) => {
    var ventasConFecha = await Venta.findAll({
      where: { fecha: req.params.fecha },
    });
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay ventas en esa fecha" });
    } else {
      return res.status(200).json(ventasConFecha);
    }
  },
  buscarFacturadas: async (req, res) => {
    const facturadas = Venta.findAll({
      where: {
        facturado: req.body.facturado == true,
      },
    })
      .then((facturadas) => res.status(200).send(facturadas))
      .catch((error) => res.status(400).send(error));
    return facturadas;
  },
  getFechas: async (req, res) => {
    const ventaId = await Venta.findByPk(req.params.id);
    const fechas = await Venta.findAll({
      attributes: ["fecha"],
      where: { id: ventaId },
    }).then((res) => JSON.stringify(fechas));
  },
  // const ventas = await Venta.findAll({
  //   attributes: ["fecha"],
  //   // where: {}
  // }).map(v => v.get("fecha")) // [1,2,3]

  // getFechas:async(req,res)=>{
  //   var fechas=await Venta.findAll({where:{fechas:req.params.fechas}})
  //   if (![req.body.values]) {
  //     res.status(400).json({ err: "No hay fechas" });
  //   } else {
  //     return res.status(200).json(fechas);
  //   }
  // },
  // getFecha:async(req,res) => {
  //   ventasFecha=await Venta.findAll();
  //   var query = {}
  //   if (req.query.fecha) {
  //     console.log(`Query ventas fecha: ${req.query.fecha}`)
  //     var fecha = (req.query.fecha)
  //     query = {"fecha" : fecha }
  //   }else{
  //     return res.status(400).json(ventasFecha)
  //   }
  // },

  getVentasFecha:((req, res) => {
    var query = {}
    if (req.query.fecha) {
      console.log(`Query ventas: ${req.query.fecha}`)
      var fecha = (req.query.fecha)
      query = {"fechas" : fecha }
    }
    venta= Venta["ventas"]
    venta.find(query,
      (allObjects) => {
        res.json(allObjects)
        res.end()
      })
  }),

  // dateformate=04 Nov 2017
  encontrarTodos: async (req, res) => {
    const ventas = Venta.findAll({
      attributes: [
        "id",
        "nroVenta",
        [ventas.fn("date_format", ventas.col("fecha"), "%d %b %y"), "fecha"],
      ],
    })
      .then((ventas) => res.status(200).send(ventas))
      .then((res) => console.log(res))
      .catch((error) => res.status(400).send(error));
  },
};
