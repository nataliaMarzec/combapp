import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      usuario: "",
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  componentWillMount() {
    fetch("http://localhost:8888/usuarios/existeusuarioensesion", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.success) {
          this.setState({
            usuario: responseJson.usuario[0],
          });
        } else console.log("redirect login");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // <HashRouter>
  //     <React.Suspense fallback={loading}>
  //       <Switch>
  //         <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
  //       </Switch>
  //     </React.Suspense>
  // </HashRouter>

  render() {
    return (

        <Navbar color="dark" light expand="md">
          <NavbarBrand style={navItems} tag={Link} to="/Home">
            Gestión para comercios
          </NavbarBrand>
          {usuario != "" ? (
            <h5>
              hola {usuario.nombre} {usuario.apellido}{" "}
            </h5>
          ) : (
            ""
          )}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <HashRouter>
              <React.Suspense fallback={loading}>
                <Switch>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                    <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
                      
                    </NavItem>
                  </Nav>
                </Switch>
              </React.Suspense>
            </HashRouter>
          </Collapse>
        </Navbar>
    
    );
  }
}

export default App;
