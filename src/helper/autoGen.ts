export const autoGen = (length: number) => {
  let text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

export const generateCode = (firstCode: string) => {
  var randomDigits = Math.floor(10000 + Math.random() * 90000)
  return firstCode + randomDigits.toString()
}
