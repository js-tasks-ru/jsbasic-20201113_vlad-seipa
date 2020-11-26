/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  // ваш код...
  let result = 0;
  for(let i in salaries){
    if (typeof salaries[i] === 'number'){
      result += salaries[i];
    };
  };
  return result;
}
