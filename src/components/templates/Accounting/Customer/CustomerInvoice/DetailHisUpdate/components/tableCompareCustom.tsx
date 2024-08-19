import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import PaymentStatus from '@/components/atoms/PaymentStatus'
import { BLACK, GREEN } from '@/helper/colors'
import { paymentMethodSelect, scopeCustomerTypeSelect } from '@/enum'
import { convertToDate } from '@/utils/date/convertToDate'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TRANSLATE } from '@/routes'

const CustomCompareTable = ({
  data,
  isLoading,
  isTTInvoice,
  typeInvoice,
  setShowCollapse,
}: {
  data: any
  isLoading: boolean
  isTTInvoice: boolean
  typeInvoice?: string
  setShowCollapse: any
}) => {
  const { t } = useTranslation(TRANSLATE.ACCOUNT_HISTORY)
  let dataObjCompare: any
  let dataObjTTCompare: any
  if (data !== null) {
    const { createdBy, ...ObjCompare } = data
    dataObjCompare = ObjCompare
  }

  const removeIdFields = (obj: any) => {
    if (obj) {
      const {
        paid,
        id,
        amountUntaxed,
        amountTotal,
        moneyPaid,
        discount,
        orderName,
        totalRemainPunish,
        moveType,
        currency,
        paymentStatus,
        reason,
        invoiceLines,
        computeTaxInfo,
        VAT,
        ...rest
      } = obj
      dataObjTTCompare = {
        totalRemainPunish,
        amountUntaxed,
        amountTotal,
        moneyPaid,
        paymentStatus,
        paid,
      }
      return rest
    }
  }
  const handleFieldTT = (obj: any) => {
    if (obj) {
      const {
        paid,
        id,
        amountUntaxed,
        amountTotal,
        moneyPaid,
        discount,
        orderName,
        totalRemainPunish,
        scopeType,
        currency,
        paymentStatus,
        state,
        reason,
        invoiceLines,
        computeTaxInfo,
        VAT,
        ...rest
      } = obj
      const a = {
        totalRemainPunish,
        amountUntaxed,
        amountTotal,
        moneyPaid,
        paymentStatus,
        paid,
      }
      return a
    }
  }
  const restInvChange = removeIdFields(
    dataObjCompare?.invoiceChange ?? dataObjCompare?.invoiceMain
  )
  const restInvGerMain = handleFieldTT(dataObjCompare?.invoiceMain ?? []) as any
  const restInvGerChange = handleFieldTT(
    dataObjCompare?.invoiceChange ?? dataObjCompare?.invoiceMain
  ) as any
  const restInvMain = removeIdFields(dataObjCompare?.invoiceMain)
  const findDifferences = (obj1: any, obj2: any) => {
    const differences: any = {}
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (
          obj1[key] !== obj2[key] &&
          typeof obj1[key] !== 'object' &&
          typeof obj2[key] !== 'object'
        ) {
          differences[key] = {
            oldValue: obj1[key],
            newValue: obj2[key],
            isChange: true,
          }
        }
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          if (obj1[key]?.name !== obj2[key]?.name) {
            differences[key] = {
              oldValue: obj1[key]?.name ?? '',
              newValue: obj2[key]?.name ?? '',
              isChange: true,
            }
          }
        }
      }
    }

    return differences
  }
  const findDiff = findDifferences(restInvChange, restInvMain)
  const findDiffTT = findDifferences(restInvGerChange, restInvGerMain)
  const isEmptyDiff = Object.keys(findDiff).length === 0
  const isEmptyDiffTT = Object.keys(findDiffTT).length === 0
  if (!isEmptyDiff) {
    setShowCollapse(1)
  }
  if (!isEmptyDiffTT) {
    setShowCollapse(3)
  }
  const getFieldValue = (
    value: any,
    nameField?: any,
    isPaymentChange?: boolean
  ) => {
    if (typeof value === 'object' && value !== null && 'name' in value) {
      return (
        <Typography
          color={`${nameField in findDiff && isPaymentChange ? 'red' : ''}`}
        >
          {value?.name}
        </Typography>
      )
    }
    if (nameField === 'state') {
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
    if (typeof value === 'string' && nameField === 'scopeType') {
      const render = scopeCustomerTypeSelect.find(
        (item) => item.value === value
      )

      return (
        <Typography
          color={`${nameField in findDiff && isPaymentChange ? 'red' : ''}`}
        >
          {render?.label}
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
  const getFieldValueTT = (
    value: any,
    nameField?: any,
    isPaymentChange?: boolean
  ) => {
    if (typeof value === 'string' && nameField === 'paymentStatus') {
      return <PaymentStatus value={value} />
    }
    return (
      <CurrencyFormatCustom
        color={`${nameField in findDiffTT && isPaymentChange ? 'red' : ''}`}
        amount={value ?? 0}
      />
    )
  }
  return (
    <>
      {isLoading ? (
        <Paper sx={{ width: '100%' }}>Loading...</Paper>
      ) : !isTTInvoice ? (
        <Paper sx={{ width: '100%' }}>
          {data !== null ? (
            <Table>
              <Table>
                <TableBody>
                  {Object?.keys(restInvMain).map((field: any, index) => (
                    <TableRow key={index} sx={{ width: '100%' }}>
                      <TableCell
                        width='28%'
                        sx={{
                          pl: 3,
                          fontSize: '14px',
                          fontWeight: '700',
                        }}
                      >
                        {typeInvoice === 'REVENUE'
                          ? t(`tableInv2.${field}`)
                          : t(`tableInv.${field}`)}
                      </TableCell>
                      <TableCell width='37%'>
                        {!findDiff
                          ? getFieldValue(restInvMain[field], field, false)
                          : getFieldValue(restInvChange[field], field, true)}
                      </TableCell>
                      <TableCell>
                        {getFieldValue(restInvMain[field], field, false)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Table>
          ) : (
            <Table>
              <TableCell
                colSpan={3}
                variant='body'
                align='center'
                className='py-8'
              >
                <div className='flex justify-center min-h-[30px] flex-col'>
                  <Typography variant='body2'>
                    {t('common:table.no_data')}
                  </Typography>
                </div>
              </TableCell>
            </Table>
          )}
        </Paper>
      ) : (
        <Paper sx={{ width: '100%' }}>
          {data !== null ? (
            <Table>
              <Table>
                <TableBody>
                  {Object?.keys(dataObjTTCompare).map((field: any, index) => (
                    <TableRow key={index} sx={{ width: '100%' }}>
                      <TableCell
                        width='28%'
                        sx={{ pl: 3, fontSize: '14px', fontWeight: '700' }}
                      >
                        {t(`tableTT.${field}`)}
                      </TableCell>
                      <TableCell width='37%'>
                        {!findDiffTT
                          ? getFieldValueTT(
                              restInvGerChange[field],
                              field,
                              false
                            )
                          : getFieldValueTT(
                              restInvGerChange[field],
                              field,
                              true
                            )}
                      </TableCell>
                      <TableCell>
                        {getFieldValueTT(restInvGerMain[field], field, false)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Table>
          ) : (
            <Table>
              <TableCell
                colSpan={3}
                variant='body'
                align='center'
                className='py-8'
              >
                <div className='flex justify-center min-h-[30px] flex-col'>
                  <Typography variant='body2'>
                    {t('common:table.no_data')}
                  </Typography>
                </div>
              </TableCell>
            </Table>
          )}
        </Paper>
      )}
    </>
  )
}
export default CustomCompareTable
interface Difference {
  index: number
  value: any
  fieldName: string
  isChange: boolean
}
interface InvoiceLine {
  id: number
  sequence: number
  product: {
    id: number
    name: string
    sku: string
    uomId: number
    uomName: string
  }
  quantity: number
  uom: {
    id: number
    code: string
    name: string
  }
  unitPrice: number
  amountUntaxed: number
  amountTotal: number
  discount: number
  displayType: string
  note: string
  taxNames: string[]
}

// đẩy giá trị index và tên trường có sự khác biệt với main vào 1 mảng
const checkFieldDifference = (
  fieldName: keyof InvoiceLine,
  mainLine: InvoiceLine,
  changeLine: InvoiceLine,
  differences: Difference[],
  index: number
) => {
  if (fieldName === 'taxNames') {
    if (changeLine[fieldName]) {
      if (mainLine[fieldName].length !== changeLine[fieldName].length) {
        differences.push({
          index,
          value: changeLine[fieldName],
          fieldName,
          isChange: true,
        })
      }
    }
  }
  if (
    fieldName !== 'taxNames' &&
    mainLine[fieldName] !== changeLine[fieldName]
  ) {
    differences.push({
      index,
      value: changeLine[fieldName],
      fieldName,
      isChange: true,
    })
  }
}
// so sánh 2 mảng
const findDifferences = (
  mainLines: InvoiceLine[],
  changeLines: InvoiceLine[]
): Difference[] => {
  const differences: Difference[] = []
  const tempArr =
    mainLines.length > changeLines.length && changeLines.length === 0
      ? mainLines
      : changeLines
  tempArr.forEach((mainLine, index) => {
    const changeLine = changeLines.find((line) => line.id === mainLine.id)
    if (!changeLine || mainLines.length > changeLines.length) {
      differences.push({
        index,
        value: 'REMOVED',
        fieldName: '',
        isChange: true,
      })
    } else if (mainLines.length < changeLines.length) {
      if (mainLines[index]) {
        differences.push({
          index,
          value: '',
          fieldName: 'field',
          isChange: false,
        })
      } else
        differences.push({
          index,
          value: '',
          fieldName: 'field',
          isChange: true,
        })
    } else {
      checkFieldDifference(
        'quantity',
        mainLines[index],
        changeLine,
        differences,
        index
      )
      checkFieldDifference(
        'amountUntaxed',
        mainLines[index],
        changeLine,
        differences,
        index
      )
      checkFieldDifference(
        'amountTotal',
        mainLines[index],
        changeLine,
        differences,
        index
      )
      checkFieldDifference(
        'unitPrice',
        mainLines[index],
        changeLine,
        differences,
        index
      )
      checkFieldDifference(
        'discount',
        mainLines[index],
        changeLine,
        differences,
        index
      )
      checkFieldDifference(
        'taxNames',
        mainLines[index],
        changeLine,
        differences,
        index
      )
    }
  })
  return differences
}
//update vào 1 mảng mới change để render giá trị mới
const updateInvoiceLines = (arrDifferences: any[], invoiceChange: any[]) => {
  const result: any[] = invoiceChange
  arrDifferences.forEach((diff) => {
    const index = diff.index
    const fieldName = diff.fieldName
    const value = diff.value
    if (fieldName && fieldName !== '' && invoiceChange[index]) {
      invoiceChange[index][fieldName] = value
      invoiceChange[index].isChange = true
    } else {
      result.push({
        index,
        value: 'REMOVED',
        fieldName: '',
        isChange: true,
      })
    }
  })
  return result
}
export const TableCompareInfInvoice = ({
  data,
  isLoading,
  setShowCollapse,
}: {
  data: any
  isLoading: boolean
  setShowCollapse: any
}) => {
  let dataCompare: any
  if (data !== null) {
    const { createdBy, ...ObjCompare } = data
    dataCompare = ObjCompare
  }
  let array2 = dataCompare?.invoiceMain?.invoiceLines ?? []
  let array1 = dataCompare?.invoiceChange?.invoiceLines ?? array2

  const arrCheckDifferences = findDifferences(array2, array1)
  if (arrCheckDifferences.length > 0) {
    setShowCollapse(2)
  }
  const arrRender = updateInvoiceLines(arrCheckDifferences, array1) ?? []
  const render = (item: any, isColorRed: boolean) => {
    let color = isColorRed ? 'red' : ''
    if (
      typeof item === 'object' &&
      item?.fieldName === '' &&
      item?.value === 'REMOVED'
    ) {
      return <Typography color='red'>Đã xóa</Typography>
    }
    return (
      <>
        {item ? (
          <TableBody sx={{ '& .MuiTableRow-root': { borderBottom: 'none' } }}>
            <TableRow sx={{ borderBottom: 'none' }}>
              <TableCell sx={{ borderBottom: 'none' }}>Số lượng</TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                <Typography color={color}>
                  {item?.quantity} {item?.uom?.name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderBottom: 'none' }}>
              <TableCell sx={{ borderBottom: 'none' }}>Đơn giá</TableCell>
              <TableCell sx={{ borderBottom: 'none' }} color={color}>
                <Typography color={color}>
                  {
                    <CurrencyFormatCustom
                      amount={item?.unitPrice}
                      color={color}
                    />
                  }
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderBottom: 'none' }}>
              <TableCell sx={{ borderBottom: 'none' }}>Thuế</TableCell>
              <TableCell sx={{ borderBottom: 'none' }} color={color}>
                <Typography color={color}>
                  {item?.taxNames?.map((i: any) => {
                    return i
                  })}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow style={{ borderBottom: 'none' }}>
              <TableCell sx={{ borderBottom: 'none' }}>Khuyến mãi</TableCell>
              <TableCell sx={{ borderBottom: 'none' }} color={color}>
                <Typography color={color}> {item?.discount}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <Typography>N/A</Typography>
        )}
      </>
    )
  }
  return (
    <Table>
      <TableBody>
        {isLoading ? (
          <>Loading...</>
        ) : array2.length > 0 ? (
          arrRender?.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell className='w-[25%]'>
                <Typography color={GREEN} className='pl-10'>
                  Sản phẩm
                </Typography>
                <Typography color={BLACK} className='pl-20 pt-5'>
                  {item?.product?.name ?? array2[index]?.product?.name}
                </Typography>
              </TableCell>
              <TableCell className='w-1/3'>
                {arrCheckDifferences.length > 0
                  ? render(item, item?.isChange)
                  : render(item, false)}
              </TableCell>
              <TableCell className='w-1/3'>
                {render(array2[index], false)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <Table>
            <TableCell
              colSpan={3}
              variant='body'
              align='center'
              className='py-8'
            >
              <div className='flex justify-center min-h-[30px] flex-col'>
                <Typography variant='body2'>Không có dữ liệu</Typography>
              </div>
            </TableCell>
          </Table>
        )}
      </TableBody>
    </Table>
  )
}
