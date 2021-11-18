
function validateStudentCreate(obj) {

    let errorArr = ["Se produjo un error: "];

    let regexName = /^[^±!@£$%^&*_+§¡\]}{[€#¢§¶•ªº«\\/<0123456789>?:;|=.,]{1,30}$/;
    let regexDni = /\d{8}[a-z A-Z]/ ;

    if (!regexName.test(obj.firstName)) {
        errorArr.push("nombre; carácteres o longitud inválida")
    }
    if (!regexName.test(obj.lastName)) {
        errorArr.push("apellido; carácteres o longitud inválida")
    }
    if (!regexDni.test(obj.dni)) {
        errorArr.push("DNI; inválido")
    }
    if ( obj.dni > 10 ) {
        errorArr.push("Nota; fuera de rango")
    }
    if ( obj.dni < 0 ) {
        errorArr.push("Nota; fuera de rango")
    }
    if( new Date(obj.birthDate) > Date.now() ){
        errorArr.push("Fecha; timetraveller alert")
    }

    if (errorArr.length > 1) {
        let err = document.getElementById("error");
        let listErr = errorArr.join(" ");
        err.innerHTML = listErr + ".";
        setTimeout(() => err.innerHTML = "", 5000);
        return false;
    }
    return true;
}

export default validateStudentCreate;