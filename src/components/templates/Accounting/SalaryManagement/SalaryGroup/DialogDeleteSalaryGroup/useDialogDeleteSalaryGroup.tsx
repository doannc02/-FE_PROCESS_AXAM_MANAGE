import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { deleteSalaryGroup } from '@/service/accounting/mangementSalaryTable/SalaryGroup/action'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

const useDialogDeleteSalaryGroup = (id: number) => {
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const { hideDialog } = useDialog()

    const router = useRouter()

    const queryClient = useQueryClient()

    const { handleSubmit, setError } = useFormCustom()

    const { mutate, isLoading } = useMutation(deleteSalaryGroup, {
        onSuccess: () => {
            successMsg(t('common:message.success'))
            queryClient.invalidateQueries({ queryKey: MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP + "/list" })
            router.push(MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP)
        },
        onError: (error) => {
            errorMsg(error, setError)
        },
    })

    const onSubmit = handleSubmit(async () => {
        mutate({ id })
        hideDialog()
    })
    return [{ isLoading }, { t, onSubmit }] as const
}

export default useDialogDeleteSalaryGroup
