/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  // ваш код...
  str = str.toUpperCase();
	if (str.includes("1xBet".toUpperCase()) || str.includes("XXX".toUpperCase())){
		return true;
	} else {
		return false;
	};
}
