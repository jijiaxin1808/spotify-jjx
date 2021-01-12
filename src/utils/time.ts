export function handleTimeAgo (time: string): string {
  let result = ''
  const timePublish = new Date(time)
  const timeNow = new Date()
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const year = month * 12
  const diffValue = timeNow.valueOf() - timePublish.valueOf()
  const diffMonth = diffValue / month
  const diffYear = diffValue / year
  const diffWeek = diffValue / (7 * day)
  const diffDay = diffValue / day
  const diffHour = diffValue / hour
  const diffMinute = diffValue / minute
  console.log(diffValue)
  if (diffValue < 0) {
    return result
  } else if (diffYear > 1) {
    result = Math.floor(diffYear) + '年前'
  } else if (diffMonth > 1) {
    result = Math.floor(diffMonth) + '月前'
  } else if (diffWeek > 1) {
    result = Math.floor(diffWeek) + '周前'
  } else if (diffDay > 1) {
    result = Math.floor(diffDay) + '天前'
  } else if (diffHour > 1) {
    result = Math.floor(diffHour) + '小时前'
  } else if (diffMinute > 1) {
    result = Math.floor(diffMinute) + '分钟前'
  }
  return result
}

export function handlePlayTime (time: number): string {
  if (!time) return '0:00'
  time = Math.round(time / 1000)
  const sec = time % 60
  const min = Math.floor(time / 60)
  return `${min || '0'}:${sec > 9 ? sec : '0' + sec}`
}
