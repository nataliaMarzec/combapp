import React, { Component } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from "reactstrap";

class EditarCliente extends Component {
  constructor(props) {
    super(props);
    this.state = { btn_status: true,clientes:[],cliente: props.cliente != null ? this.props.cliente:""};
    this.changeHandler = this.changeHandler.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
    // this.sendHandler=this.sendHandler.bind(this);
    
  }

  componentWillMount() {
    fetch(`http://localhost:8888/clientes`)
      .then((res) => res.json())
      .then((cli)=>this.setState({cliente:cli}))
      .then((cliens) => this.setState({ clientes: cliens }));
  }

  estadoInicial() {
    this.setState({ cliente: { nombre: "", dni: "", email: "" } });
  }

  componentWillReceiveProps(props) {
    this.setState({ props });
    this.setState({ cliente: props.cliente });
    this.setState({clientes:props.clientes})
  }
 

  changeHandler(event) {
    console.log("change handler_______",event.target.value);
    var nuevoCliente = Object.assign({}, this.state.cliente);
    nuevoCliente[event.target.name] = event.target.value;
    this.setState({cliente: nuevoCliente,clientes:this.props.clientes });
    console.log("change handler-clientes/cliente____",{clientes:this.props.clientes,cliente:nuevoCliente})
}
  

  sendHandler(event) {
    // let{cliente,clientes}={...props}
    // console.log("editar id",id)
    console.log("cliente para editar/clientesLista"+this.state.id,this.state.cliente.id)
    fetch("http://localhost:8888/clientes"+this.state.cliente.id, {
      method: "put",
      body: JSON.stringify(this.state.cliente.id),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this.props.clienteChange(this.state.cliente.id))   
      .then((res)=>this.estadoInicial())
      .then(event.preventDefault());

  }

  render() {
    let {cliente}=this.state
    return (
      <Col xs="6" md="6">
        <Card>
          <CardHeader>
            <strong>Editar</strong> Cliente
          </CardHeader>
          <CardBody>
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
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              size="sm"
              color="primary"
              onClick={(event)=>this.sendHandler(event)}
            >
              <i className="fa fa-dot-circle-o"></i>Guardar cambios
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  }
 
}

export default EditarCliente;