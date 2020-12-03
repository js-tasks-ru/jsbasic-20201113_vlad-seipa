/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
    let td_index = 0;

    for (let i of table.rows){
        i.cells[td_index].style.background = 'red';
        td_index += 1;
    }
}
