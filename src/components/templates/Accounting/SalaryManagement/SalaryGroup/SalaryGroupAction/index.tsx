import { useDialog } from '@/components/hooks/dialog/useDialog'
import useSalaryGroupAction from './useSalaryGroupAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { MENU_URL } from '@/routes'
import CoreLoading from '@/components/molecules/CoreLoading'
import { Grid } from '@mui/material'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreButton } from '@/components/atoms/CoreButton'
import { ActionType, TopAction } from '@/components/molecules/TopAction'
import { DialogDeleteSalaryGroup } from '../DialogDeleteSalaryGroup'
import typeEnum from '../../SalaryColumn/enum'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'

export const SalaryGroupAction = () => {
    const [values, handles] = useSalaryGroupAction()

    const {
        methods,
        router,
        isLoadingGetDetailSalaryColumn, loadingSubmit
    } = values

    const { showDialog } = useDialog()

    const { actionType, id } = router.query

    const { control } = methods

    const { t, onSubmit, onCancel } = handles

    let title
    let actionList: ActionType[]
    let titleNavbar = t("common:btn.add")

    switch (true) {
        case actionType == 'VIEW':
            title = t('management_salary.child.group_salary.view')
            titleNavbar = t("common:btn.view")
            actionList = ['edit', 'delete']
            break

        case !!id:
            title = t('management_salary.child.group_salary.edit')
            titleNavbar = t("common:btn.edit")
            actionList = ['delete']
            break

        default:
            title = t('management_salary.child.group_salary.add')
            actionList = []
            break
    }

    return (
        <PageContainer
            title={
                <CoreBreadcrumbs
                    breadcrumbs={[
                        {
                            title: t("management_salary.title"),
                        },
                        {
                            title: t("management_salary.child.group_salary.title"),
                            pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP
                        },
                        {
                            title,
                        },
                    ]}
                />
            }
        >
            <CoreNavbar
                breadcrumbs={
                    [{
                        title: titleNavbar,
                        content: !!id && isLoadingGetDetailSalaryColumn ? <CoreLoading /> :
                            <>
                                <form>
                                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <CoreInput
                                                control={control}
                                                name='code'
                                                label={t('management_salary.child.group_salary.code_column')}
                                                rules={{
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9]+$/,
                                                        message: t("management_salary.child.group_salary.regex")
                                                    },
                                                    maxLength: {
                                                        value: 25,
                                                        message: t("management_salary.child.group_salary.maxLength")
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <CoreInput
                                                control={control}
                                                name='name'
                                                label={t('management_salary.child.group_salary.name_column')}
                                                rules={{
                                                    required: t("common:validation.required"),
                                                    maxLength: {
                                                        value: 255,
                                                        message: t(`validation.number_max`)
                                                    }
                                                }}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <CoreAutocomplete
                                                name="groupColumnType"
                                                control={control}
                                                label="Nhóm loại cột lương"
                                                placeholder="Chọn nhóm loại cột lương"
                                                options={typeEnum("column_Type", t)}
                                                labelPath="label"
                                                valuePath="value"
                                                rules={{
                                                    required: t("common:validation.required"),
                                                }}
                                                required
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <CoreInput
                                                control={control}
                                                name='description'
                                                multiline
                                                label={t('management_salary.child.group_salary.description')}
                                            />
                                        </Grid>

                                    </Grid>
                                    {actionType !== "VIEW" && <div className='flex justify-center gap-10 py-20'>
                                        <CoreButton
                                            theme='cancel'
                                            onClick={() => {
                                                onCancel()
                                            }}
                                        >
                                            {t('common:btn.cancel')}
                                        </CoreButton>
                                        <CoreButton
                                            theme='submit'
                                            onClick={onSubmit}
                                            loading={loadingSubmit}
                                        >
                                           {!!id ? t('common:btn.confirm') : t('common:btn.add')}
                                        </CoreButton>
                                    </div>}
                                </form>
                            </>,

                        rightAction:
                            <TopAction
                                actionList={actionList}
                                onEditAction={() => {
                                    router.push({
                                        pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP + '/[id]',
                                        query: { id },
                                    })
                                }}
                                onViewAction={() => {
                                    router.push({
                                        pathname: MENU_URL.PAYROLL_MANAGEMENT.SALARY_GROUP + '/[id]',
                                        query: { id, actionType: 'VIEW' },
                                    })
                                }}
                                onDeleteAction={() => {
                                    showDialog(<DialogDeleteSalaryGroup id={Number(id)} />)
                                }

                                }
                            />
                    },
                    ]}
            />
        </PageContainer>
    )
}
