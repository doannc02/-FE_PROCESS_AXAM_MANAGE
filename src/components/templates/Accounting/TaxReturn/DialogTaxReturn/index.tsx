import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreLoading from '@/components/molecules/CoreLoading'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { taxReturnActionType } from '@/enum'
import { TaxReturn } from '@/service/accounting/taxReturn/taxReturn/getList/type'
import { CommonObject } from '@/service/type'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useDialogTaxReturn } from './useDialogTaxReturn'

export type Props = {
  taxReturn: TaxReturn
  fiscalYearId: number
  taxReturnConfig: CommonObject
}

export const DialogTaxReturn = ({
  taxReturn,
  taxReturnConfig,
  fiscalYearId,
}: Props) => {
  const [{ isLoading, addendumData, methods }, { t, hideDialog, onSubmit }] =
    useDialogTaxReturn(taxReturn, taxReturnConfig, fiscalYearId)

  const { control, watch, setValue } = methods

  return (
    <CoreDialog title={'Thông tin tính thuế'} width={600} onClose={hideDialog}>
      <Box className='px-20 mt-10'>
        <CoreAutocomplete
          control={control}
          name='taxValue01a'
          placeholder='Chọn danh mục'
          label='Danh mục ngành nghề'
          options={taxReturnActionType}
          isViewProp={false}
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />

        <div className='w-full mt-15'>
          <Typography>Phụ lục đi kèm</Typography>
        </div>

        <div className='flex flex-col gap-5 mt-10'>
          {isLoading ? (
            <CoreLoading />
          ) : (
            addendumData.map((ele) => (
              <CoreCheckbox
                key={ele.id}
                control={control}
                name=''
                label={ele.name}
                onChangeValue={(val: boolean) => {
                  let curVal = watch('addendumList')
                  if (val && !curVal.find((val) => val === ele.id)) {
                    curVal = [...curVal, ele.id]
                    setValue('addendumList', curVal)
                  } else if (!val && curVal.find((val) => val === ele.id)) {
                    curVal = curVal.filter((val) => val !== ele.id)
                    setValue('addendumList', curVal)
                  }
                }}
              />
            ))
          )}
        </div>

        <div className='flex justify-center gap-10 py-17'>
          <CoreButton
            theme='cancel'
            onClick={() => {
              hideDialog()
            }}
          >
            {t('common:btn.cancel')}
          </CoreButton>
          <CoreButton
            theme='submit'
            type='button'
            onClick={() => {
              onSubmit()
            }}
          >
            {t('common:btn.confirm')}
          </CoreButton>
        </div>
      </Box>
    </CoreDialog>
  )
}
