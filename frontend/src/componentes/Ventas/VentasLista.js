import React from "react";
import Venta from "./Venta";
import EditarVenta from "./EditarVenta";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";


class VentasLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ventas: [], seleccionado: {}, fechas: [], pagos: [] };
    this.selectVenta = this.selectVenta.bind(this);
    this.ventaChangeHandler = this.ventaChangeHandler.bind(this);
    this.listadoVentas = this.listadoVentas.bind(this);
    this.updateLista = this.updateLista.bind(this);
    this.toggle = this.toggle.bind(this);
    this.editarVenta=this.editarVenta.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  

  componentWillMount() {
    fetch(`http://localhost:8888/ventas`)
      .then((res) => res.json())
      .then((ventas) => this.setState({ ventas: ventas }));
  }

  render() {
    return (
      <div className="container">
        <Row>&nbsp;</Row>
        <Container fluid>
          <Row>&nbsp;</Row>
        </Container>

        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>Ventas
                </CardHeader>
                <CardBody>
                  <EditarVenta
                    venta={this.state.seleccionado}
                    ventaChange={this.ventaChangeHandler}
                    listadoVentas={this.listadoVentas}
                    updateLista={this.updateLista}
                  />

                  <Table responsive bordered size="sm">
                    <thead>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i><strong>Todas las ventas</strong>Lista
                      </CardHeader>
                      <tr>
                        <th>id</th>
                        <th>nroVenta</th>
                        <th>fecha</th>
                        <th>facturado</th>
                        <th>saldoCobrado</th>
                        <th>montoSinCobrar</th>
                        <th>tipoDePago</th>
                        <th>acciones</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  renderHeaders(columns) {
    return columns.map((col, index) => {
      return <th>{col}</th>;
    });
  }
  selectVenta(unaVenta) {
    this.setState({ seleccionado: unaVenta });
  }

  editarVenta (unaVenta) {
    this.setState({venta:unaVenta});
  };


  ventaChangeHandler(unaVenta) {
    var nuevaLista = this.state.ventas.map((item) =>
      item.id !== unaVenta.id ? item : unaVenta
    );
    this.setState({ ventas: nuevaLista, seleccionado: unaVenta });
  }

  updateLista(unaVenta) {
    var updateVenta = this.state.ventas.filter(
      (item) => unaVenta.id !== item.id
    );
    this.setState({ ventas: updateVenta });
  }

  deleteVenta(id) {
    this.props.onDelete(id);
  }
  listadoVentas() {
    this.componentWillMount();
  }

  renderRows() {
    return this.state.ventas.map((unaVenta, index) => {
      return (
        <Venta
          venta={unaVenta}
          selector={this.selectVenta}
          updateLista={this.updateLista}
          ventaChangedHandler={this.ventaChangeHandler}
          onDelete={this.deleteVenta.bind(this)}
          editarVenta={this.editarVenta}
          estaActivado={false}
          editarActivado={true}
          borrarActivado={true}


        />
      );
    });
  }
}

export default VentasLista;
