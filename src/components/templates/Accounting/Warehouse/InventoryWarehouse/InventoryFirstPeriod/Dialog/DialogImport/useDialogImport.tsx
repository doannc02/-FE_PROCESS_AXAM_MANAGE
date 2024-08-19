import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { GREEN, RED } from '@/helper/colors'
import { errorMsg, successMsg } from '@/helper/message'
import { truncateText } from '@/helper/truncateText'
import { useFormCustom } from '@/lib/form'
import {
  exportFileErrorApi,
  importExcelApi,
  submitDataValidApi,
} from '@/service/warehouse/inventoryFirstPeriod/list'
import { InventoryFirstPeriodImportExcel } from '@/service/warehouse/inventoryFirstPeriod/list/type'
import { Typography } from '@mui/material'
import { chunk } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { read, utils } from 'xlsx'
import { Props } from '.'

const defaultValues = {
  file: undefined,
  lineNumber: null,
  sheet: null,
}

const errors = {
  WAREHOUSE_CODE_NOT_FOUND: 'Không tìm thấy kho chứa có mã kho <warehouseCode>',
  LOCATION_CODE_NOT_FOUND: 'Không tìm thấy vị trí <locationCode>',
  PRODUCT_SKU_NOT_FOUND: 'Không tìm thấy sản phẩm có sku <productSku>',
  DUPLICATE_LOCATION: 'Tồn tại 2 vị trí trùng lặp trên 1 sản phẩm',
  QUANTITY_LOCATION_NOT_VALID:
    'Tổng số lượng theo vị trí khác với số lượng yêu cầu',
  QUANTITY_SERIAL_LOTS_INVALID:
    'Tổng số lượng theo lô khác với số lượng theo vị trí',
  LOT_CODE_NOT_EMPTY: 'Sản phẩm checking theo LÔ không được bỏ trống Mã Lô',
  LOT_QUANTITY_NOT_EMPTY:
    'Sản phẩm checking theo LÔ không được bỏ trống Số lượng theo lô',
  SERIAL_CODE_NOT_EMPTY:
    'Sản phẩm checking theo Serial không được bỏ trống Chi tiết theo serial',
  DUPLICATE_SERIAL: 'Nhập trùng serial trong chi tiết theo serial',
  PRODUCT_TYPE_NOT_VALID: 'Loại sản phẩm không hợp lệ với kho',
  LOCATION_MUST_BE_IN_THE_PHYSICAL: 'Vị trí import phải là vị trí vật lý',
  LOCATION_MUST_BE_IN_THE_WAREHOUSE: 'Vị trí import phải thuộc kho',
} as any

