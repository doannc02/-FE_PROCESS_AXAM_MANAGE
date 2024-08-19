import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { errorMsg, successMsg } from '@/helper/message'
import { putApproveStatusReplacePolicy } from '@/service/accounting/debtGrantingPolicies/putApprove'
import { Box, Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'

const DialogCfApprove = ({
  id,
  policies,
  refetch,
}: {
  id: number
  policies: string[]
  refetch: any
}) => {
  const { t } = useTranslation()
  const { hideDialog } = useDialog()

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    putApproveStatusReplacePolicy,
    {
      onSuccess: (data) => {
        successMsg(t('common:message.success'))
        refetch()
      },
      onError: (error) => {
        errorMsg(error)
      },
    }
  )

  const onSubmit = async () => {
    mutate({
      id,
    })
    hideDialog()
  }

  let policyList = ''
  policies.forEach(
    (value, index) =>
      (policyList =
        policyList + value + (index === policies.length - 1 ? '.' : ', '))
  )

  return (
    <DialogCustom
      title=''
      onClose={hideDialog}
      width={520}
      formProps={{ onSubmit }}
    >
      <Box className='flex justify-center px-25 m-auto align-middle text-center'>
        <Typography
          style={{
            lineHeight: 1.5,
          }}
        >
          Thời gian diễn ra chính sách này đang bị trùng với chính sách
          <Link
            style={{
              textDecoration: 'none',
            }}
          >{` ${policyList}`}</Link>
          &nbsp;Bạn có muốn hủy các chính sách trên không?
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 py-17'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          {t('common:btn.cancel')}
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit} loading={isLoadingSubmit}>
          {t('common:btn.confirm')}
        </CoreButton>
      </div>
    </DialogCustom>
  )
}

export default DialogCfApprove
