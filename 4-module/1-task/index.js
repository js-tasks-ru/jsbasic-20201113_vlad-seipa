/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  // ваш код...
  let ul = document.createElement("UL");

  for(let item of friends){
    let li = document.createElement("LI");
    li.innerHTML = `${item.firstName} ${item.lastName}`;
    ul.append(li);
  };

  return ul;
}
