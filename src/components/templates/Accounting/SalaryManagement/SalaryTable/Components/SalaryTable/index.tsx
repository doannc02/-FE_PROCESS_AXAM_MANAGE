import { CoreTable } from "@/components/organism/CoreTable";
import React from "react";
import SalaryTableTotal from "../SalaryTableTotal";
import useSalaryTableComp from "./useSalaryTableComp";
import { MENU_URL } from "@/routes";
type Props = {
    templateSalaryType: string
}
export default function SalaryTableComponent({ templateSalaryType, ...rest }: Props) {
    const [values, handles] = useSalaryTableComp();
    const { columns, tableData, router, totalAmount, isLoadingAllSalaryTable, page } = values
    const { onChangePageSize } = handles
    const { id, actionType } = router.query
    return <div>
        <CoreTable
            tableName="salaryTable"
            data={tableData}
            isLoading={isLoadingAllSalaryTable}
            columns={columns}
            onChangePageSize={onChangePageSize}
            paginationHidden={tableData.length < 1}
            actionTable={
                <SalaryTableTotal
                    isLoading={isLoadingAllSalaryTable}
                    totalAmount={totalAmount}
                />
            }
            {...page}
            onRowClick={(id) => {
                router.push({
                    pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_TABLE + "/[id]",
                    query: { id, actionType: "VIEW" }
                })
            }}
        />
    </div>;
}
