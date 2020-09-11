import React from "react";
import Factura from "./Factura";
import CargarFactura from "./CargarFactura";
import EditarFactura from "./EditarFactura";
import {
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

class FacturasLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facturas: [],
      seleccionado: {},
      factura: {},
      id: "",
      nroComprobante: "",
      tipoComprobante: "",
      ptoVenta: "",
    };
    this.selectFactura = this.selectFactura.bind(this);
    this.facturaChangeHandler = this.facturaChangeHandler.bind(this);
    this.listadoFacturas = this.listadoFacturas.bind(this);
    this.updateLista = this.updateLista.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentWillMount() {
    fetch(`http://localhost:8888/facturas`)
      .then((res) => res.json())
      .then((facturas) => this.setState({ facturas: facturas }));
  }

  render() {
    return (
      <div className="container">
        <Row>&nbsp;</Row>
        <Container fluid>
          <EditarFactura
            factura={this.state.seleccionado}
            facturaChange={this.facturaChangeHandler}
            listadoFacturas={this.listadoFacturas}
            updateLista={this.updateLista}
          />
          <Button color="success" onClick={this.toggle}>
            Nueva Factura
          </Button>

          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              <strong>Nueva</strong>Factura
            </ModalHeader>

            <CargarFactura
              factura={this.state.seleccionado}
              facturaChanged={this.facturaChangeHandler}
              listadoFacturas={this.listadoFacturas}
              updateLista={this.updateLista}
            />
          </Modal>

          <Row>&nbsp;</Row>
        </Container>

        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Facturas Lista
                </CardHeader>
                <CardBody>
                  <Table responsive bordered size="sm">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>nroComprobante</th>
                        <th>fechaEmision</th>
                        <th>tipoComprobante</th>
                        <th>puntoDeVenta</th>
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
  listadoFacturas() {
    this.componentWillMount();
  }

  updateLista(unaFactura) {
    var updateFactura = this.state.facturas.filter(
      (item) => unaFactura.id !== item.id
    );
    this.setState({ facturas: updateFactura });
  }

  selectFactura(unaFactura) {
    this.setState({ seleccionado: unaFactura });
    this.setState({ id: unaFactura.id });
    this.setState({ nroComprobante: unaFactura.nroComprobante });
    this.setState({ fechaEmision: unaFactura.fechaEmision });
    this.setState({ tipoComprobante: unaFactura.tipoComprobante });
    this.setState({ ptoVenta: unaFactura.ptoVenta });
  }
  estadoInicial() {
    this.setState({
      factura: {
        nroComprobante: "",
        fechaEmision: "",
        tipoComprobante: "",
        ptoVenta: "",
      },
    });
  }

  facturaChangeHandler(unaFactura) {
    var nuevaLista = this.state.facturas.map((item) =>
      item.id !== unaFactura.id ? item : unaFactura
    );
    this.setState({
      facturas: nuevaLista,
      seleccionado:unaFactura,
      // factura: unaFactura,
    });
  }

  deleteFactura(id) {
    this.props.onDelete(id);
  }

  renderRows() {
    return this.state.facturas.map((unaFactura, index) => {
      return (
        <Factura
          factura={unaFactura}
          selector={this.selectFactura}
          updateLista={this.updateLista}
          facturaChangedHandler={this.facturaChangeHandler}
          onDelete={this.deleteFactura.bind(this)}
          // editarCliente={this.editarCliente}
        />
      );
    });
  }
}

export default FacturasLista;
