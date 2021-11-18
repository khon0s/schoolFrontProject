import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { Form, Button, Table } from "react-bootstrap";
import desEnrollStudent from "../desEnrollStudent";
import getFormattedDate from "../getFormattedDate";
import validateStudentCreate from "../validateStudentCreate";

function EditButton() {
    const location = useLocation()
    const { from } = location.state;
    const url = "http://localhost:8080/bahut/v1/student/" + from;

    const [data, setData] = useState({

        firstName: "",
        lastName: "",
        dni: "",
        birthDate: "",
        avrScore: parseInt("0"),

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

    function submitEdit(e) {

        e.preventDefault();

        let val = validateStudentCreate(data);
        if (val === false) return;

        const url = "http://localhost:8080/bahut/v1/student/update/" + from;

        const api = axios.create({
            baseURL: url
        })

        api.put(url,
            {
                firstName: data.firstName,
                lastName: data.lastName,
                dni: data.dni,
                birthDate: data.birthDate,
                avrScore: data.avrScore,
            }
        )
            .then(res => {
                // console.log(res.data)
                // console.log("data modified")
            }).catch((err) => {
                console.log(err);
            });
    }

 
    return (

        <div>


            <div style={{ width: "50%", margin: "auto", textAlign: "center" }} >
                <h2 style={{ margin: "30px" }}>EDITAR ALUMNO</h2>
                <Form onSubmit={(e) => submitEdit(e)} className="formStudentEdit" id="formStudentEdit" >

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
                        <Form.Label >Fecha de nacimiento: <strong> {getFormattedDate(new Date(data.birthDate))} </strong> </Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="birthDate" value={data.birthDate} type="date" name="birthDate" placeholder="Fecha de nacimiento" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Nota media global</Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="avrScore" value={data.avrScore} type="number" name="avrScore" min="0" max="10" step="any" placeholder="Nota media global" />
                    </Form.Group>

                    <Button type="submit" >Registrar</Button>

                    <Link to='/student'
                        className="btn btn-primary"
                        style={{ textDecoration: 'none', marginLeft: "20px" }}>Cancelar</Link>

                    <Link to='/student/edit/more'
                        state={{ from: from }}
                        className="btn btn-primary"
                        style={{ textDecoration: 'none', marginLeft: "20px" }}>Añadir asignaturas</Link>

                </Form>
                
            </div>
                <div id="error" style={{ fontWeight: "bold", margin: "15px", color: "red" }} ></div>

            <div style={{width: "800px"}} >
                <h2 style={{ margin: "30px" }} >Asignaturas matriculadas</h2>
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
                            data.subjectList  ?
                                data.subjectList.map(d =>
                                    <tr id={d.id} key={d.id} >
                                        <td>{d.id}</td>
                                        <td>{d.name}</td>
                                        <td>{d.typeDep}</td>
                                        <td>  <Button onClick={( ) => desEnrollStudent( d.id, from ) }  >
                                            Desmatricular</Button>  </td>
                                    </tr>)
                    :
                    (
                    <tr>
                        <td>No se ha matriculado de ninguna asignatura</td>
                    </tr>
                    )
                        }
                </tbody>
            </Table>
        </div>


        </div >
    )
}

export default EditButton
