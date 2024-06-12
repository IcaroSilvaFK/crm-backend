function addTowNumbers(left, right) {
  let result = [];
  let carry = 0;

  const currentLeft = left.reverse();
  const currentRight = right.reverse();

  const len = left.length > right.length ? left.length : right.length;

  for (let idx = 0; idx < len; idx++) {
    let currentLeftNumber = currentLeft[idx] || 0;
    let currentRightNumber = currentRight[idx] || 0;

    let currentResult = currentLeftNumber + currentRightNumber;

    if (carry > 0) {
      currentResult += carry;
    }

    carry = Math.floor(currentResult / 10);

    result.push(currentResult % 10);
  }

  if (carry > 0) {
    result.push(carry);
  }

  return result.reverse();
}

console.log(addTowNumbers([3, 4, 2], [4, 6, 5]));
console.log(addTowNumbers([9], [9, 9]));
