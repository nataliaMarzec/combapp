import React, { Component } from "react";
import Select from "react-select";
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
var moment = require("moment");

class EditarVenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ventas: props.ventas,
      venta: props.venta != null ? this.props.venta : {},
      fechas: props.fechas,
      pagos: props.pagos,
      selectedOption: "",
      options: null,
      todos: [],
      fecha: "",
      listaFecha: [],
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.estadoInicial=this.estadoInicial.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }
  componentWillReceiveProps(props) {
    this.setState({ props });
    this.setState({ venta: props.venta }, console.log("state", this.state));
    this.setState({ ventas: props.ventas }, console.log("state", this.state));
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

  handleSubmit = (event) => {
    if (this.state.venta.id!==null) {
    this.editarVenta();
    } else {
      this.agregarVenta();
    }
    event.preventDefault();
  };

  agregarVenta() {
    console.log("venta", this.state);
    fetch(`http://localhost:8888/ventas`, {
      method: "POST",
      body: JSON.stringify(this.state.venta),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this.props.listadoVentas())
      .then(this.estadoInicial);
  }

  editarVenta = () => {
    fetch("http://localhost:8888/ventas", {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.venta),
    })
      .then((res) => this.props.ventaChange(this.state.venta))
      .then(this.estadoInicial);
  };

  

  setFechas(dates) {
    console.log(dates);
    var nuevaVenta = Object.assign({}, this.state.venta);
    nuevaVenta["fechas"] = dates;
    this.setState({ venta: nuevaVenta }, this.editarVenta);
  }

  changeHandler(event) {
    // console.log(event.target.value);
    var nuevaVenta = Object.assign({}, this.state.venta);
    nuevaVenta[event.target.name] = event.target.value;
    this.setState({ venta: nuevaVenta });
  
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
          <div class="row align-items-start">
            {" "}
            {this.state.ver === false ? (
              <div class="col-4">
                <Select
                  type="date"
                  placeholder={"SelectFecha"}
                  value={selectedOption}
                  onChange={this.handleChange2}
                  options={this.state.options}
                />
                <Input type="text" value={this.state.selectedOption.label} />
                <Input
                  type="date"
                  placeholder="Fecha"
                  name="fecha"
                  value={this.state.fecha}
                  onChange={this.nuevaFecha}
                />
              </div>
            ) : (
              true
            )}
          </div>
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

            <Button style={{ margin: "5px" }} onClick={this.handleSubmit}>
              Guardar
            </Button>
            <Button style={{ margin: "5px" }} onClick={this.modificarFecha}>
              EditarFecha
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default EditarVenta;

