import { CoreBreadcrumbs } from "@/components/atoms/CoreBreadcrumbs";
import PageContainer from "@/components/organism/PageContainer";
import React from "react";
import useSalaryColumn from "./useSalaryColumn";
import { Grid } from "@mui/material";
import CoreInput from "@/components/atoms/CoreInput";
import { CoreButton } from "@/components/atoms/CoreButton";
import { CoreTable } from "@/components/organism/CoreTable";
import { TopAction } from "@/components/molecules/TopAction";
import DotThree from "@/components/icons/DotThree";
import { MENU_URL } from "@/routes";
import { getAllSalaryGroup } from "@/service/accounting/mangementSalaryTable/SalaryGroup/get";
import CoreAutoCompleteAPI from "@/components/atoms/CoreAutoCompleteAPI";
import CoreAutocomplete from "@/components/atoms/CoreAutocomplete";
import typeEnum from "./enum";

export default function SalaryColumn() {

    const [values, handles] = useSalaryColumn()
    const { columns, methodsForm, tableData, isLoadingGetAllSalaryColumn, router, page } = values
    const { t, onSubmit, onChangePageSize } = handles
    const { control, reset } = methodsForm
    return (
        <PageContainer title={
            <CoreBreadcrumbs isShowDashboard breadcrumbs={[
                { title: t("management_salary.title") },
                { title: t("management_salary.child.salary_column.title") }
            ]} />
        }>
            <div className="flex flex-col">
                <form onSubmit={onSubmit}>
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreInput
                                name="search"
                                control={control}
                                label={t('common:form.search.label')}
                                placeholder={t("management_salary.child.salary_column.placeholder.search_column")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutocomplete
                                name="paramType"
                                control={control}
                                label={t('common:form.search.label')}
                                labelPath="label"
                                valuePath="value"
                                placeholder="Chọn loại tham số"
                                options={typeEnum("params_Type", t, "params_Type")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <CoreAutoCompleteAPI
                                name="groupSalaryColumn"
                                control={control}
                                label={t('common:form.search.label')}
                                labelPath="code"
                                valuePath="id"
                                placeholder="Chọn mã nhóm cột lương"
                                fetchDataFn={getAllSalaryGroup}
                            />
                        </Grid>
                    </Grid>
                    <div className='flex justify-center mt-15'>
                        <div className='m-5'>
                            <CoreButton theme='reset' onClick={() => reset()}>
                                Reset
                            </CoreButton>
                        </div>
                        <div className='m-5'>
                            <CoreButton theme='submit' type='submit'>
                                {t('common:Search')}
                            </CoreButton>
                        </div>
                    </div>
                </form>

                <div className='py-4 flex justify-end gap-4 items-center'>
                    <TopAction actionList={['import', 'export']} />
                    <DotThree className='mt-3' onClick={() => { }} />
                    <CoreButton
                        onClick={() =>
                            router.push(`${MENU_URL.PAYROLL_MANAGEMENT.SALARY_COLUMN}/addNew`)
                        }
                    >
                        {t('common:btn.add')}
                    </CoreButton>
                </div>

                <CoreTable
                    tableName='salaryColumn'
                    columns={columns}
                    data={tableData}
                    onChangePageSize={onChangePageSize}
                    paginationHidden={tableData.length < 1}
                    {...page}
                    isLoading={isLoadingGetAllSalaryColumn}
                    isShowColumnStt
                    onRowClick={(id) => {
                        router.push({
                            pathname: `${MENU_URL.PAYROLL_MANAGEMENT.SALARY_COLUMN}/[id]`,
                            query: { id, actionType: 'VIEW' },
                        })
                    }}
                />
            </div>
        </PageContainer>
    )
}
