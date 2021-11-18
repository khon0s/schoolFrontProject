import axios from "axios";

function setCoordToClass(idClass, id){

    const url = "http://localhost:8080/bahut/v1/subject/assign/coordinator/" + idClass + "/" + id ;

    const api = axios.create({
        baseURL: url
    })

    api.put(url)
        .then(res => {
            
        }).catch((err) => {
            console.log(err);
        });

}

export default setCoordToClass;