import { errorMsg, successMsg } from "@/helper/message";
import { useFormCustom } from "@/lib/form";
import { MENU_URL, TRANSLATE } from "@/routes";
import { createSalaryColumn, updateSalaryColumn } from "@/service/accounting/mangementSalaryTable/SalaryColumn/action";
import { ReqSalaryColumnDetail } from "@/service/accounting/mangementSalaryTable/SalaryColumn/action/type";
import { getDetailSalaryColumn, useGetDetailSalaryColumn } from "@/service/accounting/mangementSalaryTable/SalaryColumn/get";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";

export default function useSalaryColumnAction() {
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const methodsForm = useFormCustom<ReqSalaryColumnDetail>();
    const { handleSubmit, setError, reset, getValues, watch, setValue } = methodsForm
    const router = useRouter()

    const id = Number(router.query.id)

    const queryClient = useQueryClient()

    const { data: getDetailSalaryColumn, isLoading: isLoadingGetDetailSalaryColumn } = useGetDetailSalaryColumn({ id: id }, { enabled: !!id })

    const { mutate, isLoading: loadingSubmit } = useMutation(id ? updateSalaryColumn : createSalaryColumn, {
        onSuccess: (data) => {
            successMsg(t('common:message.success'))
            if (data.data.id) {
                queryClient.invalidateQueries({
                    queryKey: ['api/v1/salary-column', data.data.id]
                });
                router.push({
                    pathname: `${MENU_URL.PAYROLL_MANAGEMENT.SALARY_COLUMN}/[id]`,
                    query: { id: data.data.id, actionType: 'VIEW' },
                })

            }
        },
        onError: (error) => {
            errorMsg(error, setError)
        },
    })

    useEffect(() => {
        if (getDetailSalaryColumn?.data) {
            reset(getDetailSalaryColumn.data)
        }
    }, [getDetailSalaryColumn])
    const onSubmit = handleSubmit(async (input) => {
        mutate(input)
    })
    return [
        { methodsForm, router, isLoadingGetDetailSalaryColumn, loadingSubmit },
        { t, onSubmit, getValues, watch, setValue }
    ] as const
}
