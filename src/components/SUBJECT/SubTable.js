import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table} from "react-bootstrap";
import Pagination from "../Pagination";
import TbodyTable from "./TbodyTable";

const SubTable = () => {

  const url = "http://localhost:8080/bahut/v1/subject/all";

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

  const paginate = ( pageNumber) => {
      setCurrentPage(pageNumber);
  }

  return (
    <div>


      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Coordinador</th>
          </tr>
        </thead>

        <TbodyTable  currentData={currentData} ></TbodyTable>

      </Table>
      <Pagination
        postsPerPage={dataPerPage}
        totalPosts={data.length}
        paginate={paginate}
      ></Pagination>

    </div>
  )
}

export default SubTable