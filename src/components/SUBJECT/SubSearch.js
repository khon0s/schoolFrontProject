import React, { useState, useRef } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import SubFiltrada from './SubFiltrada';

function SubSearch() {

    const [list, setList] = useState()

    const [data, setData] = useState({
        name: null
        
    })

    const input = useRef(null);

    function handleData(e) {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(data)
    }

    function submitForm(e) {
        e.preventDefault();

        console.log("what I send to Api")
        console.log(input.current.value)
        console.log(data)

        if (data.name === null &&
            data.typeDep === null 
        ) {
            return console.log("no data on form")
        }

        const url = "http://localhost:8080/bahut/v1/subject/some";

        const api = axios.create({
            baseURL: url
        })

        api.post(url,
            {
                name: data.name,
                typeDep: input.current.value.trim() === "" ? null : input.current.value
         
            }
        ).then(res => {
            console.log("what you get from API")
            console.log(res.data)
            setList(res.data)

            const form = document.getElementById("formSubTri");

            for (let i = 0; i < form.elements.length; i++) {
                form.elements[i].value = null;
            }
            setData(
                {
                    name: null
                }
                );
                input.current.value = null ;
        })
    }


    function submitId(e) {
        e.preventDefault();

        let input = document.getElementById("idS");

        if (input.value.trim() === "") return console.log("no id");

        const url = "http://localhost:8080/bahut/v1/subject/" + input.value;

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
            <h2>Búsqueda múltiple</h2>
                <Form  onSubmit={(e) => submitForm(e)} className="formSubTri" id="formSubTri" >

                    <Form.Group  className="mb-3" >
                        <Form.Label >Nombre</Form.Label>
                        <Form.Control onChange={(e) => handleData(e)} id="name" value={data.name} type="text" name="name" size="35"  placeholder="Nombre" />
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


                    <Button type="submit" style={{ marginRight: "30px" }}>Buscar</Button>
                    <Link to='/subject'
                        className="btn btn-primary"
                        style={{ textDecoration: 'none' }}>Cancelar</Link>
                </Form>
            </div>

            <div style={{  width: "45%", float: "left"  }}>
                <h2 >Buscar por ID</h2>
                <Form onSubmit={(e) => submitId(e)}>
                    <Form.Group className="mb-3" >
                        <Form.Label >ID de registro</Form.Label>
                        <Form.Control id="idS" type="text" name="idS" size="35" placeholder="ID" />
                    </Form.Group>
                    <Button type="submit"
                        style={{ marginRight: "30px" }}
                    >Buscar</Button>
                    <Link to='/subject'
                        className="btn btn-primary"
                        style={{ textDecoration: 'none' }}>Cancelar</Link>

                </Form>
            </div>

            <div  style={{ width: "100%" }} >
             
                <SubFiltrada list={list} />
            </div>
        </div>
    )
}

export default SubSearch