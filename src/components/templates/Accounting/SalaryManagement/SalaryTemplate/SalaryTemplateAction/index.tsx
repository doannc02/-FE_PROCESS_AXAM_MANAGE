import CoreAutoCompleteAPI from "@/components/atoms/CoreAutoCompleteAPI";
import { CoreBreadcrumbs } from "@/components/atoms/CoreBreadcrumbs";
import { CoreButton } from "@/components/atoms/CoreButton";
import CoreInput from "@/components/atoms/CoreInput";
import CoreRadioGroup from "@/components/atoms/CoreRadioGroup";
import { DatePickerCustom } from "@/components/atoms/DatePickerCustom";
import { TopAction } from "@/components/molecules/TopAction";
import CoreNavbar from "@/components/organism/CoreNavbar";
import { CoreTable } from "@/components/organism/CoreTable";
import PageContainer from "@/components/organism/PageContainer";
import { ActionTable } from "@/components/organism/TableCustomDnd/ActionTable";
import { MENU_URL } from "@/routes";
import { Grid, Typography } from "@mui/material";
import useSalaryTemplateAction from "./useSalaryTemplateAction";
import { getAllDepartment, getAllStaff } from "@/service/accounting/mangementSalaryTable/SalaryTemplate/get";
import { FormProvider } from "react-hook-form";
import CoreLoading from "@/components/molecules/CoreLoading";
import DialogDeleteSalaryTemplate from "../DialogDeleteSalaryTemplate";
import { CoreDatePicker } from "@/components/atoms/CoreDatePicker";

