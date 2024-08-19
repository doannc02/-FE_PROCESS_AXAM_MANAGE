import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useAccountingSystemConfigList from './useAccountingSystemConfigList'
import { Action } from '@/components/molecules/Action'
import { GREEN, ORANGE } from '@/helper/colors'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { exportAccountConfigFile } from '@/service/accounting/accountConfig/importFile/exportAccountConfigTemplateFile'
import { importAccountConfigFile } from '@/service/accounting/accountConfig/importFile/importAccountConfigFile'
import { DialogImportFile } from '../../../Dialog/DialogImportFile'
import { DialogImportHistoryConfig } from '../../../Dialog/DialogImportHistoryConfig'
import Image from 'next/image'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'

const AccountingSystemConfigList = () => {
  const { t } = useTranslation('accounting/accounting-system-config')

  const [values, handles] = useAccountingSystemConfigList()

  const { methodForm, columns, tableData, totalPages, size, page, isLoading } =
    values
  const { control, reset } = methodForm

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

          <div className='flex w-full flex-row-reverse gap-5'>
            <CoreButton
              theme='submit'
              onClick={() =>
                router.push(`${MENU_URL.CONFIG.ACCOUNTING.SYSTEM}/addNew`)
              }
            >
              {t('common:btn.add')}
            </CoreButton>

            <div
              className='flex items-center cursor-pointer'
              onClick={() =>
                showDialog(
                  <DialogImportFile
                    fetchDataExport={exportAccountConfigFile}
                    fetchDataImport={importAccountConfigFile}
                    refetch={refetch}
                    label='Update hệ thống tài khoản'
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
              onClick={() => showDialog(<DialogImportHistoryConfig />)}
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
        </form>

        <CustomTable
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          isShowColumnStt
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoading}
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.CONFIG.ACCOUNTING.SYSTEM}/[id]`,
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

export default AccountingSystemConfigList
