// import React, { useEffect, useState } from "react";
import DeleteButtonSub from "./DeleteButtonSub";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const SubFiltrada = (props) => {

  if (props.list === null) return (
    <p>Sin resultados</p>
  );

  return (

    <div>
      <div style={{clear: "both", display: "table", height: "20px" }} ></div>
    <div>
    <h2 style={{ textAlign: "left" }}>Resultado de búsquedas</h2>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Departamento</th>
        </tr>
      </thead>
      <tbody>
        {
          props.list ?
          props.list.map(d =>
              <tr key={d.id} >
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.typeDep}</td>
                <td>
                  <Link to='/subject/edit'
                    className="btn btn-primary"
                  style={{ textDecoration: 'none' }}>Editar</Link>
                </td>
                <td>
                <Button onClick={(e) => DeleteButtonSub(e)} >Borrar</Button>
                </td>
              </tr>)
            :
            (
              <tr>
                <td>Utilice los campos para filtrar la búsqueda.</td>
              </tr>
            )
          }
      </tbody>
    </Table>
    </div>
    </div>

  )
}

export default SubFiltrada