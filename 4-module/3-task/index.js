/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    for(let i of table.tBodies[0].rows){
        switch(i.children[3].dataset.available){
            case "true":
                i.classList.add("available");
                break;
            case "false":
                i.classList.add("unavailable");
                break;
            default:
                i.setAttribute("hidden", "hidden");
        };

        switch(i.children[2].innerHTML){
            case "f":
                i.classList.add("female");  
                break;
            
            case "m":
                i.classList.add("male");
                break;
        };

        if (+i.children[1].innerHTML < 18){
            console.log(i.style.textDecoration = "line-through");
        };
    };
}
