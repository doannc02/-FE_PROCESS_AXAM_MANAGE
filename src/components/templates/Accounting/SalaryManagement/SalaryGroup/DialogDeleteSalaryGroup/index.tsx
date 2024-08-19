import { useDialog } from "@/components/hooks/dialog/useDialog"
import useDialogDeleteSalaryGroup from "./useDialogDeleteSalaryGroup"
import { CoreDialog } from "@/components/organism/CoreDialog"
import { Box } from "lucide-react"
import { Typography } from "@mui/material"
import { CoreButton } from "@/components/atoms/CoreButton"



export type Props = {
  id: number
}

export const DialogDeleteSalaryGroup = ({ id }: Props) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteSalaryGroup(id)
  const { isLoading } = values
  const { t, onSubmit } = handles

  return (
    <CoreDialog title='' onClose={hideDialog} width={450}>
      <div className='flex justify-center max-w-[350px] m-auto align-middle text-center'>
        <Typography
          variant='subtitle1'
          style={{
            lineHeight: 1.5,
          }}
        >
          {t('management_salary.child.salary_column.delete')}
        </Typography>
      </div>

      <div className='flex justify-center gap-10 py-10'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          {t('common:btn.cancel')}
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit} loading={isLoading}>
          {t('common:btn.confirm')}
        </CoreButton>
      </div>
    </CoreDialog>
  )
}
