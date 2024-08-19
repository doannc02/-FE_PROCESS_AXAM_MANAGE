import { useDialog } from "@/components/hooks/dialog/useDialog";
import { errorMsg, successMsg } from "@/helper/message";
import { useFormCustom } from "@/lib/form"
import { MENU_URL, TRANSLATE } from "@/routes";
import { deleteSalaryColumn } from "@/service/accounting/mangementSalaryTable/SalaryColumn/action";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";

export const useDialogDeleteSalaryColumn = (id: { id: number }) => {
    const methodsForm = useFormCustom();
    const { handleSubmit, setError } = methodsForm
    const queryClient = useQueryClient()
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const router = useRouter()
    const { hideDialog } = useDialog()

    const { mutate, isLoading } = useMutation(deleteSalaryColumn, {
        onSuccess: () => {
            successMsg(t('common:message.success'))
            queryClient.invalidateQueries({ queryKey: MENU_URL.PAYROLL_MANAGEMENT.SALARY_COLUMN + "/list" })
            router.push(MENU_URL.PAYROLL_MANAGEMENT.SALARY_COLUMN)
        },
        onError: (error) => {
            errorMsg(error, setError)
        }
    })

    const onSubmit = handleSubmit((data) => {
        mutate(id)
        hideDialog()

    })
    return [
        { isLoading },
        { onSubmit, t, hideDialog }
    ] as const
}