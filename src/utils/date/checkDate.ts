import moment from 'moment'

export const checkDateValid = (val: any) => {
  return (
    moment(val, 'DD-MM-YYYY', true).isValid() ||
    moment(val, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid() ||
    moment(val, 'YYYY-MM-DD', true).isValid()
  )
}
