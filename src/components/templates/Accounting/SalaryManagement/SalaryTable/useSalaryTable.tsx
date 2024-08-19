import { useFormCustom } from "@/lib/form";
import { TRANSLATE } from "@/routes";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SalaryTableComponent from "./Components/SalaryTable";

const templateSalaryTypes = [
    "DURATION",
    "PRODUCT",
    "OUTSOURCING",
    "TOTAL_OUTPUT",
    "MIXTURE",
    "FIXED",
]



const defaultValues = {
    search: "",
    templateSalaryType: "",
    page: 0,
    size: 20
}

export default function useSalaryTable() {
    const { t, } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
    const { control, handleSubmit, reset, watch } = useFormCustom<any>({ defaultValues })
    const router = useRouter()

    const breadcrumbs = useMemo(() => {
        const templateSalaryTypesNew = templateSalaryTypes.map((templateSalaryType, index) => {
            return {
                title: t(`management_salary.child.salary_table.${templateSalaryType}`),
                content: <SalaryTableComponent templateSalaryType={templateSalaryType} />
            }
        })
        return templateSalaryTypesNew
    }, [t])

    const onSubmit = handleSubmit(() => {

    })
    return [
        { control, router, breadcrumbs }, { t, onSubmit, reset }
    ] as const
}
