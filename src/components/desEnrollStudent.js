import axios from "axios" ;

function desEnrollStudent(idSub, idStu){

    
    const url = "http://localhost:8080/bahut/v1/subject/enroll/fall/" + idSub + "/" + idStu ;

    const api = axios.create({
        baseURL: url
    })

    api.put(url)
        .then(res => {
            let domEl = document.getElementById(idSub);
            domEl.remove()
        }).catch((err) => {
            console.log(err);
        });

}

export default desEnrollStudent