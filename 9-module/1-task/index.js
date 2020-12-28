/**
 * promiseClick
 * @param {Element} button index
 * @returns {Promise}
 */

export default function promiseClick(button) {
  // ваш код...
  return new Promise((resolve, reject) => {
    button.addEventListener("click", event => {
      resolve(event);
      reject(new Error("ERROR"));
    }, { once: true });
  });
}
