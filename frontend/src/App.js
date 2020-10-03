import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import {Link} from 'react-context-router'
import "./scss/style.scss";
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

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
    fetch("http://localhost:8888/usuarios/id", {
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
    // const {usuario}=this.state
    const { logging } = this.state;
    return (
      //     <Navbar color="dark" light expand="md">
      //       <NavbarBrand  tag={Link} to="/Home">
      //         Combapp
      //       </NavbarBrand>
      //       {usuario != "" ? (
      //         <h5>
      //           hola {usuario.username} {usuario.password}{" "}
      //         </h5>
      //       ) : (
      //         ""
      //       )}
      //       <NavbarToggler onClick={this.toggle} />
      //       <Collapse isOpen={this.state.isOpen} navbar>

      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Route
                  path="/"
                  name="Home"
                  render={(props) => <TheLayout {...props} />}
                />
              </NavItem>
              {/* {this.state.isLogging === true ? (
                <div>
                  <li class="nav-item">
                    <a class="nav-link" href="/clientes">
                      Clientes
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/profile">
                      Perfil
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/logout">
                      Logout
                    </a>
                  </li>
                </div>
              ) : (
                false
              )}
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="/register"
                  data-register={{ register }}
                >
                  Register
                </a>
              </li> */}
            </Nav>
          </Switch>
        </React.Suspense>
      </HashRouter>
      //   </Collapse>
      // </Navbar>
    );
  }
}

export default App;
