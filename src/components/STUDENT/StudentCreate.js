import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import validateStudentCreate from "../validateStudentCreate";

function StudentCreate() {

    const url = "http://localhost:8080/bahut/v1/student/new";

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        birthDate: "",
        avrScore: parseInt("0")
    })

    function handleData(e) {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        // console.log(data)
    }


    function submitForm(e) {
        e.preventDefault();

        let val = validateStudentCreate(data);
        if (val === false) return;

        const api = axios.create({
            baseURL: url
        })

        api.post(url, {
            firstName: data.firstName,
            lastName: data.lastName,
            dni: data.dni,
            birthDate: data.birthDate,
            avrScore: data.avrScore
        }).then((res) => {
            console.log(res.data)
            const form = document.getElementById("studentForm");

            for (let i = 0; i < form.elements.length; i++) {
                form.elements[i].value = ""
            }

        })
    }


    return (
        <div style={{ width: "50%", margin: "auto" }} >
            <h2>NUEVO INGRESO</h2>
            <Form onSubmit={(e) => submitForm(e)} className="formStudent" id="studentForm" >

                <Form.Group className="mb-3" >
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
                    <Form.Label >Fecha de nacimiento</Form.Label>
                    <Form.Control onChange={(e) => handleData(e)} id="birthDate" value={data.birthDate} type="date" name="birthDate" placeholder="Fecha de nacimiento" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Nota media global</Form.Label>
                    <Form.Control onChange={(e) => handleData(e)} id="avrScore" value={data.avrScore} type="number" name="avrScore" min="0" max="10" step="any" placeholder="Nota media global" />
                </Form.Group>

                <Button type="submit" style={{ marginRight: '30px' }}>Registrar</Button>
                <Link to='/student' style={{ textDecoration: 'none' }}
                    className="btn btn-primary"
                >Cancelar</Link>
            </Form>
            <div id="error" style={{ fontWeight: "bold", margin: "15px", color: "red" }} ></div>
        </div>
    )
}

export default StudentCreate
