import { ColumnProps } from "@/components/organism/CoreTable"
import { useFormCustom } from "@/lib/form"
import { TRANSLATE } from "@/routes"
import { useGetAllSalaryColumn } from "@/service/accounting/mangementSalaryTable/SalaryColumn/get"
import { ReqParamsSalaryColumn } from "@/service/accounting/mangementSalaryTable/SalaryColumn/get/type"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

const defaultValues = {
    search: "",
    paramType: ""
}

const useSalaryColumn = () => {
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const methodsForm = useFormCustom<ReqParamsSalaryColumn>({
        defaultValues
    })
    const { handleSubmit } = methodsForm
    const router = useRouter()
    const [queryPage, setQueryPage] = useState<ReqParamsSalaryColumn>({})

    const onChangePageSize = (val: any) => {
        const { page, size } = val
        console.log(val)
        const input = { ...queryPage, page, size }
        setQueryPage(input)
    }

    const { data: getAllSalaryColumn, isLoading: isLoadingGetAllSalaryColumn }
        = useGetAllSalaryColumn(queryPage)

    const tableData = (getAllSalaryColumn ? getAllSalaryColumn?.data?.content : []).map((item: any) => {
        return {
            ...item,
            paramType: item.paramType === "MANUAL" ? "Thủ công" : item.paramType === "SYSTEM" ? "Hệ thống" : ""
        }
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        setQueryPage({ ...data, groupSalaryColumnId: data?.groupSalaryColumn?.id })
    })

    const columns = useMemo(
        () =>
            [
                {
                    header: t('management_salary.child.salary_column.code'),
                    fieldName: 'code',
                },
                {
                    header: t('management_salary.child.salary_column.name'),
                    fieldName: 'name',
                },
                {
                    header: t('management_salary.child.salary_column.paramType'),
                    fieldName: 'paramType',
                },
                {
                    header: t('management_salary.child.salary_column.columnType'),
                    fieldName: 'groupSalaryColumn.name',
                }
            ] as ColumnProps[], [t]
    )

    return [
        {
            columns, methodsForm, tableData, isLoadingGetAllSalaryColumn, router,
            page: getAllSalaryColumn
                ? {
                    page: getAllSalaryColumn?.data?.page,
                    size: getAllSalaryColumn?.data?.size,
                    totalPages: getAllSalaryColumn?.data?.totalPages
                }
                : null,
        },
        { t, onSubmit, onChangePageSize }
    ] as const
}

export default useSalaryColumn