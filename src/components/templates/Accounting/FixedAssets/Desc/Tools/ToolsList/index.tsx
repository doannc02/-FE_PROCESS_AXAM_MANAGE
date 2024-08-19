import iconSearch from '@/assets/svg/iconSearch.svg'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid, IconButton } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useToolsList from './useToolsList'

const ToolsList = () => {
  const { t } = useTranslation('accounting/entry-list')
  const [values, handles] = useToolsList()

  const router = useRouter()

  const { methodForm, columns, tableData, totalPages, size, page, isLoading } =
    values

  const { control, reset, watch } = methodForm

  const { onSubmit, onChangePageSize, onReset } = handles

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: 'Ghi giảm CCDC',
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='search'
                label='Tìm kiếm'
                placeholder='Tìm kiếm theo mã hoặc tên'
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <Image alt='' src={iconSearch} />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='start'
                title='Ngày bắt đầu'
                placeholder='Chọn ngày bắt đầu'
                format='YYYY-MM-DD'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='end'
                title='Ngày kết thúc'
                placeholder='Chọn ngày kết thúc'
                format='YYYY-MM-DD'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
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

        <div className='py-4 flex justify-end gap-4 items-center'>
          <CoreButton
            theme='submit'
            onClick={() => {
              router.push({
                pathname: `${MENU_URL.TOOL.DESC}/addNew`,
              })
            }}
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>

        <CoreTable
          tableName='DescToolsList'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoading}
          onRowClick={(id: number, row: any) => {
            router.push({
              pathname: `${MENU_URL.TOOL.DESC}/[id]`,
              query: {
                id: id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}

export default ToolsList
