import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { Form, Button, Table } from "react-bootstrap";
import getFormattedDate from "../getFormattedDate";
import unassignTeacherToClass from "../unassignTeacherToClass";
import unassignCoordinator from "../unassignCoordinator";
import validateStudentCreate from "../validateStudentCreate";


function EditButtonPro() {
    const location = useLocation()
    const { from } = location.state;
    const url = "http://localhost:8080/bahut/v1/professor/" + from;

       const [data, setData] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        birthDate: ""
    })

    const [bo, setBo] = useState({
        headOfDepartment: false
    })

    useEffect(()=>{
        const callApi = async () => {
        const res = await axios.get(url);
        setData(res.data)
    }
    callApi()
}, [url])

    function handleData(e) {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        // console.log(data)
    }

    function handleDataBoolean() {

        if (bo === true) {
            setBo(false)
        } else {
            setBo(true)
        };

        // console.log(bo)
    }


    function submitEdit(e) {

        e.preventDefault();

        let val = validateStudentCreate(data);
        if (val === false) return;

        const url = "http://localhost:8080/bahut/v1/professor/update/" + from;

        const api = axios.create({
            baseURL: url
        })

        api.put(url,
            {
                firstName: data.firstName,
                lastName: data.lastName,
                dni: data.dni,
                birthDate: data.birthDate,
                headOfDepartment: bo.headOfDepartment
            }
        )
            .then(res => {
                // console.log(res.data)
                // console.log("data modified")
            }).catch((err) => {
                console.log("error generated")
                console.log(err);
            });
    }

  
    return (

        <div>

            <div style={{ width: "50%", margin: "auto" }} >
                <h2 style={{ margin: "30px", textAlign: "center" }}>EDITAR PROFESSOR</h2>
                <Form onSubmit={(e) => submitEdit(e)} className="formpProdit" id="formProEdit" >

                    <Form.Group className="mb-3" >
                    <Form.Label >Nombre</Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="firstName" value={data.firstName} type="text" name="firstName" size="35" placeholder="Nombre" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label >Apellido</Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="lastName" value={data.lastName} type="text" name="lastName" size="35" placeholder="Apellido" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label >DNI</Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="dni" value={data.dni} type="text" name="dni" size="9" placeholder="DNI" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label >Fecha de nacimiento : <strong> {getFormattedDate(new Date(data.birthDate))} </strong> </Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="birthDate" value={data.birthDate} type="date" name="birthDate" placeholder="Fecha de nacimiento" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Check id="bcPro" onClick={(e) => handleDataBoolean(e)} label="jefe de departamento" />
                    </Form.Group>

                    <Button type="submit" >Registrar</Button>
                    <Link to='/professor'
                        className="btn btn-primary"
                        style={{ textDecoration: 'none', marginLeft: "30px" }}>Cancelar</Link>

                </Form>

                <div id="error" style={{ fontWeight: "bold", margin: "15px", color: "red" }} ></div>

                <div style={{ margin: "15px", width: "60vw"}} >

                    <Link to='/professor/edit/more'
                        state={{ from: from }}
                        className="btn btn-primary"
                        style={{ textDecoration: 'none', marginLeft: "20px" }}>Asignar asignaturas</Link>

                    <Link to='/professor/edit/coordinator'
                        state={{ from: from }}
                        className="btn btn-primary"
                        style={{ textDecoration: 'none', marginLeft: "20px" }}>Asignar como coordinador</Link>

                </div>

                      

            </div>

            <div>
                <h2 style={{ margin: "30px" }}>Coordina estas materias</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Departamento</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.headOfList  ?
                                data.headOfList.map(d =>
                                    <tr id={d.id} key={d.id} >
                                        <td>{d.id}</td>
                                        <td>{d.name}</td>
                                        <td>{d.typeDep}</td>
                                        <td>  <Button onClick={(e) => unassignCoordinator(e, d.id)}  >
                                            Desasignar</Button>  </td>
                                    </tr>)
                                :
                                (
                                    <tr>
                                        <td>No tiene asignaturas asignadas</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </Table>
            </div>

            <div>
                <h2 style={{ margin: "30px" }}>Imparte estas materias</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Departamento</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.subjectList   ?
                                data.subjectList.map(d =>
                                    <tr id={d.id} key={d.id} >
                                        <td>{d.id}</td>
                                        <td>{d.name}</td>
                                        <td>{d.typeDep}</td>
                                        <td>  <Button onClick={(e) => unassignTeacherToClass(e, d.id, from)}  >
                                            Desasignar</Button>  </td>
                                    </tr>)
                                :
                                (
                                    <tr>
                                        <td>No tiene asignaturas asignadas</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </Table>
            </div>



        </div>
    )
}

export default EditButtonPro;