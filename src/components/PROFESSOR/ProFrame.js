import ProTable from "./ProTable";
import { Link } from "react-router-dom";

const ProFrame = () => {

    return (
        <div>
            <h1 style={{ textAlign: 'center',  margin: "35px"  }} >LISTA DE PROFESORES</h1>
            <div>
                <div style={{ margin: '15px' }} >

                    <Link to='/professor/registro'
                        style={{ marginRight: '30px' }}
                        className="btn btn-primary"
                    >Crear</Link>
                    <Link to='/professor/unidad'
                        className="btn btn-primary"
                    >Buscar</Link>

                </div>
                <div>
                    <ProTable/>
                </div>
            </div>
        </div>
    )
}


export default ProFrame