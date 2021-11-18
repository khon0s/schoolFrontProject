import React, { useState, useRef } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";

function SubCreate() {

    const url = "http://localhost:8080/bahut/v1/subject/new";

    const [data, setData] = useState({
        name: ""
    })

    const input = useRef(null);

    function handleData(e) {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }


    function submitForm(e) {
        e.preventDefault();

        const api = axios.create({
            baseURL: url
        })

        api.post(url, {
            name: data.name,
            typeDep: input.current.value

        }).then((res) => {

            const name = document.getElementById("name");
            name.value = "";
        })
    }


    return (
        <div style={{ width: "50%", margin: "auto" }} >
            <h2 style={{ margin: "55px", textAlign: "center" }}>NUEVA ASIGNATURA</h2>
            <Form onSubmit={(e) => submitForm(e)} className="subjectForm" id="subjectForm" >

                <Form.Group className="mb-3" >
                    <Form.Control onChange={(e) => handleData(e)} id="name" value={data.name} type="text" name="firstName" size="35" placeholder="Nombre" />
                </Form.Group>

                <Form.Group className="mb-3"   >
                    <Form.Control
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

                <Button type="submit" style={{ marginRight: '30px' }}>Registrar</Button>
                <Link to='/subject' style={{ textDecoration: 'none' }}
                    className="btn btn-primary"
                >Cancelar</Link>
            </Form>
        </div>
    )
}

export default SubCreate