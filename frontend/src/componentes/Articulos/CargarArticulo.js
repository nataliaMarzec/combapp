import React from "react";
import { Button, Form, FormGroup, Label, Input,Col,ModalBody,ModalFooter,
 } from "reactstrap";

class CargarArticulo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { articulo: props.articulo, modal: false };
    this.changeHandler = this.changeHandler.bind(this);
    this.estadoInicial = this.estadoInicial.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  estadoInicial() {
    this.setState({ articulo: { nombre: "",codigo:"",descripcion: "",precio:"" } });
  }

  componentWillReceiveProps(props) {
    this.setState({ articulo: props.articulo })
    this.setState({articulos:props.articulos})
  }

  changeHandler(event) {
    var nuevoArticulo = Object.assign({}, this.state.articulo);
    nuevoArticulo[event.target.name] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ articulo: nuevoArticulo });
  }


  addHandler(event) {
    fetch("http://localhost:8888/articulos", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.articulo),
    })
      .then((res) => this.props.listadoArticulos())
      .then((res) => this.estadoInicial());
    event.preventDefault();
  }

  render() {
    return (
      <Col xs="12" md="12">
        <ModalBody>
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
                  placeholder="Completa Cuit..."
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
                  required
                  value={this.state.articulo.descripcion}
                  onChange={this.changeHandler}
                />
              </Col>
            </FormGroup>
           
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="precio">precio</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder="Completa precio..."
                  required={false}
                  value={this.state.articulo.precio}
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


  export default CargarArticulo;
