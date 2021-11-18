import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from 'react-router-dom';
import { Table, Button } from "react-bootstrap";
import setAsCoodinator from "../setAsCoordinator";

function EditCoordAdd() {

    const location = useLocation()
    const { from } = location.state;

    const url = "http://localhost:8080/bahut/v1/subject/all";

    const urlStu = async () => {

        const api = axios.create({
            baseURL: url
        })

        api.get().then(res => {
            setData(res.data)
        })
    }

    const [data, setData] = useState([])

    useEffect(() => {
        urlStu()
    }, [])

    let arrId = [];

    function addToList(e) {
        const id = e.target.parentNode.firstChild.innerHTML;

        if (arrId.indexOf(id) !== -1) {
            arrId.splice(arrId.indexOf(id), 1);
            let idRidColor = document.getElementById(id);
            idRidColor.style.cssText = 'background-color:white';
        } else {
            arrId.push(id)
        }

        function setStyle(ids) {
            let idSelected = document.getElementById(ids);
            idSelected.style.cssText = 'background-color:grey';
        }

        if (arrId.length >= 0) {
            arrId.forEach(e => setStyle(e))
        }
    }

  


    return (
        <div>
            <h4 style={{ margin: "30px" }}>ESTABLECER COMO COORDINADOR A :  {from} </h4>
            <Button onClick={()=> setAsCoodinator( arrId, from ) } >Establecer como coordinador</Button>

            <Link to='/professor/edit'
                    className="btn btn-primary"
                    state={{ from: from }}
                    style={{ textDecoration: 'none', marginLeft: "30px" }}
                  >Cancelar</Link>
                  
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Departamento</th>
                        <th>Coordinador</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                            data.map(d =>
                                <tr id={d.id} key={d.id} onClick={(e) => addToList(e)}  >
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.typeDep}</td>
                                    <td>{d.coordinator !== null ? d.coordinator.lastName + ", " + d.coordinator.firstName : "Sin asignar"}</td>
                                </tr>)
                            :
                            (
                                <tr>
                                    <td>No es coordinador</td>
                                </tr>
                            )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default EditCoordAdd