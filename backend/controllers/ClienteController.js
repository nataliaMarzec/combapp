var { Op } = require("sequelize");
const { Cliente } = require("../models/sequelizeConnection.js");

module.exports = {
  createCliente: (req, res) => {
    const cliente = Cliente.create({
      id: req.body.id,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      cuit: req.body.cuit,
      razonSocial: req.body.razonSocial,
      telefono: req.body.telefono,
      email: req.body.email,
    });
    res.status(200).json(cliente);
  },

  getClientes: async (req, res, next) => {
    const clientes = await Cliente.findAll();
    if (![req.body.values]) {
      res.status(400).json({ err: "no obtiene lista de clientes" });
    } else {
      return res.status(200).json(clientes);
    }
  },

  getClienteId: async (req, res) => {
    var cliente = await Cliente.findByPk(req.params.id);
    if (![req.body.values]) {
      res.status(400).json({ err: "No hay cliente con ID" });
    } else {
      return res.status(200).json(cliente);
    }
  },

  deleteClienteById: async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    await cliente.destroy();
    return res.json({ delete: "Cliente eliminado" });
  },

  updateClienteByID: (request, result) => {
    const paramID = request.params.id;
    console.log(paramID);
    console.log(request.body);
    Cliente.update(request.body, {
      where: { id: paramID },
    })
      .then((num) => {
        console.log(num[0]);
        if (num[0] === 1) {
          result.send({
            message: "Cliente completamente actualizado.",
          });
        } else {
          result.send({
            message: `No puede actualiza el Cliente con  id=${paramID}!`,
          });
        }
      })
      .catch((err) => {
        result.status(500).send({
          message:
            err.message ||
            `Error mientras actualizaba el Cliente con id=${paramID}!`,
        });
      });
  },
};
