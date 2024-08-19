import { useDialog } from "@/components/hooks/dialog/useDialog";
import { TopAction } from "@/components/molecules/TopAction";
import { ColumnProps } from "@/components/organism/CoreTable";
import { useFormCustom } from "@/lib/form";
import { MENU_URL, TRANSLATE } from "@/routes";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { errorMsg, successMsg } from "@/helper/message";
import { createSalaryTemplate, updateSalaryTemplate } from "@/service/accounting/mangementSalaryTable/SalaryTemplate/action";
import { ReqSalaryTemplateAction } from "@/service/accounting/mangementSalaryTable/SalaryTemplate/get/type";
import { useGetAllSalarySystemTemplate, useGetDetailSalaryTemplate } from "@/service/accounting/mangementSalaryTable/SalaryTemplate/get";
import TableSalaryTemplateAction from "../components/TableSalaryTemplateAction";

const defaultValues = {
    "code": "",
    "name": "",
    "description": "",
    "templateType": "DURATION",
    "loopType": "MONTH",
    "startDate": "",
    "applicableType": "ALL",
    "applicableData": [],
    "salaryTemplateColumns": [],
}

export default function useSalaryTemplateAction() {
    const methods = useFormCustom<ReqSalaryTemplateAction>({
        defaultValues
    })
    const queryClient = useQueryClient()
    const [isViewProp, setIsViewProp] = useState<boolean>(false)
    const { control, handleSubmit, watch, getValues, setValue, reset, setError, formState: { errors } } = methods
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const router = useRouter()
    const { id, actionType } = router.query
    const isUpdate = !!id

    const isView = actionType === 'VIEW'

    const { fields, remove, append } = useFieldArray({
        control,
        name: "salaryTemplateColumns",
        keyName: "salaryTemplateColumnId"
    })

    const { showDialog } = useDialog()

    const radioTypeOptions = useMemo(() => {
        return [
            {
                label: "Theo thời gian",
                value: "DURATION"
            },
            {
                label: "Theo sản phẩm",
                value: "PRODUCT"
            },
            {
                label: "Theo khoán",
                value: "OUTSOURCING"
            },
            {
                label: "Theo tổng sản lượng chung",
                value: "TOTAL_OUTPUT"
            },
            {
                label: "Theo 3P (hỗn hợp)",
                value: "MIXTURE"
            },
            {
                label: "Theo cố định",
                value: "FIXED"
            },
        ]
    }, [t])

    const { data: detailSalaryTemplate, isLoading: isLoadingDetailSalaryTemplate } = useGetDetailSalaryTemplate({ id: Number(id) }, { enabled: !!id })
    const { data: getAllSalarySystemTemplate, isLoading: isLoadingGetAllSalarySystemTemplate } = useGetAllSalarySystemTemplate(undefined, { enabled: !id })
    const { mutate, isLoading: isLoadingSalaryTemplate } = useMutation(!!id ? updateSalaryTemplate : createSalaryTemplate, {
        onSuccess: (data) => {
            successMsg(t('common:message.success'))
            queryClient.invalidateQueries({
                queryKey: ['api/v1/salary-template', data.data.id]
            })
            router.push({
                pathname: `${MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE}/[id]`,
                query: { id: data.data.id, actionType: 'VIEW' },
            })
        },
        onError: (error) => {
            errorMsg(error, setError)
        }
    })
    const onSubmit = handleSubmit((data) => {
        mutate(data)
    })

    useEffect(() => {
        if (detailSalaryTemplate) {
            reset(detailSalaryTemplate.data)
            return
        } else if (getAllSalarySystemTemplate) {
            setValue(
                "salaryTemplateColumns",
                getAllSalarySystemTemplate?.data.map(item => ({ salaryColumn: item }))
            );

            setIsViewProp(true)
            return
        }
    }, [detailSalaryTemplate, getAllSalarySystemTemplate])

    // console.log(getValues("salaryTemplateColumns"))

    const radioCycleOptions = useMemo(() => {
        return [
            {
                label: "Chu kỳ theo tháng",
                value: "MONTH"
            },
            {
                label: "Chu kỳ nửa tháng",
                value: "HAFT_MONTH"
            },
            {
                label: "Chu kỳ 2 tuần 1 lần",
                value: "TWO_TIME_A_WEEK "
            },
            {
                label: "Chu kỳ theo tuần",
                value: "WEEK"
            }
        ]
    }, [t])

    const radioObjectOptions = useMemo(() => {
        return [
            {
                label: "Tất cả",
                value: "ALL"
            },
            {
                label: "Phòng ban",
                value: "DEPARTMENT"
            },
            {
                label: "Cá nhân",
                value: "STAFF"
            }
        ]
    }, [t])
    const columns = useMemo(
        () =>
            [
                {
                    header: t('management_salary.child.salary_template.table.code'),
                    fieldName: 'code',
                },
                {
                    header: t('management_salary.child.salary_template.table.name'),
                    fieldName: 'name',
                },
                {
                    header: t('management_salary.child.salary_template.table.type'),
                    fieldName: 'columnType',
                },
                {
                    header: t('common:table.action'),
                    fieldName: 'action',
                }
            ] as ColumnProps[], [t]
    )
    const changeColumnType = useCallback((columnType: string) => {
        if (columnType === "DEFAULT") {
            return "Mặc định"
        }
        else if (columnType === "PLUS") {
            return "Khoản cộng"
        }
        else if (columnType === "MINUS") {
            return "Khoản trừ"
        } else {
            return ""
        }
    }, [])

    const tableData = fields.map((item: any, index: number) => {
        return {
            ...item.salaryColumn,
            columnType: item.salaryColumn ? changeColumnType(watch(`salaryTemplateColumns.${index}.salaryColumn.columnType`)) : null,
            name: item.salaryColumn ? watch(`salaryTemplateColumns.${index}.salaryColumn.name`) : null,
            code: <TableSalaryTemplateAction item={item} index={index} isAllowDelete={item?.salaryColumn?.isAllowDelete} isUpdate={isUpdate} />,
            action: !actionType && item?.salaryColumn?.isAllowDelete !== false ? (
                <div className='flex items-center gap-4'>
                    <TopAction
                        isShowText={false}
                        actionList={['delete']}
                        onDeleteAction={() => {
                            remove(index)
                        }}
                    />
                </div>
            ) : null,
        }
    })

    return [
        {
            control,
            router,
            radioTypeOptions,
            radioCycleOptions,
            radioObjectOptions,
            columns,
            tableData,
            fields,
            methods,
            isLoadingDetailSalaryTemplate,
            isLoadingGetAllSalarySystemTemplate,
            isView
        },
        {
            t,
            onSubmit,
            watch,
            setValue,
            reset,
            remove, append, showDialog
        }] as const
}
