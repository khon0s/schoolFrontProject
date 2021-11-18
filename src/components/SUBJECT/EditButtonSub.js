import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { Form, Button, Table } from "react-bootstrap";

function EditButtonSub() {
    const location = useLocation()
    const { from } = location.state;
    const url = "http://localhost:8080/bahut/v1/subject/" + from;

  
    const [data, setData] = useState({
        name: ""
    })


    function handleData(e) {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(data)
        // console.log(input.current.value)
    }

    useEffect(()=>{
        const callApi = async () => {
        const res = await axios.get(url);
        setData(res.data)
    }
    callApi()
}, [url])


    const input = useRef(data.typeDep);


    function submitEdit(e) {

        e.preventDefault();

        const url = "http://localhost:8080/bahut/v1/subject/update/" + from;

        const api = axios.create({
            baseURL: url
        })

        api.put(url,
            {
                name: data.name,
                typeDep: input.current.value

            }
        )
            .then(res => {
                console.log("data modified")
                console.log(res.data)
            }).catch((err) => {
                console.log(err);
            });
    }



    return (
        <div>

            <div style={{ width: "50%", margin: "auto" }} >
                <h2 style={{ margin: "30px", textAlign: "center" }}>EDITAR ASIGNATURA</h2>
                <Form onSubmit={(e) => submitEdit(e)} className="formStudentEdit" id="formStudentEdit" >

                    <Form.Group className="mb-3" >
                    <Form.Label >Nombre</Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="name" value={data.name} type="text" name="firstName" size="35" placeholder="Nombre" />
                    </Form.Group>

                    <Form.Group className="mb-3"   >
                    <Form.Label >Departamento</Form.Label>
                        <Form.Control
                            id="optDep"
                            custom
                            style={{ padding: "1px", paddingLeft: "9px" }}
                            as="select"
                            ref={input}

                        >
                            <option value="">Seleccione un departamento</option>
                            <option value="HISTORY">Historia</option>
                            <option value="SCIENCE">Ciencia</option>
                            <option value="ART">Arte</option>
                            <option value="LANGUAGES">Idiomas</option>
                            <option value="HUMANITIES">Humanidades</option>
                            <option value="MATHEMATICS">Matemáticas</option>
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" >Registrar</Button>
                    <Link to='/subject'
                        className="btn btn-primary"
                        style={{ textDecoration: 'none', marginLeft: "30px" }}>Cancelar</Link>
                </Form>
            </div>

            <div>

                <h2 style={{ margin: "30px" }}>Coordinador de esta materia</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Jefe de departamento</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                           data.coordinator ?
                                 (
                                    <tr id={data.coordinator.id} key={data.coordinator.id} >
                                        <td>{data.coordinator.id}</td>
                                        <td>{data.coordinator.firstName}</td>
                                        <td>{data.coordinator.lastName}</td>
                                        <td>{data.coordinator.dni}</td>
                                         <td>{data.coordinator.headOfDepartment ? "YES" : "NO" }  </td> 
                                    </tr>)
                                :
                              (
                                    <tr>
                                        <td>No tiene un coordinador asignado.</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </Table>
            </div>

            <div>
                <h2 style={{ margin: "30px" }}>Alumnos matriculados en esta materia</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.studentList ?
                                data.studentList.map(d =>
                                    <tr id={d.id} key={d.id} >
                                        <td>{d.id}</td>
                                        <td>{d.firstName}</td>
                                        <td>{d.lastName}</td>
                                        <td>{d.dni}</td>
                                       
                                    </tr>)
                                :
                                (
                                    <tr>
                                        <td>No tiene alumnos asignados</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </Table>
            </div>

            <div>
                <h2 style={{ margin: "30px" }}>Profesores que imparten esta materia</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.professorList ?
                                data.professorList.map(d =>
                                    <tr id={d.id} key={d.id} >
                                        <td>{d.id}</td>
                                        <td>{d.firstName}</td>
                                        <td>{d.lastName}</td>
                                        <td>{d.dni}</td>
                                      
                                    </tr>)
                                :
                                (
                                    <tr>
                                        <td>No tiene profesores asignados</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </Table>
            </div>

        </div>
    )
}

export default EditButtonSub