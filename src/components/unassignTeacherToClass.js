import axios from "axios";

function unassignTeacherToClass(e, idClass, idPro) {

    e.target.parentNode.parentNode.remove();

    const url = "http://localhost:8080/bahut/v1/subject/assign/fall/" + idClass + "/" + idPro;

    const api = axios.create({
        baseURL: url
    })

    api.put(url)
        .then(res => {

        }).catch((err) => {
            console.log(err);
        });

};

export default unassignTeacherToClass;