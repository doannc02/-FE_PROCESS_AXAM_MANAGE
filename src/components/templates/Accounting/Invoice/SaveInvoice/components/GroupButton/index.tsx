import { CoreButton } from '@/components/atoms/CoreButton'
import { AccountMoveDetail } from '@/service/accounting/accountMove/getDetail/type'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useSaveInvoice from '../../useSaveInvoice'
import { memo } from 'react'
import _ from 'lodash'

const GroupButton = ({ isLoadingSubmit }: { isLoadingSubmit: boolean }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { actionType } = router.query
  const methods = useFormContext<AccountMoveDetail>()
  const [
    { isUpdate, isLoadingSubmit: isLoadingSubmit1 },
    { onDraftSubmit, onCancel, checkValidateFn },
  ] = useSaveInvoice()
  const {
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = methods

  if (actionType === 'VIEW' || watch('state') === 'POSTED') return null

  return (
    <div className='space-x-12 text-center my-10'>
      <CoreButton theme='cancel' onClick={onCancel}>
        {t('common:btn.cancel')}
      </CoreButton>

      <CoreButton
        theme='draft'
        onClick={async () => {
          trigger()
          const input = getValues()
          checkValidateFn(input)
          if (!_.isEmpty(errors)) return

          onDraftSubmit(input)
        }}
        loading={isLoadingSubmit}
      >
        {t('common:btn.draft')}
      </CoreButton>

      <CoreButton theme='submit' type='submit' loading={isLoadingSubmit}>
        {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
      </CoreButton>
    </div>
  )
}

export default memo(GroupButton)
