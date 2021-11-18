import React from 'react'
import axios from "axios";

function StudentID() {



    function submitId(e){
        e.preventDefault();

    let input = document.getElementById("idS") ;

    if( input.value.trim() === "" ) return console.log("no id");

    const url = "http://localhost:8080/bahut/v1/student/"+ input.value;

    const api = axios.create({
        baseURL: url
    })

        api.get(url )
        .then(res => {
           console.log(res.data)
           input.value = "";
        })
    }
  

    return (
        <div>
              <h2>Buscar por ID</h2>
            <form onSubmit={(e) => submitId(e) }>
                <label htmlFor="idS" required >ID</label>
                <input id="idS"  type="text" name="idS" size="35" ></input>
                <button>Buscar</button>
            </form>
        </div>
    )
}

export default StudentID
