/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
    let td_index = 0;
    let rows_arr = Array.from(table.rows);

    for (let i of rows_arr){
        i.cells[td_index].style.background = 'red';
        td_index += 1;
    }
}
