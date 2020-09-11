import React from "react";
import Cliente from "./Cliente";
import CargarCliente from "./CargarCliente";
import EditarCliente from "./EditarCliente"
import {Table,Container,Row,Button,Modal,ModalHeader,Col,Card,CardHeader,CardBody
} from "reactstrap";

class ClientesLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clientes: [], seleccionado: {} ,cliente:{}};
    this.selectCliente = this.selectCliente.bind(this);
    this.clienteChangeHandler = this.clienteChangeHandler.bind(this);
    this.listadoClientes = this.listadoClientes.bind(this);
    this.updateLista = this.updateLista.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentWillMount() {
    fetch(`http://localhost:8888/clientes`)
      .then((res) => res.json())
      .then((cliens) => this.setState({ clientes: cliens }));
  }

  render() {
    return (
      <div className="container">
        <Row>&nbsp;</Row>
        <Container fluid>
          <EditarCliente
            cliente={this.state.seleccionado}
            clienteChange={this.clienteChangeHandler}
            listadoClientes={this.listadoClientes}
            updateLista={this.updateLista}
            // onSubmit={this.props.handleSubmit}
          />
          <Button color="success" onClick={this.toggle}>
            Nuevo Cliente
          </Button>

          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              <strong>Nuevo</strong>Cliente
            </ModalHeader>

            <CargarCliente
              cliente={this.state.seleccionado}
              clienteChanged={this.clienteChangeHandler}
              listadoClientes={this.listadoClientes}
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
                  <i className="fa fa-align-justify"></i> Clientes Lista
                </CardHeader>
                <CardBody>
                  <Table responsive bordered size="sm">
                    <thead>
                      <tr>
                        {/* <th>id</th> */}
                        <th>nombre</th>
                        <th>apellido</th>
                        <th>cuit</th>
                        <th>razonSocial</th>
                        <th>telefono</th>
                        <th>email</th>
                        
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
  listadoClientes() {
    this.componentWillMount();
  }

  updateLista(unCliente) {
    var updateCliente = this.state.clientes.filter(
      (item) => unCliente.id !== item.id
    );
    this.setState({ clientes: updateCliente });
  }

  selectCliente(unCliente) {
    this.setState({ seleccionado: unCliente });
  }

  clienteChangeHandler(unCliente) {
    var nuevaLista = this.state.clientes.map((item) =>
      item.id !== unCliente.id ? item : unCliente
    );
    // this.setState({ clientes: nuevaLista, seleccionado: unCliente });
    this.setState({ clientes: nuevaLista, seleccionado: {},cliente:unCliente });
  }

  deleteCliente(id) {
    this.props.onDelete(id);
  }

  renderRows() {
    return this.state.clientes.map((unCliente, index) => {
      return (
        <Cliente
          cliente={unCliente}
          selector={this.selectCliente}
          updateLista={this.updateLista}
          clienteChangedHandler={this.clienteChangeHandler}
          onDelete={this.deleteCliente.bind(this)}
          // editarCliente={this.editarCliente}
        />
      );
    });
  }
}

export default ClientesLista;