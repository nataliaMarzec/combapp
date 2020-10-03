import React, { useState, useMemo, useCallback } from "react";
import Articulo from "./Articulo";
import CargarArticulo from "./CargarArticulo";
import EditarArticulo from "./EditarArticulo";
import {
  Table,
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
import DataListInput from "react-datalist-input";

class ArticulosLista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articulos: [],
      seleccionado: {},
      articulo: {},
      articuloSeleccionado: {},
      onSelectDataList: false,
      modalDataList: false,
    };
    this.selectArticulo = this.selectArticulo.bind(this);
    this.articuloChangeHandler = this.articuloChangeHandler.bind(this);
    this.listadoArticulos = this.listadoArticulos.bind(this);
    this.updateLista = this.updateLista.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleDataList = this.toggleDataList.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleDataList() {
    this.onSelect();
    this.setState({
      modalDataList: !this.state.modalDataList,
    });
  }

  componentWillMount() {
    fetch(`http://localhost:8888/articulos`)
      .then((res) => res.json())
      .then((articulos) => this.setState({ articulos: articulos }));
  }

  onSubmitDataList(unArticulo) {
    this.onSelect(unArticulo);
    if (this.state.onSelectDataList == true) {
      console.log("articuloSeleccionado__");
      return (
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleDataList}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleDataList}>
            <strong>Nuevo</strong>Articulo
          </ModalHeader>

          <CargarArticulo
            articulo={this.state.articuloSeleccionado}
            articuloChanged={this.articulosDataListInputChangeHandler}
            updateLista={this.updateLista}
          />
        </Modal>
      );
    } else {
      console.log("sin articulo seleccionado__");
    }
  }

  onSelect = (articulo) => {
    this.setState({ articuloSeleccionado: articulo, onSelectDataList: true });
  };

  ArticulosDataListInput = () => {
    const [articulo, setItem] = useState();
    const onSelect = useCallback((articulo) => {
      console.log("articuloSeleccionado___", this.onSelect(articulo));
    }, []);

    const items = useMemo(
      () =>
        this.state.articulos.map((articulo) => ({
          label: articulo.nombre,
          key: articulo.id,
          someAdditionalValue: articulo.precio,
          ...articulo,
        })),
      console.log("articulos", [items])
    );

    return (
      <div className="container">
        <DataListInput
          placeholder="Seleciona un articulo..."
          item={articulo}
          items={items}
          onSelect={onSelect}
          articuloChange={this.articulosDataListInputChangeHandler.bind(this)}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <Row>&nbsp;</Row>
        <Container fluid>
          <EditarArticulo
            articulo={this.state.seleccionado}
            articuloChange={this.articuloChangeHandler}
            listadoArticulos={this.listadoArticulos}
            updateLista={this.updateLista}
          />

          <this.ArticulosDataListInput
            color="info"
            onClick={this.toggleDataList}
          ></this.ArticulosDataListInput>

          <br></br>
          <br></br>

          <Button color="success" onClick={this.toggle}>
            Nuevo Articulo
          </Button>

          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>
              <strong>Nuevo</strong>Articulo
            </ModalHeader>

            <CargarArticulo
              articulo={this.state.seleccionado}
              articuloChanged={this.articuloChangeHandler}
              listadoArticulos={this.listadoArticulos}
              updateLista={this.updateLista}
            />
          </Modal>

          <Row>&nbsp;</Row>
        </Container>

        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> articulos Lista
                </CardHeader>
                <CardBody>
                  <Table responsive bordered size="sm">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>codigo</th>
                        <th>descripcion</th>
                        <th>precio</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
  listadoArticulos() {
    this.componentWillMount();
  }

  updateLista(unArticulo) {
    var updateArticulo = this.state.articulos.filter(
      (item) => unArticulo.id !== item.id
    );
    this.setState({ articulos: updateArticulo });
  }

  selectArticulo(unArticulo) {
    this.setState({ seleccionado: unArticulo });
  }

  articuloChangeHandler(unArticulo) {
    var nuevaLista = this.state.articulos.map((item) =>
      item.id !== unArticulo.id ? item : unArticulo
    );
    this.setState({ articulos: nuevaLista, seleccionado: unArticulo });
  }
  articulosDataListInputChangeHandler(unArticulo) {
    var nuevaLista = this.state.articulos.map((item) =>
      item.id !== unArticulo.id ? item : unArticulo
    );
    this.setState({ articuloSeleccionado: unArticulo });
  }

  deleteArticulo(id) {
    this.props.onDelete(id);
  }

  renderRows() {
    return this.state.articulos.map((unArticulo, index) => {
      return (
        <Articulo
          articulo={unArticulo}
          selector={this.selectArticulo}
          updateLista={this.updateLista}
          articuloChangedHandler={this.articuloChangeHandler}
          onDelete={this.deleteArticulo.bind(this)}
        />
      );
    });
  }
}

export default ArticulosLista;
