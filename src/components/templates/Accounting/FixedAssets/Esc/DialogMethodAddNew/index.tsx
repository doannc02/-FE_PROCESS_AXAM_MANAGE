import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { CoreTable } from '@/components/organism/CoreTable'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import useDialogMethodAddNew from './useDialogMethodAddNew'

type Props = {
  title: string
  type: 'PURCHASE' | 'ASSET'
}

const DialogMethodAddNew = (props: Props) => {
  const { title, type } = props
  const router = useRouter()
  const { hideDialog, showDialog } = useDialog()
  const [values, handles] = useDialogMethodAddNew(type)
  const {
    methodForm,
    columns,
    tableData,
    codeIncrease,
    selectedProductId,
    isLoadingTable,
  } = values
  const { onSubmit, onChangePageSize, onReset, setProductIdsSelectedId } =
    handles
  const { control, setValue, watch } = methodForm
  const { typeToolAsset, typeIncreaseOrDecrease, typeAddNewRequest } =
    useCheckPath()
  const ckEscOrDescUrl = typeIncreaseOrDecrease === 'INCREASE' ? 'ESC' : 'DESC'

  return (
    <DialogCustom
      title={title}
      onClose={hideDialog}
      width={1000}
      formProps={{
        className: 'm-20',
      }}
    >
      <div className='w-full p-5'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreDatePicker
              control={control}
              name='start'
              placeholder='Chọn ngày bắt đầu'
              title='Từ ngày'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreDatePicker
              control={control}
              name='end'
              placeholder='Chọn ngày kết thúc'
              title='Đến ngày'
            />
          </Grid>
        </Grid>
      </div>

      <div className='flex justify-center gap-10 py-10'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            onReset()
          }}
        >
          Hủy
        </CoreButton>
        <CoreButton
          theme='submit'
          onClick={() => onSubmit()}
          loading={isLoadingTable}
        >
          Tìm kiếm
        </CoreButton>
      </div>
      <CoreTable
        isLoading={isLoadingTable}
        tableName='addNew'
        columns={columns}
        data={tableData}
      />
      <div className='flex justify-center gap-10 py-17'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          Hủy
        </CoreButton>
        <CoreButton
          disabled={selectedProductId === null}
          theme='submit'
          onClick={() => {
            hideDialog()
            router.replace({
              pathname: `${MENU_URL[typeToolAsset][ckEscOrDescUrl]}/handMade/addNew`,
              query: {
                typeAddNew: type,
                idProduct: selectedProductId,
                end: watch('end'),
                start: watch('start'),
                // quantity:
              },
            })
          }}
          loading={false}
        >
          Đồng ý
        </CoreButton>
      </div>
    </DialogCustom>
  )
}

export default DialogMethodAddNew
