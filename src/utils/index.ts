export function shuffleArray<T> (array: T[]): T[] {
  const newArr = [...array]
  let m = newArr.length
  let t,i

  while (m) {
    i = Math.floor(Math.random() * m--)
    t = newArr[m]
    newArr[m] = newArr[i]
    newArr[i] = t
  }
  return newArr
}

export function getQuestionWordWithCorrectSuffix(number: number): string {
  if (number >= 11 && number <= 19) {
    return `вопросов`
  }
  const lastDigit = number % 10
  if (lastDigit === 1) {
    return 'вопрос'
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'вопроса'
  } else {
    return 'вопросов'
  }
}
