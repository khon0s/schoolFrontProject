import StudentTable from "./StudentTable";
import { Link } from "react-router-dom";

const StuFrame = () => {

    return (
        <div>
            <h1  style={{ textAlign: 'center', margin: "35px" }} >LISTA DE ALUMNOS</h1>
            <div>
                <div style={{ margin: '15px' }} >

                    <Link to='/student/registro'
                      style={{ marginRight: '30px' }}
                        className="btn btn-primary"
                    >Crear</Link>
                    <Link to='/student/unidad'
                        className="btn btn-primary"
                    >Buscar</Link>

                </div>
                <div>
                    <StudentTable />
                </div>
            </div>
        </div>
    )
}


export default StuFrame