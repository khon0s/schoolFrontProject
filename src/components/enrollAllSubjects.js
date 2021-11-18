import enrollStuToClass from "./enrollStuToClass"

  function enrollAllSubjects( arr, id){

    arr.forEach( e => enrollStuToClass(e , id));
    arr.forEach( el => uncolor(el));

     arr = [];
    return arr
   }

   function uncolor(el){
    let idRidColor = document.getElementById(el);
    idRidColor.style.cssText = 'background-color:white';
   }

   export default enrollAllSubjects;