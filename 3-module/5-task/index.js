/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  // ваш код...
  /* ********** МОЁ РЕШЕНИЕ, КОТОРОЕ НЕ ПРОШЛО ТЕСТ. ПРОШУ НАПИСАТЬ МНЕ ПОЧЕМУ ЭТОТ ВАРИАНТ НЕ ПОДХОДИТ.
  str = str.replace(/,/g, "");
  let arr_temp = str.split(" ");
  let arr = [];

  for(let i in arr_temp){
	  arr.push(+arr_temp[i]);
  };
  arr.sort(function(a, b) { return a - b; });
  return {
    min: arr[0],
    max: arr[arr.length-1],
  };
  */
  let stringWithoutSpaces = str.split(' ').join();
  let itemsDividedByComma = stringWithoutSpaces.split(',');
  let numbersOnly = itemsDividedByComma
    .filter((item) => item !== '' && isFinite(item));

  let max = Math.max(...numbersOnly);
  let min = Math.min(...numbersOnly);

  return {min, max};
}
