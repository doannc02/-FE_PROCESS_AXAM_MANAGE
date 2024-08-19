import { ColumnProps } from "@/components/organism/CoreTable";
import { useFormCustom } from "@/lib/form";
import { TRANSLATE } from "@/routes";
import { useGetAllSalaryTemplate } from "@/service/accounting/mangementSalaryTable/SalaryTemplate/get";
import { reqGetAllSalaryTemplate } from "@/service/accounting/mangementSalaryTable/SalaryTemplate/get/type";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function useSalaryTemplate() {
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const { control, reset, handleSubmit } = useFormCustom()
    const router = useRouter()

    const onSubmit = handleSubmit((data) => {
        setQueryPage(data)

    })

    const [queryPage, setQueryPage] = useState<reqGetAllSalaryTemplate>();

    const onChangePageSize = (val: any) => {
        const { page, size } = val
        const input = { ...queryPage, page, size }
        setQueryPage(input)
    }
    const { data: getAllSalaryTemplate, isLoading: isLoadingGetAllSalaryTemplate } = useGetAllSalaryTemplate(queryPage ?? {})

    const columns = useMemo(
        () =>
            [
                {
                    header: t('management_salary.child.salary_template.code'),
                    fieldName: 'code',
                },
                {
                    header: t('management_salary.child.salary_template.name'),
                    fieldName: 'name',
                },
                {
                    header: t('management_salary.child.salary_template.template'),
                    fieldName: 'templateType',
                },
                {
                    header: t('management_salary.child.salary_template.object'),
                    fieldName: 'applicableType',
                },
                {
                    header: t('management_salary.child.salary_template.quantity'),
                    fieldName: 'numberApplicable',
                },
                {
                    header: t('management_salary.child.salary_template.description'),
                    fieldName: 'description',
                }
            ] as ColumnProps[], [t]
    )

    const changeTemplateType = useCallback((templateType: string) => {
        if (templateType === "DURATION") {
            return "Theo thời gian"
        }
        else if (templateType === "PRODUCT") {
            return "Theo sản phẩm"
        }
        else if (templateType === "OUTSOURCING") {
            return "Theo khoán"
        }
        else if (templateType === "TOTAL_OUTPUT") {
            return "Theo tổng sản lượng chung"
        }
        else if (templateType === "MIXTURE") {
            return "Theo 3P (hỗn hợp)"
        }
        else if (templateType === "FIXED") {
            return "Theo cố định"
        }
        else {
            return ""
        }
    }, [])

    const tableData = (getAllSalaryTemplate ? getAllSalaryTemplate.data.content : []).map(item => {
        return {
            ...item,
            templateType: changeTemplateType(item.templateType),
            applicableType: item.applicableType === "DEPARTMENT" ? 'Phòng ban' : item.applicableType === "STAFF" ? "Nhân viên" : "Tất cả"
        }
    })
    return [{
        control, columns, tableData, router, isLoadingGetAllSalaryTemplate, page: getAllSalaryTemplate
            ? {
                page: getAllSalaryTemplate?.data?.page,
                size: getAllSalaryTemplate?.data?.size,
                totalPages: getAllSalaryTemplate?.data?.totalPages
            }
            : null,
    }, { t, reset, onSubmit, onChangePageSize }] as const
}
