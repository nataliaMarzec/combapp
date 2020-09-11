import React, { Component } from 'react';
import { Button , Modal, ModalHeader,Form, FormGroup, Label, Input, ModalBody, ModalFooter } from 'reactstrap';


class ModalCrearVenta extends Component {
  constructor(props){
    super(props);
    this.state={
      modal: false,      
      nroVenta:this.props.venta != null ? this.props.venta.nroVenta: "",
      id:this.props.venta != null ? this.props.venta.id:""
    };      
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  
  handleSubmit(event) {    
    
    event.preventDefault();
    const idVenta = this.state.id;
    const parametros = JSON.stringify({
      nroVenta: this.state.nroVenta,
      
  });
  console.log(parametros);
  let url;
  let metodo;
  if(this.props.venta != null){
     url = "http://localhost:8888/ventas"+idVenta;
     metodo = "put";
  }else
    {
      url = "http://localhost:8888/ventas";
      metodo = "post";
    }
  

  fetch(url, {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          method: metodo,
          body: parametros
      }).then((response) => response.json())
      .then((responseJson) => {      
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });

      this.setState({
        modal:false      
      });    
  }

  handleChange(key) {    
    return function (e) {
      const state = {};
      state[key] = e.target.value;
      this.setState(state);
  }.bind(this);   
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  render() {
    let datosVenta = this.state;
    return (                                
         <div>              
        <Button outline color="success" onClick={this.toggle}>{this.props.buttonLabel} {this.props.texto} </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Crear Nuevo Venta</ModalHeader>                            
          <Form>
        <ModalBody>
        <FormGroup>
          <Label for="nombre">Nro venta</Label>
          <Input type="number" name="nroVenta" id="nroVenta" onChange={this.handleChange("nroVenta")} value={datosVenta.nroVenta}  />
        </FormGroup>         
        </ModalBody>
        <ModalFooter>              
            <Button type="button" color="primary"  onClick={this.handleSubmit}>Agregar</Button>{' '}
            <Button type="button" color="secondary" onClick={this.toggle} >Cancelar</Button>
          </ModalFooter>                 
      </Form>
        </Modal>
      </div>
    );
  }
}

export default ModalCrearVenta;