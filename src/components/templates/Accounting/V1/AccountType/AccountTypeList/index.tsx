import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { GREEN, ORANGE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { exportAccountTypeFile } from '@/service/accounting/accountType/importFile/exportAccountTypeTemplateFile'
import { importAccountTypeFile } from '@/service/accounting/accountType/importFile/importAccountTypeFile'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { DialogImportFile } from '../../../Dialog/DialogImportFile'
import { DialogImportHistoryType } from '../../../Dialog/DialogImportHistoryType'
import useAccountTag from './useAccountType'

const AccountTypeList = () => {
  const { t } = useTranslation('accounting/account-type')

  const [values, handles] = useAccountTag()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset, refetch } = handles
  const router = useRouter()
  const { showDialog } = useDialog()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('title'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
              />
            </Grid>
          </Grid>

          <div className='flex justify-center mt-15'>
            <div className='m-5'>
              <CoreButton onClick={onReset} theme='reset'>
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

        <div className='flex w-full flex-row-reverse mt-10 gap-5'>
          <CoreButton
            theme='submit'
            onClick={() =>
              router.push(`${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TYPE}/addNew`)
            }
          >
            {t('common:btn.add')}
          </CoreButton>

          <div
            className='flex items-center cursor-pointer'
            onClick={() =>
              showDialog(
                <DialogImportFile
                  fetchDataExport={exportAccountTypeFile}
                  fetchDataImport={importAccountTypeFile}
                  refetch={refetch}
                  label='Update loại tài khoản'
                />
              )
            }
          >
            <Action actionList={['export']} />
            <Typography
              variant='body1'
              style={{
                color: GREEN,
              }}
            >
              Nhập file excel
            </Typography>
          </div>

          <div
            className='flex items-center cursor-pointer'
            onClick={() => showDialog(<DialogImportHistoryType />)}
          >
            <Image
              src={require('@/assets/svg/clockWiseIcon.svg')}
              alt='import'
              width={16}
              height={16}
            />
            <Typography style={{ color: ORANGE, marginLeft: '2px' }}>
              Lịch sử Import
            </Typography>
          </div>
        </div>

        <CoreTable
          tableName='accountTypeLst'
          className='mt-5'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoadingTable}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.CONFIG.ACCOUNTING.ACCOUNT_TYPE}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default AccountTypeList
