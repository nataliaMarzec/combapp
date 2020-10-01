import React from 'react';
import {Col, Button,FormGroup} from 'reactstrap';
var moment = require('moment');




class RowFarmacia extends React.Component {

    constructor(props) {
        super(props);
        this.selectVenta = this.selectVenta.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {venta:props.venta};
        this.actualizar = this.actualizar.bind(this);
        this.estadoInicial=this.estadoInicial.bind(this);
    }
    
    selectVenta() {
        this.props.selector(this.props.venta)
    }

    actualizar() {
        this.props.actualizarList(this.props.venta)
    }
    estadoInicial(){
      this.setState({ venta: { nroVenta: "",saldoCobrado:"",facturado:true,deTurno: true, fechas:[]} });
    }
   
    handleSubmit(id) {
        fetch("http://localhost:8888/ventas/" +id, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }).then(this.estadoInicial)
            .then(this.actualizar);

      }
    render() {      
        return(
            <tr key={this.props.venta.id} onClick={this.selectVenta}>
              <td>{this.props.venta.nroVenta}</td>
              <td>{this.props.venta.saldoCobrado}</td>
              <td>{this.props.venta.fechas}</td>
              <td>
              <FormGroup check row>
              <Col sm={{ size: 1, offset: 2 }}>
              <Button  onClick={() => {
                      this.handleSubmit(this.props.venta.id);
                    }} outline color="info" >Eliminar</Button>
              </Col>
              </FormGroup>
              
             </td>

          </tr>)
       }
 
}

  export default RowFarmacia