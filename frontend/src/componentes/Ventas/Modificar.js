import React from 'react';
import Select from 'react-select'
import {FormGroup,FormText} from 'reactstrap';
import TodoForm from "./TodoForm";
import Todo from './Todo';
var moment = require('moment');


class Modificar extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.listaDeFechaNueva = this.listaDeFechaNueva.bind(this);
        this.addTodo=this.addTodo.bind(this);
        
        this.state = {
          venta:props.venta,
          ver:true,
          selectedOption: "",
          options:null,
          todos:[],
          fecha:"",
          listaFecha:[],
          venta:props.venta};
        this.estadoInicial = this.estadoInicial.bind(this);
        this.setFechas = this.setFechas.bind(this);
      }
      

      componentWillReceiveProps(props) {
          this.setState({venta: props.venta},console.log("state",this.state))
      }
      
      modificarFecha=(event)=>{
          this.setState({options:this.state.venta.fechas.map(function(f){
            const data =moment(f).format('DD-MM-YYYY')
            const data2 = {label:data};
            return data2;
            })
          })
          this.setState({ver:false})
          event.preventDefault();
        }
      

      handleChange(event) {
        const target = event.target;
        var nuevaVenta = Object.assign({}, this.state.venta);
        nuevaVenta[event.target.name] = target.value;
        this.setState({venta: nuevaVenta});
      }
      setFechas(dates) { 
        console.log(dates);
        var nuevaVenta = Object.assign({}, this.state.venta);
        nuevaVenta["fechas"] = dates
        this.setState({venta:nuevaVenta},this.editarVenta);

      } 
      estadoInicial(){
        this.setState({ venta: { nroVenta: "", saldoCobrado:"",fecha:"",fechas:[]} });
        this.setState(
          {
            selectedOption: "",
            options:null,
            todos:[],
            fecha:"",
            listaFecha:[]
          })

      }
      listaDeFechaNueva=()=>{
        let nuevaFecha = this.state.venta.fecha;
        console.log("nuevaFecha",nuevaFecha)
        console.log("listaNuevaState",this.state)
        
        let fechasVentas = this.state.options.map(function(f){
                                return f.label
                            })
        fechasVentas.push(nuevaFecha)
        console.log("lista",fechasVentas)
        this.setFechas(fechasVentas);

      }
      listo = () => {
        let text =  this.state.todos.map(function(saldocob){return saldocob.text});
        console.log("listas",this.state.todos);
        console.log("text",text);
        var {venta} = this.state;
        venta.fechas = text;
        this.setState(
          {saldoCobrado: venta},
          console.log(this.state.venta)
          );
        
      }
      handleSubmit =(event)=> {
        if (this.state.venta.id) {
          this.listaDeFechaNueva();
        } else {
          this.listo()
          this.agregarVenta();
        }
        event.preventDefault();
      }
      editarVenta =()=> {
        fetch('http://localhost:8888/ventas', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.venta)
        }).then(res => this.props.ventaChange(this.state.venta))
          .then(this.estadoInicial);

      }
      agregarVenta() {
        console.log("venta",this.state)
        fetch(`http://localhost:8888/ventas`, {
      method: "POST",
      body: JSON.stringify(this.state.venta),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
        }).then(res => this.props.listado())
          .then(this.estadoInicial);
      }

      removeItemFromArr ( arr, item ) {
        var i = arr.indexOf( item );
        arr.splice( i, 1 );
      }
      handleChange2 = selectedOption => {
        this.setState({selectedOption},this.removeItemFromArr(this.state.options,this.state.selectedOption));
        console.log("state",this.state);
      };
      nuevaFecha= event =>{
        let value = event.target.value
        console.log("event",value)
        this.setState({fecha:value},console.log("nuevaFecha",this.state.venta.fecha))
      }
      addTodo = todo => {
        this.setState({
          todos: [todo, ...this.state.todos]
        });
      };
      render() {
        const { selectedOption } = this.state;
        let todos = [];
        return (
          <form class="margen-superior">
           <FormGroup>
            <label for="nroVenta">nroVenta</label>
            <input type="number" name="nroVenta" size="10" placeholder="nroVenta" value={this.state.venta.nroVenta} onChange={this.handleChange}/>
           </FormGroup>

          <div >
          {this.state.ver === true ? (
            <div>
            <TodoForm onSubmit={this.addTodo}/>
              {todos.map(todo => (
                <Todo 
                  key={todo.id}
                  toggleComplete={() => this.toggleComplete(todo.id)} 
                  onDelete = {() => this.handleDeleteTodo(todo.id)}
                  todo={todo}
                />
              ))}
            <div>
              Total:{this.state.todos.filter(todo => !todo.complete).length}
            </div>
          </div>
          ): false}    
          </div>    
          <div> 
           <div class="row align-items-start" > {this.state.ver === false ? (
            <div class="col-4">
             <Select
              type="date"
              placeholder = {"SelectFecha"}
              value={selectedOption}
              onChange={this.handleChange2}
              options={
                this.state.options
              }
             />
           <input type="text" value={this.state.selectedOption.label}/>
           <input type="date" 
                    placeholder="Fecha"
                    name="fecha"
                    value={this.state.fecha} 
                    onChange={this.nuevaFecha}
                    />
            </div>
          ): true}
          </div>
          </div>
            
            <button style={ {margin :"5px"}} onClick={this.handleSubmit}>Guardar</button>
          </form>
        );
      }
     
    
}

  export default Modificar