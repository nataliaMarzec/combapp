import React from "react";
import Venta from "./Venta";
import CargarVenta from "./CargarVenta";
import EditarVenta from "./EditarVenta";
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

class VentasLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ventas: [], seleccionado: {},fechas:[],pagos:[] };
    this.selectVenta = this.selectVenta.bind(this);
    this.ventaChangeHandler = this.ventaChangeHandler.bind(this);
    this.listadoVentas = this.listadoVentas.bind(this);
    this.updateLista = this.updateLista.bind(this);
    this.toggle = this.toggle.bind(this);

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
          {/* <EditarCliente
            venta={this.state.seleccionado}
            ventaChange={this.ventaChangeHandler}
            listadoVentas={this.listadoVentas}
            updateLista={this.updateLista}
            // onSubmit={this.props.handleSubmit}
          />*/}
          
          {/* <Button color="success" onClick={this.toggle}>
            Nueva Venta
          </Button> 
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              <strong>Nueva</strong>Venta
            </ModalHeader>

            <CargarVenta
              venta={this.state.seleccionado}
              ventaChanged={this.ventaChangeHandler}
              listadoVentas={this.listadoVentas}
              updateLista={this.updateLista}
            />
          </Modal> */}

          <Row>&nbsp;</Row>
        </Container>

        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>Ventas Lista
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
                      <tr>
                        <th>id</th>
                        <th>nroVenta</th>
                        <th>fecha</th>
                        {/* <th>facturado</th> */}
                        <th>saldoCobrado</th>
                        <th>montoSinCobrar</th>
                        <th>tipoDePago</th>
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
      return (
          <th>{col}</th>
      );
    })
  }
  selectVenta(unaVenta) {
    this.setState({ seleccionado: unaVenta });
  }

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
        />
      );
    });
  }

}
{
  /* <h5>Lista de ventas</h5>
           <Table hover bordered striped>
          <thead>
            <tr>            
              <th>nroVenta</th>
              
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta,key) => {               
              return (<tr key={key}>
                <td >{venta.nroVenta}</td>
                <td>
                  <ModalCrearVenta texto={"Editar"} venta={venta}/>
                  <ModalBorrarVenta texto={"Eliminar"} venta={venta}/> 
                  </td>
              </tr>)
            })}
            
  
          </tbody>
        </Table>
        </Jumbotron>
          </main>     */
}

export default VentasLista;
