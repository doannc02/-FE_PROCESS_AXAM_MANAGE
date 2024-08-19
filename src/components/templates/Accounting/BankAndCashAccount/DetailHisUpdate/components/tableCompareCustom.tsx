import { paymentMethodSelect } from '@/enum'
import { convertToDate } from '@/utils/date/convertToDate'
import { TRANSLATE } from '@/routes'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

const CustomCompareTable = ({ data }: { data: any }) => {
  const { t } = useTranslation(TRANSLATE.BANK_CASH_ACCOUNT)
  let dataObjCompare: any
  if (data !== null) {
    const { createdBy, ...ObjCompare } = data
    dataObjCompare = ObjCompare
  }
  const removeIdFields = (obj: any) => {
    if (obj) {
      const { id, reason, ...rest } = obj
      return rest
    }
  }
  const restPaymentChange = removeIdFields(
    dataObjCompare?.paymentChange ?? dataObjCompare?.paymentMain
  )
  const restPaymentMain = removeIdFields(dataObjCompare?.paymentMain)

  const findDifferences = (obj1: any, obj2: any) => {
    const differences: any = {}

    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          differences[key] = {
            oldValue: obj1[key],
            newValue: obj2[key],
          }
        }
      }
    }

    return differences
  }
  const findDiff = findDifferences(restPaymentChange, restPaymentMain)
  const getFieldValue = (
    value: any,
    nameField?: any,
    isPaymentChange?: boolean
  ) => {
    if (typeof value === 'object' && value !== null && 'name' in value) {
      return value.name
    }
    if (typeof value === 'string' && nameField === 'state') {
      const render =
        value === 'DRAFT'
          ? 'Nháp'
          : value === 'POSTED'
          ? 'Đã vào sổ'
          : 'Chờ vào sổ'
      return (
        <Typography
          color={`${nameField in findDiff && isPaymentChange ? 'red' : ''}`}
        >
          {render}
        </Typography>
      )
    }
    if (typeof value === 'string' && nameField === 'paymentMethod') {
      const find = paymentMethodSelect.find((item) => item?.value === value)
      return (
        <Typography
          color={`${nameField in findDiff && isPaymentChange ? 'red' : ''}`}
        >
          {find?.label}
        </Typography>
      )
    }
    if (nameField === 'paymentDate') {
      return (
        <Typography
          color={`${nameField in findDiff && isPaymentChange ? 'red' : ''}`}
        >
          {convertToDate(value)}
        </Typography>
      )
    }
    return (
      <Typography color={`${nameField in findDiff && 'red'}`}>
        {value}
      </Typography>
    )
  }
  return (
    <Paper sx={{ width: '100%' }}>
      {data !== null ? (
        <Table>
          <Table>
            <TableBody>
              {Object?.keys(restPaymentChange).map((field: any, index) => (
                <TableRow key={index} sx={{ width: '100%' }}>
                  <TableCell width='28%' sx={{ pl: 3 }}>
                    {t(`table.${field}`)}
                  </TableCell>
                  <TableCell width='37%'>
                    {getFieldValue(restPaymentChange[field], field, true)}
                  </TableCell>
                  <TableCell>
                    {getFieldValue(restPaymentMain[field], field, false)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Table>
      ) : (
        <Table>
          <TableCell colSpan={3} variant='body' align='center' className='py-8'>
            <div className='flex justify-center min-h-[30px] flex-col'>
              <Typography variant='body2'>
                {t('common:table.no_data')}
              </Typography>
            </div>
          </TableCell>
        </Table>
      )}
    </Paper>
  )
}

export default CustomCompareTable
