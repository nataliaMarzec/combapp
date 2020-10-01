import React from 'react';
import RowVentaFecha from './RowVentaFecha';
var addZero = require('add-zero');
 

class VentaFecha extends React.Component {

    constructor(props) {
      super(props);
      this.state = { 
         ventas: [],
         selected:{},
         fecha:""
        }
      this.fetchData = this.fetchData.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    hoyFecha(){
      var hoy = new Date();
          var dd = hoy.getDate();
          var mm = hoy.getMonth()+1;
          var yyyy = hoy.getFullYear();
          
          dd = addZero(dd);
          mm = addZero(mm);
   
          console.log("fecha",yyyy+'-'+mm+'-'+dd)
          return yyyy+'-'+mm+'-'+dd;

  }
    componentWillMount() {
      this.fetchData()
    }
    handleChange(e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;
      this.setState({[name]:value});
    }
  
    fetchData(consulta) {
      console.log("2.consulta: ",consulta);
      console.log("fecha: ", this.state.fecha);

      if(consulta != null){
        fetch(`http://localhost:8888/ventas?fecha=`+consulta)
          .then( res => res.json())
          .then( ventas => this.setState({ventas:ventas}));
      }
      if(consulta == null){
        let fecha = ''+this.hoyFecha()+'';
        fetch(`http://localhost:8888/ventas?fecha=`+fecha)
          .then( res => res.json())
          .then( ventas => this.setState({ventas:ventas}));
      }
    }
    handleSubmit(event) {
      var consulta
      if(this.state.nombre === ""){
        this.fetchData(consulta);
      }
      if(this.state.fecha !== "" ){ 
        
        consulta = this.state.fecha;
        console.log("consulta",consulta)
        this.fetchData(consulta);
      }
      event.preventDefault();
    }
  
  
  

    render() {
        return(
          <div className="fechasCSS">
              <h2>{this.props.titulo}</h2>
          <div>
          <form>
            <label>Fecha</label>
            <input  type= "date" name="fecha" value={this.state.fecha}  onChange={this.handleChange} />
            <button type="button" onClick={this.handleSubmit}>Consultar</button>
          </form>

          </div>
          <table className="table">
            <thead>
              <tr>
                 <th>NroVenta</th>
                 <th>SaldoCobrado</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </div>)
      }
    
    
    renderHeaders(columns) {
      return columns.map((col) => {
        return (
            <th>{col}</th>
        );
      })
    }

    renderRows() {
      return this.state.ventas.map((unaVenta) => {
        return (
          <RowVentaFecha
          venta={unaVenta} 
          />
        );
      })
    }
  }



  export default VentaFecha