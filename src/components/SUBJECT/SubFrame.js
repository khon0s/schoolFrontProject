import SubTable from "./SubTable";
import { Link } from "react-router-dom";

const SubFrame = () => {

    return (
        <div>
            <h1  style={{ textAlign: 'center',  margin: "35px"  }} >LISTA DE ASIGNATURAS</h1>
            <div>
                <div style={{ margin: '15px' }} >

                    <Link to='/subject/registro'
                      style={{ marginRight: '30px' }}
                        className="btn btn-primary"
                    >Crear</Link>
                    <Link to='/subject/unidad'
                        className="btn btn-primary"
                    >Buscar</Link>

                </div>
                <div>
                    <SubTable />
                </div>
            </div>
        </div>
    )
}


export default SubFrame