import moment from 'moment'
import momentTimeZone from 'moment-timezone'

export const convertToDate = (val: any, format = 'DD/MM/YYYY') => {
  if (!val) return ''
  else return moment(val).format(format)
}

export function convertToOffsetDateTime(date: string | any): string {
  let format = 'YYYY-MM-DDTHH:mm:ssZ'
  const targetTimeZone = 'Asia/Ho_Chi_Minh'
  const momentDate = momentTimeZone.tz(date, format, targetTimeZone)
  return momentDate.format('YYYY-MM-DDTHH:mm:ssZ')
}


export function convertToDateTimeReq(date: string | any): string {
  let format = 'YYYY-MM-DD'
  const targetTimeZone = 'Asia/Ho_Chi_Minh'
  const momentDate = momentTimeZone.tz(date, format, targetTimeZone)
  return momentDate.format('YYYY-MM-DDTHH:mm:ssZ')
}