import { CoreBreadcrumbs } from "@/components/atoms/CoreBreadcrumbs";
import { CoreButton } from "@/components/atoms/CoreButton";
import CoreInput from "@/components/atoms/CoreInput";
import DotThree from "@/components/icons/DotThree";
import { TopAction } from "@/components/molecules/TopAction";
import PageContainer from "@/components/organism/PageContainer";
import React from "react";
import useSalaryGroup from "./useSalaryGroup";
import { Grid } from "@mui/material";
import { CoreTable } from "@/components/organism/CoreTable";
import { useRouter } from "next/router";
import { MENU_URL } from "@/routes";

export default function SalaryGroup() {
    const [values, handles] = useSalaryGroup()

    const router = useRouter()

    const { t, columns, tableData, isLoadingGetAllSalaryColumn, page } = values
    const { onSubmit, control, onChangePageSize, reset } = handles
    return <PageContainer
        title={
            <CoreBreadcrumbs
                isShowDashboard
                breadcrumbs={[
                    {
                        title: t("management_salary.title"),
                    },
                    {
                        title: t("management_salary.child.group_salary.title"),
                    },
                ]}
            />
        }
    >
        <div className='flex flex-col'>
            <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CoreInput
                            control={control}
                            name='search'
                            label={t('common:form.search.label')}
                            placeholder={t('management_salary.child.group_salary.placeholder.search')}
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
                        router.push(`/${MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP}/addNew`)
                    }
                >
                    {t('common:btn.add')}
                </CoreButton>
            </div>

            <CoreTable
                tableName='groupSalary'
                columns={columns}
                data={tableData}
                onChangePageSize={onChangePageSize}
                paginationHidden={tableData.length < 1}
                {...page}
                isLoading={isLoadingGetAllSalaryColumn}
                isShowColumnStt
                onRowClick={(id) => {
                    router.push({
                        pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP + '/[id]',
                        query: { id, actionType: 'VIEW' },
                    })
                }}
            />
        </div >
    </PageContainer >
}
