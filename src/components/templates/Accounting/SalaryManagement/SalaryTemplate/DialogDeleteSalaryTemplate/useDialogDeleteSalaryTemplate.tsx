import { useDialog } from "@/components/hooks/dialog/useDialog";
import { errorMsg, successMsg } from "@/helper/message";
import { useFormCustom } from "@/lib/form";
import { MENU_URL, TRANSLATE } from "@/routes";
import { deleteSalaryTemplate } from "@/service/accounting/mangementSalaryTable/SalaryTemplate/action";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";

export default function useDialogDeleteSalaryTemplate(id: number) {
    const { hideDialog } = useDialog()
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const methods = useFormCustom()
    const { handleSubmit, setError } = methods
    const queryClient = useQueryClient()
    const router = useRouter()

    const { mutate, isLoading } = useMutation(deleteSalaryTemplate, {
        onSuccess: () => {
            successMsg(t('common:message.success'))
            queryClient.invalidateQueries({ queryKey: MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE + "/list" })
            router.push(MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE)
        },
        onError: (error) => {
            errorMsg(error, setError)
        }
    })

    const onSubmit = handleSubmit(() => {
        mutate({ id: id })
        hideDialog()

    })
    return [
        { isLoading },
        {
            onSubmit,
            t,
            hideDialog
        }
    ] as const;
}
