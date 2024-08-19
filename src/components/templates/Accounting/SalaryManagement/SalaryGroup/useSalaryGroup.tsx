import { TopAction } from "@/components/molecules/TopAction"
import { ColumnProps } from "@/components/organism/CoreTable"
import { useFormCustom } from "@/lib/form"
import { MENU_URL, TRANSLATE } from "@/routes"
import { useGetAllSalaryGroup } from "@/service/accounting/mangementSalaryTable/SalaryGroup/get"
import { GroupSalaryDetail, ReqParamsGroupSalary } from "@/service/accounting/mangementSalaryTable/SalaryGroup/get/type"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

const defaultValues = {
    search: ""
}
const useSalaryGroup = () => {
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)

    const methodForm = useFormCustom<ReqParamsGroupSalary>({ defaultValues })

    const { handleSubmit, control, reset } = methodForm

    const [queryPage, setQueryPage] = useState<ReqParamsGroupSalary>()

    const onChangePageSize = (val: any) => {
        const { page, size } = val
        const input = { ...queryPage, page, size }
        setQueryPage(input)
    }

    const { data: getAllSalaryColumn, isLoading: isLoadingGetAllSalaryColumn } = useGetAllSalaryGroup(queryPage ?? {})

    const onSubmit = handleSubmit(async (input) => {
        const { search } = input
        setQueryPage({
            search: search
        })
    })

    const tableData = getAllSalaryColumn ? getAllSalaryColumn.data.content : []

    const columns = useMemo(
        () =>
            [
                {
                    header: t('management_salary.child.group_salary.code_column'),
                    fieldName: 'code',
                },
                {
                    header: t('management_salary.child.group_salary.name_column'),
                    fieldName: 'name',
                },
                {
                    header: t('management_salary.child.group_salary.description'),
                    fieldName: 'description',
                }
            ] as ColumnProps[], [t]
    )

    return [
        {
            t,
            columns,
            tableData: tableData ?? [],
            isLoadingGetAllSalaryColumn,
            page: getAllSalaryColumn
                ? {
                    page: getAllSalaryColumn?.data?.page,
                    size: getAllSalaryColumn?.data?.size,
                    totalPages: getAllSalaryColumn?.data?.totalPages
                }
                : null,
        },
        {
            onSubmit, control, onChangePageSize, reset
        }
    ] as const

}

export default useSalaryGroup