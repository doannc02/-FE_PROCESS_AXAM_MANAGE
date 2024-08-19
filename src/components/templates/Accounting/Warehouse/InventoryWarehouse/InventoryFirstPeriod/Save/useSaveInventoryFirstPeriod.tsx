import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { RemoveIcon } from '@/components/atoms/RemoveIcon'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { getDetailInventoryFirstPeriod } from '@/service/warehouse/inventoryFirstPeriod/getDetail'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DialogAddLot } from '../Dialog/DialogAddLot'
import { DialogAddSerialV2 } from '../Dialog/DialogAddSerialV2'
import { DialogDefaultDate } from '../Dialog/DialogDefautDate'
import { DialogDefaultDateEdit } from '../Dialog/DialogDefautDateEdit'
import { DialogEditLot } from '../Dialog/DialogEditLot'
import { DialogEditSerialV2 } from '../Dialog/DialogEditSerialV2'
import PlusIcon from '@/components/icons/PlusIcon'
import {
  postInventoryFirstPeriod,
  putInventoryFirstPeriod,
} from '@/service/warehouse/inventoryFirstPeriod/save'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RequestBody } from '@/service/warehouse/inventoryFirstPeriod/save/type'
import { getProductList2 } from '@/service/product/productController/getListProForToolsAsset'
import { getWarehouseLocation } from '@/service/warehouse/inventoryFirstPeriod/getListStockLocation'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useAppSelector } from '@/redux/hook'
import { getProductInventoryList } from '@/service/warehouse/inventoryFirstPeriod/getListProduct'

const defaultValues = {
  warehouseId: 0,
  sourceProductType: 'EXTERNAL',
  note: '',
  stockPickingLines: [
    {
      id: null,
      productId: null,
      toLocation: null,
      demandQty: 0,
      product: {
        id: 0,
        sku: '',
        name: '',
        upc: '',
        uom: {
          id: 0,
          name: '',
        },
        checkingType: '',
      },
      isOpacity: false,
      productManagementForm: '',
      serialLotLines: [],
      doneQty: 0,
      serialLotLineDeleteIds: [],
      destinationType: '',
      name: '',
      uomId: null,
    },
  ],
  pickingLineDeleteIds: [],
}