export const useDialogImport = (props: Props) => {
  const { refetch } = props
  const { hideDialog } = useDialog()
  const [file, setFile] = useState<File>()
  const [sheets, setSheets] = useState<{ value: number; label: string }[]>([])
  const [queryPage, setQueryPage] = useState<{
    page: number
    size: number
  }>({
    page: 0,
    size: 10,
  })
  const [dataRows, setDataRows] = useState<InventoryFirstPeriodImportExcel[]>(
    []
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const methodForm = useFormCustom<any>({ defaultValues })
  const { watch, setValue, handleSubmit } = methodForm
  const [sheet, lineNumber] = watch(['sheet', 'lineNumber'])

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const onSubmit = handleSubmit(async (input) => {
    setIsLoading(true)
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const res = await importExcelApi(formData, {
          sheet: input?.sheet?.value ?? 0,
          lineNumber: input?.lineNumber ?? 0,
        })

        if (res?.data?.length > 0) setDataRows(res?.data)
      }
    } catch (error) {
      errorMsg(error)
    }
    setIsLoading(false)
  })

  const handleDownloadTemplate = async () => {
    const url =
      'https://gateway.dev.afstech.vn/services/upload-service/public-files/warehouse/f-warehouse/root/null/95b8952e-fbf7-4dd5-85c8-a9bdf7fe9932.xlsx?content-disposition=ATTACHMENT'
    const link = document.createElement('a') // create a temporary link element
    link.href = url // set the link's href to the temporary URL
    document.body.appendChild(link) // add the link element to the page
    link.click() // trigger a click on the link to start the download
    document.body.removeChild(link) // remove the link element from the page
    URL.revokeObjectURL(url) // release the temporary URL
    // await writeFile(dataTemplate, 'file mẫu tồn kho đầu kỳ.xlsx')
    successMsg('Download success')
  }

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles?.length && selectedFiles?.length > 0) {
      setFile(selectedFiles?.[0])
    }
  }

  const { mutate: mutateInsertData, isLoading: isLoadingInsertData } =
    useMutation(submitDataValidApi, {
      onSuccess: (data) => {
        successMsg('Success')
        refetch()
        hideDialog()
      },
      onError: (error) => {
        errorMsg(error)
      },
    })

  const handleInsertData = async () => {
    mutateInsertData(dataRows.filter((x) => x?.errors?.length < 1))
  }

  const { mutate: mutateExport } = useMutation(exportFileErrorApi, {
    onSuccess: (data) => {
      const contentType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const blob = new Blob([data], { type: contentType })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'errors')
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
      successMsg('Download Success')
    },
    onError: (error) => {
      errorMsg(error)
    },
  })

  const handleDownloadFileErrors = async () => {
    mutateExport(
      dataRows
        ?.filter((x) => x?.errors?.length > 0)
        ?.map((item: any) => ({
          ...item,
          description:
            item?.errors?.length > 0
              ? item?.errors
                  ?.map((err: string) => {
                    let textError = errors[err]

                    if (textError) {
                      ;['warehouseCode', 'locationCode', 'productSku'].forEach(
                        (x) => {
                          if (textError.includes(x)) {
                            textError = textError.replace(x, item[x])
                          }
                        }
                      )
                    }
                    return textError
                  })
                  .join('\n')
              : '',
          status: 'Không hợp lệ',
        }))
    )
  }

  const columns = useMemo(
    () =>
      [
        {
          header: 'Dòng số',
          fieldName: 'index',
        },
        {
          header: 'Trạng thái',
          fieldName: 'status',
          render: (val) => {
            const isError = val?.errors?.length > 0
            return isError ? (
              <Typography variant='body1' sx={{ color: RED }}>
                Không hợp lệ
              </Typography>
            ) : (
              <Typography variant='body1' sx={{ color: GREEN }}>
                Hợp lệ
              </Typography>
            )
          },
        },
        {
          header: 'Chi tiết lỗi',
          fieldName: 'errors',
          render: (val) => {
            return truncateText(
              val?.errors?.length > 0 &&
                val?.errors?.map((i: string) => {
                  let textError = errors[i]

                  if (textError) {
                    ;['warehouseCode', 'locationCode', 'productSku'].forEach(
                      (x) => {
                        if (textError.includes(x)) {
                          textError = textError.replace(x, val[x])
                        }
                      }
                    )
                  }

                  return (
                    <Typography key={i} variant='body1'>
                      - {textError}
                    </Typography>
                  )
                })
            )
          },
        },
        {
          header: 'Kho chứa',
          fieldName: 'sourceProductType',
        },
        {
          header: 'Mã kho',
          fieldName: 'warehouseCode',
        },

        {
          header: 'SKU',
          fieldName: 'productSku',
        },
        {
          header: 'Số lượng',
          fieldName: 'demandQty',
        },
        {
          header: 'Vị trí',
          fieldName: 'locationCode',
        },
        {
          header: 'Số lượng theo vị trí',
          fieldName: 'locationQty',
        },
        {
          header: 'Số lượng theo lô',
          fieldName: 'lotsQty',
        },
        {
          header: 'Số lô',
          fieldName: 'lotsCode',
          styleCell: {
            style: {
              width: '70px',
            },
          },
        },
        {
          header: 'Số serial',
          fieldName: 'serialCode',
        },
      ] as ColumnProps[],
    []
  )

  useEffect(() => {
    const readFile = async () => {
      if (file) {
        const ab = await file.arrayBuffer()

        /* parse */
        const wb = read(ab)

        if (Array.isArray(wb?.SheetNames) && wb?.SheetNames?.length > 0) {
          setSheets(
            wb?.SheetNames?.map((item, index) => ({
              value: index,
              label: item,
            }))
          )
        }

        if (sheet?.label) {
          /* generate array of presidents from the first worksheet */
          const ws = wb.Sheets[sheet?.label] // get the first worksheet
          const data: any[] = utils.sheet_to_json<any>(ws) // generate objects

          if (Array.isArray(data) && data?.length > 0) {
            for (let i = 0; i < data?.length; i++) {
              // suggest find title line
              if (data[i]['__EMPTY'] === 'KHO CHỨA (*)') {
                setValue('lineNumber', data[i]['__rowNum__'] + 1)
                return
              }
            }
          }
        }
      }
    }

    readFile()
  }, [file, sheet, setValue])

  const chunkDataRows = chunk(dataRows, queryPage.size ?? 20)

  useEffect(() => {
    if (
      (chunkDataRows[queryPage.page ?? 0] ?? []).length < 1 &&
      queryPage.page > 0
    ) {
      setQueryPage((prev) => ({ ...prev, page: prev?.page - 1 }))
    }
  }, [chunkDataRows, queryPage])

  return [
    {
      methodForm,
      file,
      sheets,
      isLoading,
      isLoadingInsertData,
      dataRows,
      dataRowsTable: chunkDataRows[queryPage?.page],
      chunkDataRows,
      columns,
      queryPage,
      isStepTwo: dataRows.length > 0,
      errorLineNumber: dataRows?.filter((x) => x?.errors?.length > 0).length,
    },
    {
      handleChangeFile,
      handleDownloadTemplate,
      onSubmit,
      handleInsertData,
      handleDownloadFileErrors,
      onChangePageSize,
    },
  ] as const
}
