import axios from "axios";

function DeleteButton(e) {
    e.preventDefault();
    const id = e.target.parentNode.parentNode.firstChild.innerHTML;

    if (id.length === 0) return;

    const api = axios.create({
        baseURL: "http://localhost:8080/bahut/v1/student/fall"
    })

    api.delete(id).then(res => {
        e.target.parentNode.parentNode.remove()
    })

}



export default DeleteButton
