import setCoordToClass from "./setCoordToClass";

  function setAsCoodinator( arr, id){

    arr.forEach( e => setCoordToClass(e , id));
    arr.forEach( el => uncolor(el));

     arr = [];
    return arr
   }

   function uncolor(el){
    let idRidColor = document.getElementById(el);
    idRidColor.style.cssText = 'background-color:white';
   }

   export default setAsCoodinator;