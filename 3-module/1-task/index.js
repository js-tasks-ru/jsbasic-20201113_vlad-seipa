/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  // ваш код...
  let arr = [];
  users.map(function(obj){
      arr.push(obj.name);
  });
  return arr;
}
