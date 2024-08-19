import { CoreBreadcrumbs } from "@/components/atoms/CoreBreadcrumbs";
import PageContainer from "@/components/organism/PageContainer";
import React from "react";
import useSalaryTable from "./useSalaryTable";
import { Grid } from "@mui/material";
import CoreAutocomplete from "@/components/atoms/CoreAutocomplete";
import { CoreButton } from "@/components/atoms/CoreButton";
import CoreNavbar from "@/components/organism/CoreNavbar";
import SalaryTableComponent from "./Components/SalaryTable";
import { MENU_URL } from "@/routes";
import { useDialog } from "@/components/hooks/dialog/useDialog";
import ImportSalaryTable from "./DialogSalaryTable/Import";
import { DialogImportFile } from "../../Dialog/DialogImportFile";
import { exportAccountTypeFile } from "@/service/accounting/accountType/importFile/exportAccountTypeTemplateFile";
import { importAccountTypeFile } from "@/service/accounting/accountType/importFile/importAccountTypeFile";
import { exportSalaryTable, importSalaryTable } from "@/service/accounting/mangementSalaryTable/SalaryTable/action";

export default function SalaryTable() {
    const [values, handles] = useSalaryTable()
    const { control, router, breadcrumbs } = values
    const { t, onSubmit, reset } = handles
    const { showDialog } = useDialog()
    return <PageContainer title={<CoreBreadcrumbs
        isShowDashboard
        breadcrumbs={[

            {
                title: t("management_salary.title"),
            },
            {
                title: t("management_salary.child.salary_table.title"),
            }
        ]}
    />
    }>
        <div className="flex flex-col">
            <form onSubmit={onSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4}>
                        <CoreAutocomplete
                            name=""
                            control={control}
                            labelPath=""
                            valuePath=""
                            label={t("")}
                            placeholder="Chọn thời gian"
                            options={[]} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <CoreAutocomplete
                            name=""
                            control={control}
                            labelPath=""
                            valuePath=""
                            label={t("")}
                            placeholder="Chọn thời gian"
                            options={[]} />
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
            {/* <div className='flex my-2 justify-end gap-4 items-center'>
                <CoreButton
                    onClick={() =>
                        showDialog(<DialogImportFile
                            fetchDataExport={exportSalaryTable}
                            fetchDataImport={importSalaryTable}
                            refetch={() => {}}
                            label='Update bảng lương'
                        />)
                    }
                >
                    {t('common:btn.add')}
                </CoreButton>
            </div> */}
            <CoreNavbar
                breadcrumbs={breadcrumbs}
                minWidth="200px"
            />
        </div>
    </PageContainer >;
}
