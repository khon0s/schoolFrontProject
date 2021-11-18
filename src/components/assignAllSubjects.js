import assignProToClass from "./assignProToClass"

  function assignAllSubjects( arr, id){

    arr.forEach( e => assignProToClass(e , id));
    arr.forEach( el => uncolor(el));

     arr = [];
    return arr
   }

   function uncolor(el){
    let idRidColor = document.getElementById(el);
    idRidColor.style.cssText = 'background-color:white';
   }

   export default assignAllSubjects;