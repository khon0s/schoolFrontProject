import axios from "axios";

function unassignCoordinator(e, idClass) {

    e.target.parentNode.parentNode.remove();

    const url = "http://localhost:8080/bahut/v1/subject/unassign/coordinator/fall/" + idClass ;

    const api = axios.create({
        baseURL: url
    })

    api.put(url)
        .then(res => {

        }).catch((err) => {
            console.log(err);
        });

};

export default unassignCoordinator;