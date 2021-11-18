import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import StudentFiltrada from './StudentFiltrada';
import { Form, Button } from "react-bootstrap";

function StudentSearch() {


    const [list, setList] = useState()

    const [data, setData] = useState({
        firstName: null,
        lastName: null,
        dateInit: null,
        dateEnd: null,
    })

    function handleData(e) {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function submitForm(e) {
        e.preventDefault();


        if (data.firstName === null &&
            data.lastName === null &&
            data.dateInit === null &&
            data.dateEnd === null
        ) {
            return console.log("no data on form")
        }

        const url = "http://localhost:8080/bahut/v1/student/some";

        const api = axios.create({
            baseURL: url
        })

        api.post(url,
            {
                firstName: data.firstName,
                lastName: data.lastName,
                dateInit: data.dateInit,
                dateEnd: data.dateEnd,
            }
        ).then(res => {
            // console.log(res.data)
            setList(res.data)

            const form = document.getElementById("formStudentTri");

            for (let i = 0; i < form.elements.length; i++) {
                form.elements[i].value = null;
            }
            setData(
                {
                    firstName: null,
                    lastName: null,
                    dateInit: null,
                    dateEnd: null,
                }
            );
        })
    }


    function submitId(e) {
        e.preventDefault();

        let input = document.getElementById("idS");

        if (input.value.trim() === "") return console.log("no id");

        const url = "http://localhost:8080/bahut/v1/student/" + input.value;

        const api = axios.create({
            baseURL: url
        })

        api.get(url)
            .then(res => {
                if (res.data === "Invalid request") return console.log("not found by id");
                input.value = "";
                let myArr = [];
                myArr.push(res.data)
                setList(myArr)
            })
    }



    return (
        <div style={{ }}>
          
            <div style={{ width: "45%" , float: "left", marginRight: "20px" }} >
            <h2 style={{ margin: "30px" }}>Búsqueda múltiple</h2>
                <Form  onSubmit={(e) => submitForm(e)} className="formStudentTri" id="formStudentTri" >

                    <Form.Group  className="mb-3" >
                        <Form.Label >Nombre</Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="firstName" value={data.firstName} type="text" name="firstName" size="35" placeholder="Nombre" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label >Apellido</Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="lastName" value={data.lastName} type="text" name="lastName" size="35" placeholder="Apellido" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label >Fecha inicio</Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="dateInit" value={data.dateInit} type="date" name="dateInit" placeholder="Fecha inicio" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label >Fecha fin</Form.Label>
                        <Form.Control  onChange={(e) => handleData(e)} id="dateEnd" value={data.dateEnd} type="date" name="dateEnd" placeholder="Fecha fin" />
                    </Form.Group>

                    <Button type="submit" style={{ marginRight: "30px" }}>Buscar</Button>
                    <Link to='/student'
                        className="btn btn-primary"
                        style={{ textDecoration: 'none' }}>Cancelar</Link>
                </Form>
            </div>

            <div style={{  width: "45%", float: "left"  }}>
                <h2 style={{ margin: "30px" }} >Buscar por ID</h2>
                <Form onSubmit={(e) => submitId(e)}>
                    <Form.Group className="mb-3" >
                        <Form.Label >ID de registro</Form.Label>
                        <Form.Control id="idS" type="text" name="idS" size="35" placeholder="ID" />
                    </Form.Group>
                    <Button type="submit"
                        style={{ marginRight: "30px" }}
                    >Buscar</Button>
                    <Link to='/student'
                        className="btn btn-primary"
                        style={{ textDecoration: 'none' }}>Cancelar</Link>

                </Form>
            </div>

            <div  style={{ width: "100%" }} >
             
                <StudentFiltrada list={list} />
            </div>
        </div>
    )
}

export default StudentSearch