import { ColumnProps } from "@/components/organism/CoreTable";
import { TRANSLATE } from "@/routes";
import { useGetAllSalaryTable } from "@/service/accounting/mangementSalaryTable/SalaryTable/get";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function useSalaryTableComp() {
    const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const router = useRouter()

    const [queryPage, setQueryPage] = useState<any>();

    const onChangePageSize = (val: any) => {
        const { page, size } = val
        const input = { ...queryPage, page, size }
        setQueryPage(input)
    }
    const { data: getAllSalaryTable, isLoading: isLoadingAllSalaryTable } = useGetAllSalaryTable(queryPage);

    const columns = useMemo(() =>
        [
            {
                header: t('management_salary.child.salary_table.code'),
                fieldName: 'code',
            },
            {
                header: t('management_salary.child.salary_table.salary_table'),
                fieldName: 'name',
            },
            {
                header: t('management_salary.child.salary_table.time'),
                fieldName: 'createdAt',
            },
            {
                header: t('management_salary.child.salary_table.applicableType'),
                fieldName: 'applicableType',
            },
            {
                header: t('management_salary.child.salary_table.salary_total'),
                fieldName: 'totalAmount',
            }
        ] as ColumnProps[], [t])

    const tableData = (getAllSalaryTable ? getAllSalaryTable?.data?.content : []).map((item: any, index: number) => {
        return {
            ...item,
            applicableType: item.applicableType === "DEPARTMENT" ? 'Phòng ban' : item.applicableType === "STAFF" ? "Nhân viên" : "Tất cả",
            createdAt: moment().format("DD/MM/YYYY")

        }
    })

    const totalAmount = useMemo(() => {
        const totalAmount = tableData.reduce((acc: any, cur: any) => {
            console.log(acc, cur.totalAmount)
            return acc + cur.totalAmount
        }, 0)

        return totalAmount
    }, [])

    return [
        { 
            columns, 
            tableData, 
            router, 
            totalAmount, 
            isLoadingAllSalaryTable ,
            page: getAllSalaryTable
            ? {
                page: getAllSalaryTable?.data?.page,
                size: getAllSalaryTable?.data?.size,
                totalPages: getAllSalaryTable?.data?.totalPages
            }
            : null,
        }, {
            onChangePageSize
        }
    ] as const
}
