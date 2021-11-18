// import React, { useEffect, useState } from "react";
import DeleteButton from "../STUDENT/DeleteButton";
import { Link } from "react-router-dom";
import getFormattedDate from "../getFormattedDate"
import { Table, Button } from "react-bootstrap";

const StudentFiltrada = (props) => {

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
          <th>Apellido</th>
          <th>DNI</th>
          <th>Fecha de nacimiento</th>
        </tr>
      </thead>
      <tbody>
        {
          props.list ?
          props.list.map(d =>
              <tr key={d.id} >
                <td>{d.id}</td>
                <td>{d.firstName}</td>
                <td>{d.lastName}</td>
                <td>{d.dni}</td>
                <td>{ getFormattedDate(new Date(d.birthDate))}</td>
                <td>
                  <Link to='/student/edit'
                   state={{ from: d   }}
                    className="btn btn-primary"
                  style={{ textDecoration: 'none' }}>Editar</Link>
                </td>
                <td>
                <Button onClick={(e) => DeleteButton(e)} >Borrar</Button>
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

export default StudentFiltrada