export const useSaveInventoryFirstPeriod = () => {
  const { t } = useTranslation(TRANSLATE.WARE_HOUSE)
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const { typeWareHouse } = useCheckPath()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [isLoadingSubmit, setLoadingSubmit] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { showDialog } = useDialog()
  const { currency } = useAppSelector((state) => state.companyConfigData)
  const methodForm = useFormCustom<RequestBody['POST']>({
    defaultValues,
  })

  const { control, handleSubmit, watch, formState, setError, setValue, reset } =
    methodForm

  const {
    fields: stockPickingLines,
    append,
    remove,
    insert,
  } = useFieldArray({
    control,
    name: 'stockPickingLines',
    keyName: 'key',
  })

  const handleGetDetailProduct = async (id: number) => {
    try {
      setLoading(true)
      const res = await getDetailInventoryFirstPeriod({ id }, typeWareHouse)
      console.log(res?.data, 'res')
      reset(res?.data)
      setLoading(false)
    } catch (e) {
      errorMsg(e)
      setLoading(false)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoadingSubmit(true)
      const res = isUpdate
        ? await putInventoryFirstPeriod({
            requestBody: { ...data, sourceDocument: 'ACC_FIRST_PERIOD' },
            typeWareHouse: typeWareHouse,
          })
        : await postInventoryFirstPeriod({
            requestBody: { ...data, sourceDocument: 'ACC_FIRST_PERIOD' },
            typeWareHouse: typeWareHouse,
          })
      successMsg(res.data?.message)
      router.push({
        pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.INVENTORY_FIRST_PERIOD}/[id]`,
        query: {
          id: res?.data?.data?.id,
          actionType: 'VIEW',
        },
      })
      setLoadingSubmit(false)
      setActiveStep(0)
      handleGetDetailProduct(res?.data?.data?.id)
    } catch (e) {
      errorMsg(e)
    }
  })

  // const handleOpenDialogWarning = () => {
  //   showDialog(<DialogWarning onSubmit={onSubmit} />)
  // }

  const onCancel = () => {
    router.back()
  }

  const [sourceProductType, warehouseId] = watch([
    'sourceProductType',
    'warehouseId',
  ])

  // const { data, isLoading } = useQueryGetDetailInventoryFirstPeriod(
  //   { id },
  //   { enabled: !!id }
  // )

  const handleChangeSerialLotLines = (newValue: any, index: number) =>
    setValue(`stockPickingLines.${index}.serialLotLines`, newValue)

  const handleChangeSerialLotLineDeleteIds = (newValue: any, index: number) => {
    setValue(`stockPickingLines.${index}.serialLotLineDeleteIds`, [
      ...watch(`stockPickingLines.${index}.serialLotLineDeleteIds`),
      newValue,
    ] as never)
  }

  const columnsStep1 = useMemo(
    () =>
      [
        {
          header: 'SKU/Tên Sản phẩm',
          fieldName: 'product',
        },
        {
          header: 'Số lượng yêu cầu',
          fieldName: 'demandQty',
        },
        ...(isView
          ? [
              {
                header: 'Thành tiền' + ` (${currency})`,
                fieldName: 'intoMoney',
              },
            ]
          : []),
        { header: '', fieldName: 'action' },
      ] as ColumnProps[],
    [isView, currency]
  )

  const columnsStep2 = useMemo(
    () =>
      [
        {
          header: 'SKU',
          fieldName: 'productSku',
        },
        {
          header: 'Tên sản phẩm',
          fieldName: 'productName',
        },
        {
          header: 'UPC code',
          fieldName: 'upcCode',
        },
        {
          header: 'Số lượng tồn',
          fieldName: 'demandQty',
        },
        {
          header: 'Kiểu nhập kho',
          fieldName: 'destinationType',
          styleCell: {
            width: '165px',
          },
        },
        {
          header: 'Vị trí kho',
          fieldName: 'toLocation',
          styleCell: {
            width: '165px',
          },
        },
        {
          header: 'Số lượng tồn theo vị trí',
          fieldName: 'doneQty',
          styleCell: {
            width: '125px',
          },
        },
        {
          header: '',
          fieldName: 'action',
          styleCell: {
            style: {
              width: '10px',
            },
          },
        },
        { header: 'Tổng  tiền' + ` (${currency})`, fieldName: 'sumMoney' },
      ] as ColumnProps[],
    [currency]
  )

  const stockPickingLinesDataStep2 = (watch('stockPickingLines') ?? []).map(
    (item, index) => {
      const productManagementFormWatch = watch(
        `stockPickingLines.${index}.product.checkingType`
      )
      const serialLotLinesValue = watch(
        `stockPickingLines.${index}.serialLotLines`
      )
      const sumMoney = serialLotLinesValue.reduce(function (a, b) {
        return a + b.unitPrice * b.quantity
      }, 0)

      const curValue = watch(`stockPickingLines.${index}`)

      let action: any
      if (productManagementFormWatch === 'DEFAULT') {
        action = (
          <div className='flex'>
            {serialLotLinesValue.length === 0 ? (
              <div
                className='flex cursor-pointer'
                onClick={() => {
                  if (watch(`stockPickingLines.${index}.doneQty`) < 1) {
                    errorMsg('Số lượng nhập thực tế phải lớn hơn 0.')
                    setError(`stockPickingLines.${index}.doneQty`, {
                      type: 'custom',
                      message: '',
                    })
                    return
                  }
                  if (
                    watch(`stockPickingLines.${index}.doneQty`) > item.demandQty
                  ) {
                    errorMsg(
                      'Số lượng nhập thực tế không được vượt quá số lượng.'
                    )
                    setError(`stockPickingLines.${index}.doneQty`, {
                      type: 'custom',
                      message: '',
                    })
                    return
                  }
                  if (item?.product?.id) {
                    showDialog(
                      <DialogDefaultDate
                        index={index}
                        productId={item.product.id}
                        doneQty={watch(`stockPickingLines.${index}.doneQty`)}
                        onChangeSerialLotLines={handleChangeSerialLotLines}
                        setValueLo={setValue}
                      />
                    )
                  }
                }}
              >
                <Action actionList={['add']} />
                <span className='text-[#00CC6A] w-22'>Thêm ngày nhập kho</span>
              </div>
            ) : (
              <Action
                actionList={isView ? ['watch'] : ['edit']}
                onEditAction={() => {
                  if (item?.product?.id)
                    showDialog(
                      <DialogDefaultDateEdit
                        index={index}
                        productId={item.product.id}
                        doneQty={watch(`stockPickingLines.${index}.doneQty`)}
                        data={
                          watch(
                            `stockPickingLines.${index}.serialLotLines`
                          ).map((ele) => ({
                            ...ele,
                            intoMoney: ele.quantity * ele.unitPrice ?? 0,
                          })) as any
                        }
                        onChangeSerialLotLines={handleChangeSerialLotLines}
                        setValueLo={setValue}
                        isView={isView}
                      />
                    )
                }}
                onWatchAction={() => {
                  if (item?.product?.id)
                    showDialog(
                      <DialogDefaultDateEdit
                        index={index}
                        productId={item.product.id}
                        doneQty={watch(`stockPickingLines.${index}.doneQty`)}
                        data={
                          watch(
                            `stockPickingLines.${index}.serialLotLines`
                          ).map((ele) => ({
                            ...ele,
                            intoMoney: ele.quantity * ele.unitPrice ?? 0,
                          })) as any
                        }
                        onChangeSerialLotLines={handleChangeSerialLotLines}
                        setValueLo={setValue}
                        isView={isView}
                      />
                    )
                }}
              />
            )}
            {item.destinationType === 'DIFF_LOCATION' && (
              <PlusIcon
                onClick={() => {
                  insert(index + 1, {
                    ...curValue,
                    id: null,
                    destinationType: 'DIFF_LOCATION',
                    isOpacity: true,
                    doneQty: 0,
                    serialLotLines: [],
                  })
                }}
              />
            )}

            {item.destinationType === 'DIFF_LOCATION' && item.isOpacity && (
              <RemoveIcon
                handleClick={() => {
                  remove(index)
                  const pickingLineDeleteIdsWatch = watch(
                    'pickingLineDeleteIds'
                  )
                  if (item.id)
                    setValue('pickingLineDeleteIds', [
                      ...pickingLineDeleteIdsWatch,
                      item.id,
                    ])
                }}
              />
            )}
          </div>
        )
      }

      if (productManagementFormWatch === 'SERIAL') {
        action = (
          <div className='flex'>
            {serialLotLinesValue.length === 0 ? (
              <div
                className='flex cursor-pointer'
                onClick={() => {
                  if (watch(`stockPickingLines.${index}.doneQty`) < 1) {
                    errorMsg('Số lượng nhập thực tế phải lớn hơn 0.')
                    setError(`stockPickingLines.${index}.doneQty`, {
                      type: 'custom',
                      message: '',
                    })
                    return
                  }
                  if (
                    watch(`stockPickingLines.${index}.doneQty`) > item.demandQty
                  ) {
                    errorMsg(
                      'Số lượng nhập thực tế không được vượt quá số lượng.'
                    )
                    setError(`stockPickingLines.${index}.doneQty`, {
                      type: 'custom',
                      message: '',
                    })
                    return
                  }
                  if (item?.product?.id) {
                    showDialog(
                      <DialogAddSerialV2
                        index={index}
                        productId={item.product.id}
                        doneQty={watch(`stockPickingLines.${index}.doneQty`)}
                        onChangeSerialLotLines={handleChangeSerialLotLines}
                        setValueSerial={setValue}
                      />
                    )
                  }
                }}
              >
                <Action actionList={['add']} />
                <span className='text-[#00CC6A] w-22'>Thêm số Serial</span>
              </div>
            ) : (
              <Action
                actionList={isView ? ['watch'] : ['edit']}
                onEditAction={() => {
                  if (item?.product?.id)
                    showDialog(
                      <DialogEditSerialV2
                        index={index}
                        productId={item.product.id}
                        doneQty={watch(`stockPickingLines.${index}.doneQty`)}
                        data={
                          watch(
                            `stockPickingLines.${index}.serialLotLines`
                          ).map((ele) => {
                            return {
                              ...ele,
                              intoMoney: ele.quantity * ele.unitPrice ?? 0,
                            }
                          }) as any
                        }
                        onChangeSerialLotLines={handleChangeSerialLotLines}
                        setValueSerial={setValue}
                        isView={isView}
                      />
                    )
                }}
                onWatchAction={() => {
                  if (item?.product?.id)
                    showDialog(
                      <DialogEditSerialV2
                        index={index}
                        productId={item.product.id}
                        doneQty={watch(`stockPickingLines.${index}.doneQty`)}
                        data={
                          watch(
                            `stockPickingLines.${index}.serialLotLines`
                          ).map((ele) => ({
                            ...ele,
                            intoMoney: ele.quantity * ele.unitPrice ?? 0,
                          })) as any
                        }
                        onChangeSerialLotLines={handleChangeSerialLotLines}
                        setValueSerial={setValue}
                        isView={isView}
                      />
                    )
                }}
              />
            )}

            {item.destinationType === 'DIFF_LOCATION' && (
              <PlusIcon
                onClick={() => {
                  insert(index + 1, {
                    ...curValue,
                    id: null,
                    destinationType: 'DIFF_LOCATION',
                    isOpacity: true,
                    doneQty: 0,
                    serialLotLines: [],
                  })
                }}
              />
            )}

            {item.destinationType === 'DIFF_LOCATION' && item.isOpacity && (
              <RemoveIcon
                handleClick={() => {
                  remove(index)
                  // const pickingLineDeleteIdsWatch = watch('pickingLineDeleteIds')
                  // if (item.id)
                  //   setValue('pickingLineDeleteIds', [
                  //     ...pickingLineDeleteIdsWatch,
                  //     item.id,
                  //   ])
                }}
              />
            )}
          </div>
        )
      }

      if (productManagementFormWatch === 'LOTS') {
        action = (
          <div className='flex'>
            {serialLotLinesValue.length === 0 ? (
              <div
                className='flex cursor-pointer'
                onClick={() => {
                  if (watch(`stockPickingLines.${index}.doneQty`) < 1) {
                    errorMsg('Số lượng nhập thực tế phải lớn hơn 0.')
                    setError(`stockPickingLines.${index}.doneQty`, {
                      type: 'custom',
                      message: '',
                    })
                    return
                  }
                  if (
                    watch(`stockPickingLines.${index}.doneQty`) > item.demandQty
                  ) {
                    errorMsg(
                      'Số lượng nhập thực tế không được vượt quá số lượng.'
                    )
                    setError(`stockPickingLines.${index}.doneQty`, {
                      type: 'custom',
                      message: '',
                    })
                    return
                  }
                  if (item?.product?.id)
                    showDialog(
                      <DialogAddLot
                        index={index}
                        productId={item.product.id}
                        doneQty={watch(`stockPickingLines.${index}.doneQty`)}
                        onChangeSerialLotLines={handleChangeSerialLotLines}
                        setValueLo={setValue}
                      />
                    )
                }}
              >
                <Action actionList={['add']} />
                <span className='text-[#00CC6A] w-22'>Thêm số Lô</span>
              </div>
            ) : (
              <Action
                actionList={isView ? ['watch'] : ['edit']}
                onEditAction={() => {
                  if (item?.product?.id)
                    showDialog(
                      <DialogEditLot
                        doneQty={watch(`stockPickingLines.${index}.doneQty`)}
                        index={index}
                        productId={item.product.id}
                        data={
                          watch(
                            `stockPickingLines.${index}.serialLotLines`
                          ).map((ele) => {
                            return {
                              ...ele,
                              intoMoney: ele.quantity * ele.unitPrice ?? 0,
                            }
                          }) as any
                        }
                        onChangeSerialLotLines={handleChangeSerialLotLines}
                        onChangeSerialLotLineDeleteIds={
                          handleChangeSerialLotLineDeleteIds
                        }
                        setValueLo={setValue}
                        isView={isView}
                      />
                    )
                }}
                onWatchAction={() => {
                  if (item?.product?.id)
                    showDialog(
                      <DialogEditLot
                        doneQty={watch(`stockPickingLines.${index}.doneQty`)}
                        index={index}
                        productId={item.product.id}
                        data={
                          watch(
                            `stockPickingLines.${index}.serialLotLines`
                          ).map((ele) => ({
                            ...ele,
                            intoMoney: ele.quantity * ele.unitPrice ?? 0,
                          })) as any
                        }
                        onChangeSerialLotLines={handleChangeSerialLotLines}
                        onChangeSerialLotLineDeleteIds={
                          handleChangeSerialLotLineDeleteIds
                        }
                        setValueLo={setValue}
                        isView={isView}
                      />
                    )
                }}
              />
            )}

            {item.destinationType === 'DIFF_LOCATION' && (
              <PlusIcon
                onClick={() => {
                  insert(index + 1, {
                    ...curValue,
                    destinationType: 'DIFF_LOCATION',
                    id: null,
                    isOpacity: true,
                    doneQty: 0,
                    serialLotLines: [],
                  })
                }}
              />
            )}
            {item.destinationType === 'DIFF_LOCATION' && item.isOpacity && (
              <RemoveIcon
                handleClick={() => {
                  remove(index)
                  // const pickingLineDeleteIdsWatch = watch('pickingLineDeleteIds')
                  // const id = item.id
                  // if (id)
                  //   setValue('pickingLineDeleteIds', [
                  //     ...pickingLineDeleteIdsWatch,
                  //     id,
                  //   ])
                }}
              />
            )}
          </div>
        )
      }

      return {
        productSku: item.isOpacity ? (
          <span className='opacity-50'>{item.product?.sku}</span>
        ) : (
          item.product?.sku
        ),
        productName: item.isOpacity ? (
          <span className='opacity-50'>{item.product?.name}</span>
        ) : (
          item.product?.name
        ),
        upcCode: item.isOpacity ? (
          <span className='opacity-50'>{item.product?.upc}</span>
        ) : (
          item.product?.upc
        ),
        uomName: item.isOpacity ? (
          <span className='opacity-50'>{item.product?.uom?.name}</span>
        ) : (
          item.product?.uom?.name
        ),
        demandQty: item.isOpacity ? (
          <span className='opacity-50'>
            {item.demandQty} {item.product?.uom?.name ?? ''}
          </span>
        ) : (
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Typography>
                {item.demandQty} {item.product?.uom?.name ?? ''}
              </Typography>
            </Box>
          </Box>
        ),
        destinationType: !item.isOpacity ? (
          <CoreAutocomplete
            control={control}
            name={`stockPickingLines.${index}.destinationType`}
            placeholder='Kiểu nhập kho'
            returnValueType='enum'
            disabled={watch(`stockPickingLines.${index}.isOpacity`)}
            inputProps={{ maxLength: 11 }}
            options={[
              {
                label: 'Khác vị trí',
                value: 'DIFF_LOCATION',
              },
              { label: 'Chung vị trí', value: 'SAME_LOCATION' },
            ]}
            onChangeValue={(value: any) => {
              if (value === 'SAME_LOCATION') {
                const productId = watch(
                  `stockPickingLines.${index}.product`
                )?.id
                const pickingLineDeleteIdsWatch = watch('pickingLineDeleteIds')
                let idDeleteArr = [] as number[]
                let indexDeleteArr = [] as number[]
                stockPickingLines.forEach((item, index) => {
                  if (
                    item.product.id === productId &&
                    item.isOpacity === true
                  ) {
                    // if (item.id !== null) idDeleteArr.push(item.id)
                    indexDeleteArr.push(index)
                  }
                })
                setValue('pickingLineDeleteIds', [
                  ...pickingLineDeleteIdsWatch,
                  ...idDeleteArr,
                ] as never)
                remove(indexDeleteArr)
              } else if (value === 'DIFF_LOCATION') {
                const line = watch(`stockPickingLines.${index}`)
                const positionInsert = stockPickingLines.findIndex(
                  (i) => i.product?.id === line.product?.id
                )
                insert(index + 1, {
                  ...line,
                  id: null,
                  destinationType: 'DIFF_LOCATION',
                  isOpacity: true,
                  doneQty: 0,
                  serialLotLines: [],
                })
              }
            }}
          />
        ) : (
          <span className='px-3 opacity-50'>Khác vị trí</span>
        ),
        toLocation: (
          <CoreAutoCompleteAPI
            control={control}
            name={`stockPickingLines.${index}.toLocation`}
            placeholder='Chọn vị trí'
            label=''
            // returnValueType='enum'
            // options={
            //   locationSelect?.filter(
            //     (x: any) => x?.type === 'STORAGE_OF_GOODS'
            //   ) ?? ''
            // }
            fetchDataFn={getWarehouseLocation}
            params={{
              locationType: 'STORAGE_OF_GOODS',
              warehouseId: watch('warehouseId'),
            }}
            type={typeWareHouse}
            disabled={!warehouseId}
            // filterOptions={(options: any) => {
            //   const locationIdsSelected = watchStockPickingLines
            //     ?.filter(
            //       (x) =>
            //         x?.productId ===
            //         watch(`stockPickingLines.${index}.productId`)
            //     )
            //     .map((i) => i?.toLocation?.id)
            //   return options.filter(
            //     (x: any) => !locationIdsSelected.includes(x?.value)
            //   )
            // }}
            // loading={isLoadingLocationSelect}
            // errCustom={
            //   !!formState.errors.stockPickingLines?.[index]?.toLocationId
            // }
          />
        ),
        doneQty: (
          <CoreInput
            placeholder='Số lượng'
            required
            type='number'
            control={control}
            name={`stockPickingLines.${index}.doneQty`}
            error={!!formState.errors.stockPickingLines?.[index]?.doneQty}
            helperText={
              formState.errors.stockPickingLines?.[index]?.doneQty?.message
            }
            InputProps={{
              endAdornment: (
                <Typography className='w-full text-right'>
                  {item?.product?.uom?.name ?? ''}
                </Typography>
              ),
            }}
          />
        ),
        action,
        sumMoney:
          actionType === 'VIEW' ? (
            sumMoney
          ) : (
            <CoreInput
              placeholder='Số lượng'
              required
              type='number'
              control={control}
              name={`stockPickingLines.${index}.sumMoney`}
              isViewProp
            />
          ),
      }
    }
  )

  const stockPickingLinesData = (stockPickingLines ?? []).map((item, index) => {
    const stockPickingLines = watch('stockPickingLines') ?? []
    const product = watch(`stockPickingLines.${index}.product`)
    if (actionType === 'VIEW') {
      return {
        product: item?.product?.name,
        demandQty: item?.demandQty + ' ' + item?.product?.uom?.name,
        unitPrice: (
          <>
            <CurrencyFormatCustom
              amount={item.serialLotLines.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.unitPrice,
                0
              )}
              variant='body1'
              className='contents'
            />
            &nbsp;/&nbsp;
            {item?.product?.uom?.name}
          </>
        ),
        intoMoney: (
          <>
            <CurrencyFormatCustom
              amount={item.serialLotLines.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.unitPrice * currentValue.quantity,
                0
              )}
              variant='body1'
              className='contents'
            />
          </>
        ),
      }
    }
    // const productSelectHandle = productSelect.filter(
    //   (v: any) =>
    //     !stockPickingLines.some(
    //       (v2, idx) => v2.productId === v.value && index !== idx
    //     )
    // )

    return {
      product: (
        <CoreAutoCompleteAPI
          control={control}
          name={`stockPickingLines.${index}.product`}
          label=''
          placeholder='Chọn sản phẩm'
          fetchDataFn={getProductInventoryList}
          params={{
            isGoods: true,
            isOEM: true,
            warehouseId  : watch(`warehouse.id`)
          }}
          readOnly={!!!watch('sourceProductType')}
          type={typeWareHouse}
          onChangeValue={(value) => {
            setValue(`stockPickingLines.${index}.product`, value)
            setValue(`stockPickingLines.${index}.productId`, value?.id)
            setValue(`stockPickingLines.${index}.uomId`, value?.uom?.id)
            setValue(
              `stockPickingLines.${index}.productManagementForm`,
              value?.productTemplateOutputDto?.managementForm
            )
          }}
          rules={{ required: t('common:validation.required') }}
        />
      ),
      demandQty: (
        <CoreInput
          control={control}
          name={`stockPickingLines.${index}.demandQty`}
          placeholder='Nhập số lượng'
          inputProps={{ maxLength: 11 }}
          // onChangeValue={(val) => {
          //   setValue(`stockPickingLines.${index}.doneQty`, val)
          // }}
          type='number'
          onKeyPress={(e: any) => {
            if (e.key === '.' || e.key === ',') {
              e.preventDefault()
            }
          }}
          InputProps={{
            endAdornment: (
              <Typography
                sx={{ fontSize: '12px' }}
                className='w-full text-right'
              >
                {product?.uom?.name ?? ''}
              </Typography>
            ),
          }}
          rules={{ required: t('common:validation.required') }}
        />
      ),
      action:
        actionType !== 'VIEW' ? (
          <Action
            key={item.key}
            actionList={['delete']}
            onDeleteAction={() => remove(index)}
          />
        ) : null,
    }
  })

  useEffect(() => {
    if (id) {
      handleGetDetailProduct(Number(id))
    }
  }, [id])

  return [
    {
      t,
      warehouseId,
      stockPickingLinesData,
      columnsStep1,
      columnsStep2,
      stockPickingLinesDataStep2,
      errors: formState.errors,
      stockPickingLines,
      methodForm,
      actionType,
      defaultValues,
      isLoading,
      isLoadingSubmit,
      isUpdate,
      activeStep,
      isView,
    },
    {
      onSubmit,
      onCancel,
      // handleOpenDialogWarning,
      setValue,
      append,
      setActiveStep,
    },
  ] as const
}
