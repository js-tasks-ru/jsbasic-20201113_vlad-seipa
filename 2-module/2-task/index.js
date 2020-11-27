/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  // ваш код...
  if (Object.keys(obj).length === 0){
    return true;
  } else {
    return false;
  };
}
