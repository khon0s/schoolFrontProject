
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import DeleteButtonSub from './DeleteButtonSub';

const TbodyTable = ({ currentData}) => {


    return (
        <tbody>
            {
                currentData.length > 0 ?
                    currentData.map(d =>
                        <tr id={d.id} key={d.id} >
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.typeDep}</td>
                            <td>{d.coordinator !== null ? d.coordinator.lastName + ", " + d.coordinator.firstName : "Sin asignar"}</td>
                            <td>

                                <Link to='/subject/edit'
                                    className="btn btn-primary"
                                    state={{ from: d.id }}
                                >Editar</Link>
                            </td>
                            <td>
                                <Button onClick={(e) => DeleteButtonSub(e)}  >Borrar</Button>
                            </td>
                        </tr>)
                    :
                    (
                        <tr>
                            <td>No hay asignaturas registradas</td>
                        </tr>
                    )
            }
        </tbody>
    );
};

export default TbodyTable;