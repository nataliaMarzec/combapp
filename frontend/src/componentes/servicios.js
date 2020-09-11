const axios = require('axios')

class VentaDataService {
  getAll() {
    return axios.get(`http://localhost:8888/ventas`);
  }

  get(id) {
    return axios.get(`http://localhost:8888/ventas/${id}`);
  }

  create(data) {
    return axios.post(`http://localhost:8888/ventas`, data);
  }

  update(id, data) {
    return axios.put(`http://localhost:8888/ventas/${id}`, data);
  }

  delete(id) {
    return axios.delete(`http://localhost:8888/ventas/${id}`);
  }

  deleteAll() {
    return axios.delete(`http://localhost:8888/ventas`);
  }

  findByVenta(venta) {
    return axios.get(`http://localhost:8888/ventas?nroVenta=${venta}`);
  }
}

export default new VentaDataService();