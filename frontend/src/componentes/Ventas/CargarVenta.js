import React from "react";
import { Button, Form,FormGroup, Label, Input,Col,ModalBody,ModalFooter,Card,CardHeader,CardBody,CardFooter
 } from "reactstrap";

class CargarVenta extends React.Component {

  constructor(props) {
    super(props);
    this.state = { venta: props.venta, modal: false };
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
      venta: {
        nroVenta: "",
        fecha: "",
        facturado: false,
        saldoCobrado: "",
        montoSinCobrar: "",
        tipoDePago: "",
        fechas: [],
        selectedOption: "",
        options: null,
        todos: [],
        listaFecha: [],
      },
    });
  }
  
  componentWillReceiveProps(props) {
    this.setState({ venta: props.venta })
    this.setState({ventas:props.ventas})
  }

  changeHandler(event) {
    var nuevaVenta = Object.assign({}, this.state.venta);
    nuevaVenta[event.target.name] =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ venta: nuevaVenta });
  }


  addHandler(event) {
    fetch("http://localhost:8888{ventas", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.venta),
    })
      .then((res) => this.props.listadoVentas())
      .then((res) => this.estadoInicial());
    event.preventDefault();
  }

  render() {
    const { selectedOption } = this.state;
    let todos = [];
    return (
      <Col xs="6" md="6">
        <Card>
          <CardHeader> 
            <strong>Venta</strong>Completar planilla
          </CardHeader>
          <CardBody>
            <Form className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label for="nroVenta">nroVenta</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="number"
                    id="nroVenta"
                    name="nroVenta"
                    placeholder="Completa nroVenta..."
                    required
                    value={this.state.venta.nroVenta}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="fecha">fecha</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="fecha"
                    name="fecha"
                    placeholder="Completa Email..."
                    required={false}
                    value={this.state.venta.fecha}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="facturado">facturado</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="facturado"
                    name="facturado"
                    placeholder="Completa fecha..."
                    required={false}
                    value={this.state.venta.facturado }
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="saldoCobrado">saldoCobrado</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="number"
                    id="saldoCobrado"
                    name="saldoCobrado"
                    placeholder="Completa saldoCobrado..."
                    required={false}
                    value={this.state.venta.saldoCobrado}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="montoSinCobrar">montoSinCobrar</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="number"
                    id="montoSinCobrar"
                    name="montoSinCobrar"
                    placeholder="Completa montoSinCobrar..."
                    required={false}
                    value={this.state.venta.montoSinCobrar}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label for="tipoDePago">tipoDePago</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="tipoDePago"
                    name="tipoDePago"
                    placeholder="Completa tipoDePago..."
                    required={true}
                    value={this.state.venta.tipoDePago}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>

            </Form>
          </CardBody>
          <CardFooter>
            {/* <Button
              type="submit"
              size="sm"
              color="primary"
              onClick={(e) => this.sendHandler(e)}
            >
              <i className="fa fa-dot-circle-o"></i>Guardar cambios
            </Button> */}
            {/* <Button style={{ margin: "5px" }} onClick={this.handleSubmit}> */}
              

            {/* </Button> */}
          
          </CardFooter>
        </Card>
      </Col>
    );
  }
}



  export default CargarVenta;
