import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class CargarCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: this.props.clientes,
      cliente: props.cliente,
      clienteVentas: props.clienteVentas,
      unCliente: {},
      modal: false,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  estadoInicial() {
    this.setState({
      cliente: {
        nombre: "",
        apellido: "",
        cuit: "",
        razonSocial: "",
        telefono: "",
        email: "",
      },
    });
  }

  componentWillMount() {
    this.props.listadoClientes();
  }


  componentWillReceiveProps(props) {
    this.setState({ cliente: props.cliente });
    this.setState({ clientes: props.clientes });
    this.setState({ clienteVentas: props.clienteVentas});
    this.setState({ eliminarCliente: props.eliminarCliente });

  }

  changeHandler(event) {
    var nuevoCliente = Object.assign({}, this.state.cliente);
    nuevoCliente[event.target.name] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ cliente: nuevoCliente });
  }

  addHandler(event) {
    console.log(
      "agregar p/cliente/clientesLista",
      this.state.cliente,
      this.state.clientes
    );
    fetch("http://localhost:8888/clientes", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.cliente),
    })
      .then((res) => console.log(this.state.clientes, this.state.cliente))
      .then((res) =>
        console.log("listado clientes__", this.props.listadoClientes())
      )
      .then((res) => this.estadoInicial());
    event.preventDefault();
  }

  handleSubmit = event => {
    if (this.state.cliente.id) {
      this.editarcliente();
    } else {
      this.buscarElCliente(this.state.cliente.nroCliente);
    }
    event.preventDefault(event);
  };

  buscarElCliente = elCliente => {
    fetch(`http://localhost:8888/clientes/buscar/` + elCliente)
      .then(res => res.json())
      .then(clts =>
        this.setState({ elCliente: clts }, this.agregarCliente(clts))
      );
  };




  render() {
    return (
      <Col xs="12" md="12">
        <ModalBody>
          <Form className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label for="ejnombre">Nombre</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="ejnombre"
                  name="nombre"
                  placeholder="Completa Nombre..."
                  required
                  value={this.state.cliente.nombre}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="apellido">apellido</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Completa Apellido..."
                  required
                  value={this.state.cliente.apellido}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="cuit">Cuit</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="number"
                  id="cuit"
                  name="cuit"
                  placeholder="Completa Cuit..."
                  required={true}
                  value={this.state.cliente.cuit}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="razonSocial">razon social</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="razonSocial"
                  name="razonSocial"
                  placeholder="Completa razon social..."
                  required
                  value={this.state.cliente.razonSocial}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="hf-mobile-number">Nro&nbsp;telefono</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="hf-mobile-number"
                  name="hf-mobile-number"
                  placeholder="Completa telefono..."
                  required={false}
                  value={this.state.cliente.telefono}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label for="email">Email</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Completa Email..."
                  required={true}
                  value={this.state.cliente.email}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            type="<submit></submit>"
            color="success"
            onClick={this.addHandler.bind(this)}
          >
            <i className="fa fa-dot-circle-o"></i> Guardar
          </Button>
        </ModalFooter>
      </Col>
    );
  }
}

export default CargarCliente;