export default function SalaryTemplateAction() {
  const [values, handles] = useSalaryTemplateAction()
  const {
    control,
    router,
    radioTypeOptions,
    radioCycleOptions,
    radioObjectOptions,
    columns,
    tableData,
    methods,
    isLoadingDetailSalaryTemplate,
    isLoadingGetAllSalarySystemTemplate,
    isView
  } = values
  const { t, onSubmit, watch, append, showDialog, setValue } = handles
  const { id, actionType } = router.query

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
            pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE
          },
          {
            title: !!id ? actionType === "VIEW" ? "Xem chi tiết" : "Chỉnh sửa" : "Thêm mới"
          },
        ]}
      />
    }
  >
    <CoreNavbar
      breadcrumbs={
        [{
          title: !!id ? actionType === "VIEW" ? "Xem chi tiết" : "Chỉnh sửa" : "Thêm mới",
          content: isLoadingDetailSalaryTemplate ? <CoreLoading /> : <>
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CoreInput
                      control={control}
                      name='code'
                      label={t('management_salary.child.salary_template.code')}
                      rules={{
                        pattern: {
                          value: /^[a-zA-Z0-9_-]+$/,
                          message: t("management_salary.child.group_salary.regex")
                        },
                        maxLength: {
                          value: 25,
                          message: t("management_salary.child.group_salary.maxLength")
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CoreInput
                      control={control}
                      name='name'
                      label={t('management_salary.child.salary_template.name')}
                      rules={{
                        required: t("common:validation.required"),
                        maxLength: {
                          value: 255,
                          message: t(`common:validation.number_max`)
                        }
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CoreInput
                      control={control}
                      name='description'
                      multiline
                      label={t('management_salary.child.group_salary.description')}
                      rules={{
                        maxLength: {
                          value: 255,
                          message: t(`common:validation.number_max`)
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className="flex gap-10 items-center">
                      <Typography variant="subtitle1" sx={{ minWidth: 160 }}>Kiểu bảng lương:</Typography>
                      <CoreRadioGroup
                        sx={{ display: "flex", justifyContent: "start" }}
                        name="templateType"
                        control={control}
                        options={radioTypeOptions}
                        readOnly={isView}

                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="flex gap-10 items-center">
                      <Typography variant="subtitle1" sx={{ minWidth: 160 }}>Chu kì lương:</Typography>
                      <CoreRadioGroup
                        sx={{ display: "flex", justifyContent: "start" }}
                        name="loopType"
                        control={control}
                        options={radioCycleOptions}

                      />
                    </div>
                  </Grid>
                  {watch("loopType") && <Grid item xs={12} sm={12} md={4} lg={4}>
                    <CoreDatePicker
                      placeholder="Ngày bắt đầu chu kì"
                      name="startDate"
                      control={control}
                      format="YYYY-MM-DD"
                      variant="standard"
                      rules={{
                        required: t("common:validation.required")
                      }}
                      required
                      readOnly={isView}
                    />
                  </Grid>}
                  <Grid item xs={12}>
                    <div className="flex gap-10 items-center">
                      <Typography variant="subtitle1" sx={{ minWidth: 160 }}>Đối tượng áp dụng:</Typography>
                      <CoreRadioGroup
                        key={watch("applicableType")}
                        sx={{ display: "flex", justifyContent: "start" }}
                        name="applicableType"
                        control={control}
                        options={radioObjectOptions}
                        readOnly={isView}
                        onChangeValue={() => {
                          setValue("applicableData", [])
                        }}

                      />
                    </div>
                  </Grid>
                  {watch("applicableType") && watch("applicableType") !== "ALL" && <Grid item xs={12} sm={12} md={4} lg={4} >
                    <CoreAutoCompleteAPI
                      key={watch("applicableType")}
                      name="applicableData"
                      control={control}
                      label={`${watch("applicableType") !== "STAFF" ? "Phòng ban" : "Nhân viên"}`}
                      labelPath="name"
                      valuePath="id"
                      placeholder={`${watch("applicableType") !== "STAFF" ? "Chọn phòng ban" : "Chọn nhân viên"}`}
                      multiple
                      fetchDataFn={watch("applicableType") !== "STAFF" ? getAllDepartment : getAllStaff}
                      rules={{
                        required: t("common:validation.required")
                      }}
                      required
                    />
                  </Grid>}
                  <Grid item xs={12}>
                    <div className="flex flex-col">
                      <Typography variant="h6">Thành phần lương</Typography>
                      <Grid item xs={12}>
                        <div className="mt-10">
                          <CoreTable
                            tableName='salaryComponents'
                            data={tableData}
                            columns={columns}
                            paginationHidden
                            isLoading={isLoadingGetAllSalarySystemTemplate}
                            actionTable={
                              actionType ? <></> : <div className="flex gap-6">
                                <ActionTable
                                  action='Thêm cột lương'
                                  columns={columns}
                                  defaultValueLine={{
                                    salaryColumn: {},
                                    groupSalaryColumn: null,
                                    groupSalaryColumnItems: null
                                  }}
                                  append={!isView ? append : () => { }}
                                />
                                <ActionTable
                                  action='Thêm nhóm cột lương'
                                  columns={columns}
                                  defaultValueLine={{
                                    salaryColumn: null,
                                    groupSalaryColumn: {},
                                    groupSalaryColumnItems: null
                                  }}
                                  append={!isView ? append : () => { }}
                                />
                              </div>

                            }
                          />
                        </div>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
                {actionType === 'VIEW' ? null : <div className='flex justify-center gap-10 py-20'>
                  <CoreButton
                    theme='cancel'
                    onClick={() => {
                      !!id ? router.push({
                        pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE + '/[id]',
                        query: { id, actionType: 'VIEW' }
                      }) : router.push(`/${MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE}`)
                    }}
                  >
                    {t('common:btn.cancel')}
                  </CoreButton>
                  <CoreButton
                    theme='submit'
                    type='submit'
                  >
                    {!!id ? t('common:btn.confirm') : t('common:btn.add')}
                  </CoreButton>
                </div>}

              </form>
            </FormProvider>
          </>
          ,
          rightAction:
            <TopAction
              actionList={!!id ? actionType === "VIEW" ? ["edit", "delete"] : ["delete"] : []}
              onEditAction={() => {
                router.push({
                  pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_TEMPLATE + '/[id]',
                  query: { id },
                })
              }}
              onDeleteAction={() => {
                showDialog(<DialogDeleteSalaryTemplate id={Number(id)}
                />)
              }
              }
            />
        },
        ]}
    />
  </PageContainer >
}
