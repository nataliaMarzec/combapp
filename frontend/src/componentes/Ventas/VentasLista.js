import React, { Component } from "react";
import { Link } from "react-router-dom";
import VentaDataService from "../servicios";
import { Jumbotron, Table } from 'reactstrap';
import ModalCrearVenta from './ModalCrearVenta';
import ModalBorrarVenta from './ModalBorrarVenta';

import {
  
    Container,
    Row,
    Button,
    Modal,
    ModalHeader,
    Col,
    Card,
    CardHeader,
    CardBody,
  } from "reactstrap";

class VentasLista extends Component {
  constructor(props) {
      super(props);
      this.state = {
        ventas : [],
        venta:{}
      };
      
    }
  
  componentWillMount(){
      return fetch(`http://localhost:8888/ventas`,{
        method: 'GET',  
      })
      .then((response) => response.json())
      .then((responseJson) => {      
        this.setState({
          ventas : responseJson
        });    
      })
      .catch((error) => {
        console.error(error);
      });
    } 
    render() {
      let ventas = this.state.ventas;
      return (               
          <main>        
           <Jumbotron>         
             <ModalCrearVenta texto={"Crear venta"}/>
             <h5>Lista de ventas</h5>
           <Table hover bordered striped>
          <thead>
            <tr>            
              <th>nroVenta</th>
              
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta,key) => {               
              return (<tr key={key}>
                <td >{venta.nroVenta}</td>
                <td>
                  <ModalCrearVenta texto={"Editar"} venta={venta}/>
                  <ModalBorrarVenta texto={"Eliminar"} venta={venta}/> 
                  </td>
              </tr>)
            })}
            
  
          </tbody>
        </Table>
        </Jumbotron>
          </main>    
      );
    }
  }
  
  export default VentasLista;
  