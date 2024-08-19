import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryGetTaxReturnDetail } from '@/service/accounting/taxReturn/taxReturn/get'
import { putTaxReturn } from '@/service/accounting/taxReturn/taxReturn/put'
import { SaveTaxReturn } from '@/service/accounting/taxReturn/taxReturn/put/type'
import { getDateNow } from '@/utils/date/date'
import { Typography } from '@mui/material'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export const useSaveTaxReturn = () => {
  const { t } = useTranslation(TRANSLATE.TAX_RETURN)
  const router = useRouter()
  const { id, actionType } = router.query

  const isView = actionType === 'VIEW'
  const methodForm = useFormCustom<SaveTaxReturn>({
    defaultValues: {
      state: 'DRAFT',
      taxStaffName: '',
      signerName: '',
      numberCertificate: '',
      signDate: getDateNow(),
    },
  })

  const { showDialog } = useDialog()
  const { handleSubmit, setError, reset, control, watch, setValue } = methodForm

  const { isLoading, data, refetch } = useQueryGetTaxReturnDetail(
    { id: Number(id) },
    {
      enabled: !!id,
    }
  )

  useEffect(() => {
    if (data?.data && id) {
      reset({
        ...data.data,
        ...data.data.valueParam,
        ...data.data.valueDecimal,
        valueParam: null,
        valueDecimal: null,
        value01b: data.data?.time,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data, id])

  const { mutate, isLoading: isLoadingSubmit } = useMutation(putTaxReturn, {
    onSuccess: (res) => {
      successMsg(t('common:message.success'))

      if (res?.data?.data?.id) {
        router.push({
          pathname: `${MENU_URL.TAX_RETURN}/[id]`,
          query: {
            id: res?.data?.data?.id,
            actionType: 'VIEW',
          },
        })
        refetch()
      }
    },
    onError: (error) => {
      errorMsg(error, setError)
    },
  })

  const onCancel = () => {
    router.back()
  }

  const onSubmit = handleSubmit(async (input) => {
    mutate({ ...input })
  })

  const handleCheck21 = () => {
    setValue('value32a', 0)
    setValue('value35', 0)
    setValue('value34a', 0)
    setValue('value36', 0)
    setValue('value37', 0)
    setValue('value38', 0)
    setValue('value39a', 0)
    setValue('value40a', 0)
    setValue('value40b', 0)
    setValue('value40', 0)
    setValue('value41', 0)
    setValue('value42a', 0)
    setValue('value42b', 0)
    setValue('value43', 0)
    setValue('value33a', 0)
    setValue('value31', 0)
    setValue('value30', 0)
    setValue('value33', 0)
    setValue('value32', 0)
    setValue('value23a', 0)
    setValue('value34', 0)
    setValue('value42', 0)
    setValue('value29', 0)
    setValue('value26', 0)
    setValue('value25', 0)
    setValue('value28', 0)
    setValue('value27', 0)
    setValue('value22', 0)
    setValue('value21', 0)
    setValue('value24', 0)
    setValue('value23', 0)
    setValue('value24a', 0)
    setValue('value32a', 0)
  }

  const onChangeValue40a = () => {
    const value =
      watch('value36') -
      watch('value22') +
      watch('value37') -
      watch('value38') -
      watch('value39a')

    setValue('value40a', value)
    setValue('value40', value - (watch('value40b') ?? 0))
  }

  const onChangeValue40b = () => {
    setValue('value40', (watch('value40a') ?? 0) - (watch('value40b') ?? 0))
  }

  const onChangeValue27 = () => {
    const value =
      (watch('value29') ?? 0) +
      (watch('value30') ?? 0) +
      (watch('value32') ?? 0) +
      (watch('value32a') ?? 0)

    setValue('value27', value)
    setValue('value34', (watch('value26') ?? 0) + value)
  }

  const dataTable = [
    {
      index: <Typography variant='subtitle1'>A</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Không phát sinh hoạt động mua, bán trong kỳ (đánh dấu “X”)
        </Typography>
      ),
      value: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[21]</Typography>
          <CoreCheckbox
            label={''}
            name={'isCheck21'}
            control={control}
            onChangeValue={(val: boolean) => {
              if (val) {
                handleCheck21()
              } else {
                if (data?.data && id) {
                  reset({
                    ...data.data,
                    ...data.data.valueParam,
                    ...data.data.valueDecimal,
                    valueParam: null,
                    valueDecimal: null,
                    value01b: data.data?.time,
                  })
                }
              }
            }}
          />
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>B</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Thuế giá trị gia tăng còn được khấu trừ kỳ trước chuyển sang
        </Typography>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[22]</Typography>

          {data?.data.valueDecimal?.value22 !== 0 ? (
            <CurrencyFormatCustom amount={watch('value22')} />
          ) : (
            <CoreInput
              type='number'
              name='value22'
              control={control}
              placeholder={'Nhập'}
              onChangeValue={debounce(onChangeValue40a, 1500)}
            />
          )}
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>C</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Kê khai thuế giá trị gia tăng phải nộp ngân sách nhà nước
        </Typography>
      ),
    },
    {
      index: <Typography variant='subtitle1'>I</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Hàng hóa, dịch vụ (HHDV) mua vào trong kỳ
        </Typography>
      ),
    },
    {
      index: <Typography variant='subtitle1'>1</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Giá trị và thuế giá trị gia tăng của hàng hóa, dịch vụ mua vào
        </Typography>
      ),
      value: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[23]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value23')} />
          ) : (
            <CoreInput
              type='number'
              name='value23'
              control={control}
              placeholder={'Nhập'}
            />
          )}
        </div>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[24]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value24')} />
          ) : (
            <CoreInput
              type='number'
              name='value24'
              control={control}
              placeholder={'Nhập'}
            />
          )}
        </div>
      ),
    },
    {
      targets: 'Trong đó: Hàng hóa, dịch vụ nhập khẩu',
      value: (
        <div className='flex gap-12 items-center'>
          <Typography variant='body1'>[23a]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value23a')} />
          ) : (
            <CoreInput
              type='number'
              name='value23a'
              control={control}
              placeholder={'Nhập'}
            />
          )}
        </div>
      ),
      tax: (
        <div className='flex gap-12 items-center'>
          <Typography variant='body1'>[24a]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value24a')} />
          ) : (
            <CoreInput
              type='number'
              name='value24a'
              control={control}
              placeholder={'Nhập'}
            />
          )}
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>2</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Thuế giá trị gia tăng của hàng hóa. dịch vụ mua vào được khấu trừ kỳ
          này
        </Typography>
      ),

      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[25]</Typography>
          <CurrencyFormatCustom amount={watch('value24')} />
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>II</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Hàng hóa, dịch vụ bán ra trong kỳ
        </Typography>
      ),
    },
    {
      index: <Typography variant='subtitle1'>1</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Hàng hóa, dịch vụ bán ra không chịu thuế giá trị gia tăng
        </Typography>
      ),
      value: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[26]</Typography>
          <CurrencyFormatCustom amount={watch('value26')} />
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>2</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Hàng hóa, dịch vụ bán ra chịu thuế giá trị gia tăng
          ([27]=[29]+[30]+[32]+[32a]; [28]=[31]+[33])
        </Typography>
      ),
      value: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[27]</Typography>
          <CurrencyFormatCustom amount={watch('value27')} />
        </div>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[28]</Typography>
          <CurrencyFormatCustom amount={watch('value31') + watch('value33')} />
        </div>
      ),
    },
    {
      index: 'a',
      targets: 'Hàng hóa, dịch vụ bán ra chịu thuế suất 0%',
      value: (
        <div className='flex gap-15 items-center'>
          <Typography variant='body1'>[29]</Typography>
          <CurrencyFormatCustom amount={watch('value29')} />
        </div>
      ),
    },
    {
      index: 'b',
      targets: 'Hàng hóa, dịch vụ bán ra chịu thuế suất 5%',
      value: (
        <div className='flex gap-15 items-center'>
          <Typography variant='body1'>[30]</Typography>
          <CurrencyFormatCustom amount={watch('value30')} />
        </div>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='body1'>[31]</Typography>
          <CurrencyFormatCustom amount={watch('value31')} />
        </div>
      ),
    },
    {
      index: 'c',
      targets: 'Hàng hóa, dịch vụ bán ra chịu thuế suất 10%',
      value: (
        <div className='flex gap-15 items-center'>
          <Typography variant='body1'>[32]</Typography>
          <CurrencyFormatCustom amount={watch('value32')} />
        </div>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='body1'>[33]</Typography>
          <CurrencyFormatCustom amount={watch('value33')} />
        </div>
      ),
    },
    {
      index: 'd',
      targets: 'Hàng hóa, dịch vụ bán ra không tính thuế',
      value: (
        <div className='flex gap-12 items-center'>
          <Typography variant='body1'>[32a]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value32a')} />
          ) : (
            <CoreInput
              type='number'
              name='value32a'
              control={control}
              placeholder={'Nhập'}
              onAfterChangeValue={debounce(onChangeValue27, 1500)}
            />
          )}
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>3</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Tổng doanh thu và thuế giá trị gia tăng của hàng hóa, dịch vụ bán ra
          ([34]=[26]+[27]; [35]=[28])
        </Typography>
      ),
      value: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[34]</Typography>
          <CurrencyFormatCustom amount={watch('value34')} />
        </div>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[35]</Typography>

          {isView ? (
            <CurrencyFormatCustom amount={watch('value35')} />
          ) : (
            <CurrencyFormatCustom
              amount={watch('value31') + watch('value33')}
            />
          )}
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>III</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Thuế giá tri gia tăng phát sinh trong kỳ ([36]=[35]-[25])
        </Typography>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[36]</Typography>

          {isView ? (
            <CurrencyFormatCustom amount={watch('value36')} />
          ) : (
            <CurrencyFormatCustom
              amount={(watch('value35') ?? 0) - (watch('value25') ?? 0)}
            />
          )}
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>IV</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Điều chỉnh tăng, giảm thuế giá trị gia tăng còn được khấu trừ của các
          kỳ trước
        </Typography>
      ),
    },
    {
      index: '1',
      targets: <Typography variant='body1'>Điều chỉnh giảm</Typography>,
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='body1'>[37]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value37')} />
          ) : (
            <CoreInput
              type='number'
              name='value37'
              control={control}
              placeholder={'Nhập'}
              onAfterChangeValue={debounce(onChangeValue40a, 1500)}
            />
          )}
        </div>
      ),
    },
    {
      index: '2',
      targets: <Typography variant='body1'>Điều chỉnh tăng</Typography>,
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='body1'>[38]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value38')} />
          ) : (
            <CoreInput
              type='number'
              name='value38'
              control={control}
              placeholder={'Nhập'}
              onAfterChangeValue={debounce(onChangeValue40a, 1500)}
            />
          )}
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>V</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Thuế giá trị gia tăng nhận bàn giao được khấu trừ trong kỳ
        </Typography>
      ),
      tax: (
        <div className='flex gap-12 items-center'>
          <Typography variant='subtitle1'>[39a]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value39a')} />
          ) : (
            <CoreInput
              type='number'
              name='value39a'
              control={control}
              placeholder={'Nhập'}
              onAfterChangeValue={debounce(onChangeValue40a, 1500)}
            />
          )}
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>VI</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          Xác định nghĩa vụ thuế giá trị gia tăng phải nộp trong kỳ:
        </Typography>
      ),
    },
    {
      index: '1',
      targets: (
        <Typography variant='body1'>
          {`Thuế giá trị gia tăng phải nộp của hoạt động sản xuất kinh doanh trong kỳ {[40a]=([36]-[22]+[37]-[38]-[39a]) ≥ 0}`}
        </Typography>
      ),
      tax: (
        <div className='flex gap-12 items-center'>
          <Typography variant='body1'>[40a]</Typography>
          <CurrencyFormatCustom amount={watch('value40a')} />
        </div>
      ),
    },

    {
      index: '2',
      targets: (
        <Typography variant='body1'>
          {`Thuế giá trị gia tăng mua vào của dự án đầu tư được bù trừ với thuế GTGT còn phải nộp của hoạt động sản xuất kinh doanh cùng kỳ tính thuế ([40b]<[40a])`}
        </Typography>
      ),
      tax: (
        <div className='flex gap-12 items-center'>
          <Typography variant='body1'>[40b]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value40b')} />
          ) : (
            <CoreInput
              type='number'
              name='value40b'
              control={control}
              placeholder={'Nhập'}
              onChangeValue={onChangeValue40b}
            />
          )}
        </div>
      ),
    },
    {
      index: '3',
      targets: (
        <Typography variant='body1'>
          {`Thuế giá trị gia tăng còn phải nộp trong kỳ ([40]=([40a]-[40b])`}
        </Typography>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='body1'>[40]</Typography>
          <CurrencyFormatCustom amount={watch('value40')} />
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>4</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          {`Thuế giá trị gia tăng chưa khấu trừ hết kỳ này {[41]=([36]-[22]+[37]-[38]-[39a])≤ 0`}
        </Typography>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[41]</Typography>
          <CurrencyFormatCustom amount={watch('value40a')} />
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>4.1</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          {`Thuế giá trị gia tăng đề nghị hoàn ([42] ≤ [41])`}
        </Typography>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[42]</Typography>
          <CurrencyFormatCustom amount={watch('value42')} />
        </div>
      ),
    },
    {
      index: '4.1.1',
      targets: `Thuế giá trị gia tăng đề nghị hoàn (Tài khoản 1331)`,
      tax: (
        <div className='flex gap-12 items-center'>
          <Typography variant='body1'>[42a]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value42a')} />
          ) : (
            <CoreInput
              type='number'
              name='value42a'
              control={control}
              placeholder={'Nhập'}
            />
          )}
        </div>
      ),
    },
    {
      index: '4.1.2',
      targets: `Thuế giá trị gia tăng đề nghị hoàn (Tài khoản 1332)`,
      tax: (
        <div className='flex gap-12 items-center'>
          <Typography variant='body1'>[42b]</Typography>
          {isView ? (
            <CurrencyFormatCustom amount={watch('value42b')} />
          ) : (
            <CoreInput
              type='number'
              name='value42b'
              control={control}
              placeholder={'Nhập'}
            />
          )}
        </div>
      ),
    },
    {
      index: <Typography variant='subtitle1'>4.2</Typography>,
      targets: (
        <Typography variant='subtitle1'>
          {`Thuế giá trị gia tăng còn được khấu trừ chuyển kỳ sau ([43]=[41]-[42])`}
        </Typography>
      ),
      tax: (
        <div className='flex gap-15 items-center'>
          <Typography variant='subtitle1'>[43]</Typography>

          {isView ? (
            <CurrencyFormatCustom amount={watch('value43')} />
          ) : (
            <CurrencyFormatCustom
              amount={
                watch('value36') -
                watch('value22') +
                watch('value37') -
                watch('value38') -
                watch('value39a') -
                watch('value42')
              }
            />
          )}
        </div>
      ),
    },
  ]

  const dataTable2: any = []
  const dataTable3: any = []

  return [
    {
      id: Number(id),
      isLoading,
      data: data?.data ?? null,
      methodForm,
      isLoadingSubmit,
      isView,
      dataTable,
      dataTable2,
      dataTable3,
    },
    { t, onCancel, onSubmit, showDialog },
  ] as const
}
