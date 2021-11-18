import axios from "axios";

function assignProToClass(idClass, id){

    const url = "http://localhost:8080/bahut/v1/subject/assign/" + idClass + "/" + id ;

    const api = axios.create({
        baseURL: url
    })

    api.put(url)
        .then(res => {
            console.log(res.data)
            console.log("data modified")
        }).catch((err) => {
            console.log(err);
        });

}

export default assignProToClass;
