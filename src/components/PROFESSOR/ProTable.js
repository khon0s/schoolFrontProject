
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import getFormattedDate from "../getFormattedDate";
import { Table, Button } from "react-bootstrap";
import DeleteButtonPro from "./DeleteButtonPro";
import Pagination from "../Pagination";

const ProTable = () => {
  
  const url = "http://localhost:8080/bahut/v1/professor/all";
  
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get(url);
      // console.log(res.data)
      setData(res.data)
    }
    callApi()
  }, [url])

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
<div>

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
          currentData.length > 0  ?
          currentData.map(d =>
              <tr key={d.id} >
                <td>{d.id}</td>
                <td>{d.firstName}</td>
                <td>{d.lastName}</td>
                <td>{d.dni}</td>
                <td>{getFormattedDate(new Date(d.birthDate))}</td>
                <td>

                  <Link to='/professor/edit'
                   className="btn btn-primary"
                    state={{ from: d.id }}
                    >Editar</Link>
                </td>
                <td>
                  <Button onClick={(e) => DeleteButtonPro(e)}>Borrar</Button>
                </td>
              </tr>)
            :
            (
              <tr>
                <td>No hay profesores registrados</td>
              </tr>
            )
          }
      </tbody>
    </Table>


      <Pagination
        postsPerPage={dataPerPage}
        totalPosts={data.length}
        paginate={paginate}
      ></Pagination>
    
          </div>
  )
}

export default ProTable;
