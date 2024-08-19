import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useDialogEditSerial } from './useDialogEditSerial'
import { is } from 'date-fns/locale'
import SerialItem from '../DialogAddSerialV2/SerialItem'

export type DialogEditSerialProps = {
  productId: number
  index: number
  doneQty: number
  data: {
    id: number
    serialLots: {
      id: number
      code: string
    }
    quantity: number
    receiveDate: string
    unitPrice: number
    intoMoney: number
    parent: {
      lotSerialId: number
      lotSerialCode: string
    }
    product: {
      id: number
      name: string
    }
    name: string
  }[]
  onChangeSerialLotLines: (newValue: any, index: number) => void
  setValueSerial: any
  isView: boolean
}
export const DialogEditSerialV2 = (props: DialogEditSerialProps) => {
  const [values, handles] = useDialogEditSerial(props)
  const { hideDialog } = useDialog()
  const { doneQty, isView } = props
  const {
    // isLoading,
    // serialSelect,
    data,
    formContext,
    billData,
    dataAutoGenerateSerial,
    dataAutoGenerateSerialChildren,
    fields,
  } = values

  const { onSubmit } = handles
  const { reset, watch, setValue, trigger, getValues } = formContext

  const listSerial = watch('serialLotLines') ?? []

  return (
    <DialogCustom
      title='Chỉnh sửa số Serial'
      onClose={hideDialog}
      width={1000}
      formProps={{ onSubmit, className: 'mx-15 mb-15' }}
    >
      {!isView && (
        <div className='flex flex-row items-center'>
          <CheckboxCustom
            formProps={{
              label: 'Tạo số serial theo cách tự động',
              name: 'checkbox',
            }}
            checkboxProps={{
              onChange: (_, value) => {
                if (value) {
                  const newValue = listSerial.map(
                    (item: any, index: number) => ({
                      // id: item.id,
                      // lotId: null,
                      // lotType: item.lotType,
                      // quantity: item.quantity ?? 1,
                      // lotCode: dataAutoGenerateSerial?.[index],
                      name: '',
                      disable: true,
                      id: item.id,
                      serialLots: {
                        id: null,
                        code: dataAutoGenerateSerial?.[index],
                      },
                      quantity: item.quantity ?? 1,
                      receiveDate: '',
                      unitPrice: 0,
                      intoMoney: 0,
                      serialChildren: item.serialChildren?.map(
                        (item2: any, index2: number) => {
                          return {
                            ...item2,
                            id: item2.id,
                            serialLots: {
                              id: null,
                              code:
                                dataAutoGenerateSerialChildren?.[index]?.[
                                  index2
                                ] ?? '',
                            },
                            unitPrice: 0,
                            intoMoney: 0,
                            quantity: item2.quantity ?? 1,
                            name: null,
                            disable: true,
                          }
                        }
                      ),
                    })
                  )
                  setValue('serialLotLines', newValue)
                } else setValue('serialLotLines', data)
                trigger('serialLotLines')
              },
            }}
          />
        </div>
      )}

      <FormProvider {...formContext}>
        <div className='max-h-[330px] overflow-auto mb-6'>
          {fields.map((field: any, i: number) => {
            const serialLotLines = watch('serialLotLines') ?? []
            // const optionSerialSelectHandle = serialSelect.filter(
            //   (v) =>
            //     !serialLotLines.some(
            //       (v2: any, idx: number) => v2.lotId === v.value && i !== idx
            //     )
            // )
            return (
              <SerialItem
                item={field as any}
                index={i}
                key={i}
                billData={billData}
                optionSerialSelectHandle={[]}
                doneQty={doneQty}
                isView={isView}
              />
            )
          })}
        </div>
        {!isView ? (
          <>
            {' '}
            <Grid
              item
              xs={12}
              style={{ paddingTop: 10 }}
              className='flex flex-row items-center justify-center gap-10'
            >
              <CoreButton onClick={hideDialog} theme='cancel'>
                HUỶ
              </CoreButton>
              <CoreButton theme='submit' type='submit'>
                Lưu thay đổi
              </CoreButton>
            </Grid>
          </>
        ) : null}
      </FormProvider>
    </DialogCustom>
  )
}
