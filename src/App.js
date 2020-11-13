import React from 'react';
import logo from './logo.svg';
import './App.css';
import './dist/css/bootstrap.min.css';
import {CardHeader, Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { Id: 1, Nombre: "Elvis", Número: 8296957920 }
];

class App extends React.Component{
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      Id: "",
      Nombre: "",
      Número: "",
    },
  };

  mostrarModalActualizar = (elemento) => {
    this.setState({
      form: elemento,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (elemento) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if(elemento.Id == registro.Id) {
        arreglo[contador].Nombre = elemento.Nombre;
        arreglo[contador].Número = elemento.Número;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (elemento) => {
    var opcion = window.confirm("Estás seguro que deseas eliminar el elmento " + elemento.Id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (elemento.Id == registro.Id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.Id = this.state.data.length+1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render(){
    return (
      <>
      <Container>
        <CardHeader tag="h1">Agenda de contactos</CardHeader>
        <br />
        <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Agregar contacto</Button>
        <br /><br />

        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Número</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((elemento)=>(
              <tr>
                <td>{elemento.Id}</td>
                <td>{elemento.Nombre}</td>
                <td>{elemento.Número}</td>
                <td>
                  <Button color="primary" onClick={()=>this.mostrarModalActualizar(elemento)}>Editar</Button>{"  "}
                  <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={this.state.modalActualizar}>
        <ModalHeader>
          <div>
            <h3>Editar registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id: </label>
            <input className="form-control" readOnly type="text" value={this.state.form.Id}/>
          </FormGroup>

          <FormGroup>
            <label>Nombre: </label>
            <input className="form-control" name="Nombre" type="text" onChange={this.handleChange} value={this.state.form.Nombre}/>
          </FormGroup>

          <FormGroup>
            <label>Número: </label>
            <input className="form-control" name="Número" type="text" onChange={this.handleChange} value={this.state.form.Número}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
          <Button color="danger" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Agregar contacto</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id: </label>
            <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
          </FormGroup>

          <FormGroup>
            <label>Nombre: </label>
            <input className="form-control" name="Nombre" type="text" onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup>
            <label>Número: </label>
            <input className="form-control" name="Número" type="text" onChange={this.handleChange}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => this.insertar()}>Agregar</Button>
          <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      </>
    );
  }
}

export default App;
