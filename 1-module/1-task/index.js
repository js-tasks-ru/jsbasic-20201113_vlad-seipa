/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  // ваш код...
	let result = 1, i;
	
	for(i = 0; n > i; i++){
		result *= n-i;
	};
	return result;
}
