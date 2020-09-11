import React, { Component } from 'react';
import { Button , Modal, ModalHeader,Form, FormGroup, Label, Input, FormText, ModalBody, ModalFooter } from 'reactstrap';


class ModalBorrarVenta extends Component {
  constructor(props){
    super(props);
    this.state={
      modal: false,            
      id:this.props.venta.id
    };      
    this.toggle = this.toggle.bind(this);   
    this.handleSubmit = this.handleSubmit.bind(this);    
  }
  
  handleSubmit(event) {    
    
    event.preventDefault();
    const idVenta = this.state.id;         
    let url = "http://localhost:8888/ventas"+idVenta;
    let metodo = "DELETE";    
  fetch(url, {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          method: metodo,          
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

  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  render() {  
    return (                                
         <div>              
        <Button outline color="danger" onClick={this.toggle}>{this.props.buttonLabel} {this.props.texto} </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Ventas</ModalHeader>                                  
        <ModalBody>
                  <h3>¿Desea borrar la venta ?</h3>
        </ModalBody>
        <ModalFooter>              
            <Button type="button" color="primary"  onClick={this.handleSubmit}>Agregar</Button>{' '}
            <Button type="button" color="secondary" onClick={this.toggle} >Cancelar</Button>
          </ModalFooter>                       
        </Modal>
      </div>
    );
  }
}

export default ModalBorrarVenta;
