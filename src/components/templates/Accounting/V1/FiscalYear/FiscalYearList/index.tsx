import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { CustomTable } from '@/components/organism/TableCustom'
import { MENU_URL } from '@/routes'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import useFiscalYearList from './useFiscalYearList'

const FiscalYearList = () => {
  const { t } = useTranslation('accounting/fiscal-year')

  const [values, handles] = useFiscalYearList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
  } = values
  const { control, reset } = methodForm

  const { onSubmit, onChangePageSize, onReset } = handles
  const router = useRouter()
  return (
    <PageContainer
      title={
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-center'>
            <Typography variant='subtitle1'>{t('title')}</Typography>
          </div>
          <div></div>
        </div>
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <div>
            <CoreInput
              control={control}
              name='search'
              label={t('common:form.search.label')}
              placeholder={t('common:form.search.placeholder')}
            />
          </div>

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

        <CustomTable
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoadingTable}
          isShowColumnStt
        />
      </div>
    </PageContainer>
  )
}

export default FiscalYearList
