import { CoreBreadcrumbs } from "@/components/atoms/CoreBreadcrumbs";
import PageContainer from "@/components/organism/PageContainer";
import React from "react";
import useSalaryColumnAction from "./useSalaryColumnAction";
import CoreNavbar from "@/components/organism/CoreNavbar";
import { title } from "process";
import { TopAction } from "@/components/molecules/TopAction";
import { MENU_URL } from "@/routes";
import { Grid } from "@mui/material";
import CoreInput from "@/components/atoms/CoreInput";
import CoreAutocomplete from "@/components/atoms/CoreAutocomplete";
import { CoreButton } from "@/components/atoms/CoreButton";
import typeEnum from "../enum";
import CoreAutoCompleteAPI from "@/components/atoms/CoreAutoCompleteAPI";
import { getAllSalaryGroup } from "@/service/accounting/mangementSalaryTable/SalaryGroup/get";
import CoreLoading from "@/components/molecules/CoreLoading";
import { useDialog } from "@/components/hooks/dialog/useDialog";
import DialogDeleteSalaryColumn from "../DialogDeleteSalaryColumn";

export default function SalaryColumnAction() {
  const [values, handles] = useSalaryColumnAction()
  const { router, methodsForm, isLoadingGetDetailSalaryColumn, loadingSubmit } = values
  const { id, actionType } = router.query
  const { t, onSubmit, getValues, watch, setValue } = handles
  const { control, reset } = methodsForm
  const { showDialog } = useDialog()
  return <PageContainer
    title={
      <CoreBreadcrumbs isShowDashboard breadcrumbs={[
        { title: t("management_salary.title") },
        { title: t("management_salary.child.salary_column.title"), pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_COLUMN },
        {
          title: !!id ?
            actionType === "VIEW" ?
              t("management_salary.view") : t("management_salary.edit")
            : t("management_salary.add")
        }
      ]} />
    }
  >
    <CoreNavbar
      breadcrumbs={[
        {
          title: !!id ?
            (actionType === "VIEW" ?
              t("management_salary.view") : t("management_salary.edit")) : t("management_salary.add"),
          rightAction:
            <TopAction
              actionList={!!id ?
                actionType === "VIEW" ?
                  ['edit', 'delete'] : ['delete']
                : []}
              onEditAction={() => {
                router.push({
                  pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_COLUMN + '/[id]',
                  query: { id },
                })
              }}
              onViewAction={() => {
                router.push({
                  pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_COLUMN + '/[id]',
                  query: { id, actionType: 'VIEW' },
                })
              }}
              onDeleteAction={() => {
                showDialog(<DialogDeleteSalaryColumn id={{ id: Number(id) }} />)
              }
              }
            />,
          content:
            !!id && isLoadingGetDetailSalaryColumn ? <CoreLoading /> :
              <form onSubmit={onSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
                  <Grid item xs={12} sm={12} md={4} lg={4} >
                    <CoreInput
                      name="code"
                      label="Nhập mã cột lương"
                      control={control} rules={{
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: t("management_salary.child.group_salary.regex")
                        },
                      }} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} >
                    <CoreInput
                      name="name"
                      label="Nhập tên cột lương"
                      control={control}
                      rules={{
                         required: t("common:validation.required"),
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} >
                    <CoreAutoCompleteAPI
                      name="groupSalaryColumn"
                      control={control}
                      label="Nhóm cột lương"
                      labelPath="name"
                      valuePath="id"
                      placeholder="Chọn nhóm cột lương"
                      fetchDataFn={getAllSalaryGroup}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} >
                    <CoreAutocomplete
                      name="columnType"
                      control={control}
                      label="Loại cột lương"
                      placeholder="Chọn loại cột lương"
                      options={typeEnum("column_Type", t)}
                      labelPath="label"
                      valuePath="value"
                      rules={{
                         required: t("common:validation.required"),
                      }}
                      required
                      onChangeValue={() => {
                        setValue("incomeType", "")
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} >
                    <CoreAutocomplete
                      name="incomeType"
                      control={control}
                      label="Loại thu nhập"
                      placeholder="Chọn loại thu nhập"
                      options={typeEnum("income_Type", t, watch("columnType"))}
                      labelPath="label"
                      valuePath="value"
                      rules={{
                         required: t("common:validation.required"),
                      }}
                      required />
                  </Grid>
                </Grid>
                {!(actionType === "VIEW") && <div className='flex justify-center mt-15'>
                  <div className='m-5'>
                    <CoreButton theme='reset' type="submit" onClick={() => reset()}>
                      {t('common:btn.cancel')}
                    </CoreButton>
                  </div>
                  <div className='m-5'>
                    <CoreButton theme='submit' type='submit'>
                      {!id ? t('common:btn.add') : t('common:btn.edit')}
                    </CoreButton>
                  </div>
                </div>}
              </form>
        }
      ]} />
  </PageContainer>
}
