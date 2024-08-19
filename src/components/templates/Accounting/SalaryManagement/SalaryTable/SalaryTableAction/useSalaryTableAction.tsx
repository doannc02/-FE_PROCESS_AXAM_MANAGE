import { TRANSLATE } from "@/routes";
import { useGetAllHeaderTable } from "@/service/accounting/mangementSalaryTable/SalaryTable/get";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";



export default function useSalaryTableAction() {
  const { t } = useTranslation(TRANSLATE.SALARY_MANAGEMENT)
  const router = useRouter()
  const { id, actionType } = router.query
  const { data: getAllHeaderTable, isLoading: isLoadingGetAllHeaderTable } = useGetAllHeaderTable({ id: Number(id) })





  return [
    { router, getAllHeaderTable: getAllHeaderTable ? getAllHeaderTable.data : [], isLoadingGetAllHeaderTable }, {
      t
    }
  ] as const
}
