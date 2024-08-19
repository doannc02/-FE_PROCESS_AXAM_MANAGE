import { CoreBreadcrumbs } from "@/components/atoms/CoreBreadcrumbs";
import PageContainer from "@/components/organism/PageContainer";
import React from "react";
import useSalaryTemplate from "./useSalaryTemplate";
import { Grid } from "@mui/material";
import CoreInput from "@/components/atoms/CoreInput";
import { CoreButton } from "@/components/atoms/CoreButton";
import { CoreTable } from "@/components/organism/CoreTable";
import { MENU_URL } from "@/routes";
import DotThree from "@/components/icons/DotThree";
import { TopAction } from "@/components/molecules/TopAction";
import CoreAutocomplete from "@/components/atoms/CoreAutocomplete";
import { typeColumnTemplate } from "./enum";

export default function SalaryTemplate() {
    const [values, handles] = useSalaryTemplate()
    const { control, tableData, columns, router, isLoadingGetAllSalaryTemplate, page } = values
    const { t, reset, onSubmit, onChangePageSize } = handles
    return <PageContainer
        title={
            <CoreBreadcrumbs
                isShowDashboard
                breadcrumbs={[

                    {
                        title: t("management_salary.title"),
                    },
                    {
                        title: t("management_salary.child.salary_template.title"),
                    }
                ]}
            />
        }
    >
        <div className="flex flex-col">
            <form onSubmit={onSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CoreAutocomplete
                            name="templateType"
                            control={control}
                            label={t('common:form.search.label')}
                            placeholder="Tìm kiếm theo mẫu bảng lương"
                            options={typeColumnTemplate}
                            labelPath="label"
                            valuePath="value"
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
                        router.push(`/${MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE}/addNew`)
                    }
                >
                    {t('common:btn.add')}
                </CoreButton>
            </div>

            <CoreTable
                tableName='salaryTemplate'
                columns={columns}
                onChangePageSize={onChangePageSize}
                paginationHidden={tableData.length < 1}
                data={tableData}
                isShowColumnStt
                isLoading={isLoadingGetAllSalaryTemplate}
                {...page}
                onRowClick={(id) => {
                    router.push({
                        pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE + '/[id]',
                        query: { id, actionType: 'VIEW' },
                    })
                }}
            />
        </div>
    </PageContainer>;
}
