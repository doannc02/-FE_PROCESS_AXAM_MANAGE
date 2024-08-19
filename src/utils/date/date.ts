import moment from 'moment'
import { convertToDate, convertToOffsetDateTime } from './convertToDate'

export const getDateNow = () => {
  return convertToDate(moment.now(), 'YYYY-MM-DD')
}

export const getStartDateOfMonth = (formatOffsetDateTime?: boolean) => {
  if (formatOffsetDateTime) {
    return convertToOffsetDateTime(moment().startOf('month'))
  } else return convertToDate(moment().startOf('month'), 'YYYY-MM-DD')
}

export const getEndDateOfMonth = (formatOffsetDateTime?: boolean) => {
  if (formatOffsetDateTime) {
    return convertToOffsetDateTime(moment().endOf('month'))
  } else return convertToDate(moment().endOf('month'), 'YYYY-MM-DD')
}
