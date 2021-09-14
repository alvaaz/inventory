export function timeDifference(current: Date, previous: Date): string {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = current.getTime() - previous.getTime()

  if (elapsed < msPerMinute) {
    return 'Hace ' + Math.round(elapsed / 1000) + ' segundos'
  } else if (elapsed < msPerHour) {
    return 'Hace ' + Math.round(elapsed / msPerMinute) + ' minutos'
  } else if (elapsed < msPerDay) {
    return 'Hace ' + Math.round(elapsed / msPerHour) + ' horas'
  } else if (elapsed < msPerMonth) {
    return 'Hace ' + Math.round(elapsed / msPerDay) + ' días aprox.'
  } else if (elapsed < msPerYear) {
    return 'Hace ' + Math.round(elapsed / msPerMonth) + ' meses aprox.'
  } else {
    return 'Hace ' + Math.round(elapsed / msPerYear) + ' años aprox.'
  }
}
