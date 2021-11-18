import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import validateStudentCreate from "../validateStudentCreate";

function ProCreate() {

    const url = "http://localhost:8080/bahut/v1/professor/new";

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        birthDate: "",
    })

    const [bo, setBo] = useState({
        headOfDepartment: false
    })

    function handleData(e) {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        // console.log(data)
    }

    function handleDataBoolean(e) {
        bo.headOfDepartment = !bo.headOfDepartment;
        setBo( bo);
        // console.log(bo)
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
            headOfDepartment: bo.headOfDepartment
        }).then((res) => {
            const bcPro = document.getElementById("bcPro");
            const form = document.getElementById("proFormNew");

            // console.log(form.elements.length )
            bcPro.checked=false;
            setBo(true)

            // console.log(res.data)

            for (let i = 0; i < form.elements.length - 2; i++) {
                form.elements[i].value = ""
            }
        })
    }


    return (
        <div style={{ width: "50%", margin: "auto" }} >
            <h2>NUEVO DOCENTE</h2>
            <Form onSubmit={(e) => submitForm(e)} className="proFormNew" id="proFormNew" >

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
                    <Form.Check  id="bcPro" onClick={(e)=> handleDataBoolean(e)} label="jefe de departamento"/>
                </Form.Group>



                <Button type="submit" style={{ marginRight: '30px' }}>Registrar</Button>
                <Link to='/professor' style={{ textDecoration: 'none' }}
                    className="btn btn-primary"
                >Cancelar</Link>
            </Form>

        <div id="error" style={{ fontWeight: "bold", margin: "15px", color: "red" }} ></div>
        </div>
    )
}

export default ProCreate