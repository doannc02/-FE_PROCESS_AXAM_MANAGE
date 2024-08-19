import { MAX_VALUE } from '@/helper/contain'
import { convertToDate } from '@/utils/date/convertToDate'
import { useFormCustom } from '@/lib/form'
import { useQueryGetFiscalYear } from '@/service/common/fiscalYear/getList'
import _ from 'lodash'
import moment from 'moment'
import { useState } from 'react'
const defaultValues = {
  page: 0,
  size: MAX_VALUE,
  start: convertToDate(moment().startOf('month'), 'YYYY-MM-DD'),
  end: convertToDate(moment().endOf('month'), 'YYYY-MM-DD'),
}
const useDialogSelectAllocation = () => {
  const methodForm = useFormCustom<any>({
    defaultValues,
  })
  const { watch, setValue, control } = methodForm
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const { data: dataAllocation } = useQueryGetFiscalYear({
    page: 0,
    size: MAX_VALUE,
  })

  const optionsFiscalYear = (dataAllocation?.data.content ?? []).map(
    (i, index) => [{ value: i.startFiscalYear }]
  )

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const onReset = () => {
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  return [{ methodForm }, { onSubmit, onReset, onChangePageSize }] as const
}

export default useDialogSelectAllocation
