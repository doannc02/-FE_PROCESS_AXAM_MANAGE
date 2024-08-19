import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { taxReturnState } from '@/enum'
import { RED } from '@/helper/colors'
import { TaxReturn } from '@/service/accounting/taxReturn/taxReturn/getList/type'
import { CommonObject } from '@/service/type'
import { Typography } from '@mui/material'
import { DialogTaxReturn } from '../DialogTaxReturn'
import DialogCfResetTaxReturn from '../DialogCfResetTaxReturn'

export const ButtonSetTaxReturn = ({
  taxReturn,
  fiscalYearId,
  taxReturnConfig,
}: {
  taxReturn: TaxReturn
  fiscalYearId: number
  taxReturnConfig: CommonObject
}) => {
  const { showDialog } = useDialog()

  if (taxReturn.id) {
    return (
      <div className='flex gap-16 items-center justify-center'>
        <Typography
          sx={{
            color: taxReturnState.find((e) => e.value === taxReturn.state)
              ?.color,
          }}
        >
          {taxReturnState.find((e) => e.value === taxReturn.state)?.label}
        </Typography>

        <CoreButton
          theme='reset'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            showDialog(<DialogCfResetTaxReturn taxReturn={taxReturn} />)
          }}
        >
          Reset
        </CoreButton>

        {/* {taxReturn.state === 'DRAFT' && (
          <CoreButton
            theme='reset'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              showDialog(<DialogCfResetTaxReturn taxReturn={taxReturn} />)
            }}
          >
            Reset
          </CoreButton>
        )} */}
      </div>
    )
  }

  return (
    <div className='flex gap-6 items-center justify-center'>
      <Typography
        sx={{
          color: RED,
        }}
      >
        Chưa lập
      </Typography>

      <CoreButton
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          showDialog(
            <DialogTaxReturn
              taxReturn={taxReturn}
              fiscalYearId={fiscalYearId}
              taxReturnConfig={taxReturnConfig}
            />
          )
        }}
      >
        Lập tờ khai
      </CoreButton>
    </div>
  )
}
