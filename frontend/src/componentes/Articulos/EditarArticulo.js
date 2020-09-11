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

class EditarArticulo extends Component {
  constructor(props) {
    super(props);
    this.state = { articulos:props.articulos,articulo: props.articulo != null ? this.props.articulo:{}};
    this.changeHandler = this.changeHandler.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
    // this.sendHandler=this.sendHandler.bind(this);
    
  }

  componentWillMount() {
    fetch(`http://localhost:8888/articulos`)
      .then((res) => res.json())
      .then((articulo)=>this.setState({articulo:articulo}))
      .then((articulos) => this.setState({ articulos:articulos }));
  }

  estadoInicial() {
    this.setState({ articulo: { nombre: "",codigo: "",descripcion: "",precio:"" } });
  }

  componentWillReceiveProps(props) {
    this.setState({ props });
    this.setState({ articulo: props.articulo });
    this.setState({articulos:props.articulos})
  }
 

  changeHandler(event) {
    // console.log(event.target.value);
    var nuevoarticulo = Object.assign({}, this.state.articulo);
    nuevoarticulo[event.target.name] = event.target.value;
    this.setState({articulos:this.props.articulos, articulo: nuevoarticulo });
    
}
  

  sendHandler(event) {
  
    fetch("http://localhost:8888/articulos", {
      method: "put",
      body: JSON.stringify(this.state.articulo),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this.props.articuloChange(this.state.articulo))   
      .then((res) => this.estadoInicial())
      .then(event.preventDefault());

  }

  render() {
    return (
      <Col xs="6" md="6">
        <Card>
          <CardHeader>
            <strong>Editar</strong> articulo
          </CardHeader>
          <CardBody>
            <Form className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label for="nombre">Nombre</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Completa Nombre..."
                    required
                    value={this.state.articulo.nombre}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="codigo">codigo</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="number"
                    id="codigo"
                    name="codigo"
                    placeholder="Completa codigo..."
                    required={true}
                    value={this.state.articulo.codigo}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="descripcion">descripcion</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    placeholder="Completa descripcion..."
                    required={true}
                    value={this.state.articulo.descripcion}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="cuit">Precio</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Completa precio..."
                    required={true}
                    value={this.state.articulo.precio}
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
              onClick={(e)=>this.sendHandler(e)}
            >
              <i className="fa fa-dot-circle-o"></i>Guardar cambios
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default EditarArticulo;