export function formatNumber(number: number | any) {
  if (number) {
    var numberString = number.toString()
    var result = []

    for (var i = numberString.length - 1, j = 0; i >= 0; i--, j++) {
      result.unshift(numberString[i])
      if (j % 3 === 2 && i > 0) {
        result.unshift(' ')
      }
    }

    return result.join('')
  } else return ''
}

// Kết quả: 18,666,666.6666666667
