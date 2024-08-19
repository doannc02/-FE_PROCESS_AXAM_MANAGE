import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { balanceType } from '@/enum'
import { useAppSelector } from '@/redux/hook'
import { getBranchList } from '@/service/common/branch/getList'
import { getPartnerList } from '@/service/common/partner/getListTiny'
import { Grid } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useEntryList from './useEntryList'

const EntryList = () => {
  const { t } = useTranslation('accounting/entry-list')
  const { id: idBranch } = useAppSelector((state) => state.branchData)
  const [values, handles] = useEntryList()

  const {
    isLoadingReconcile,
    methodForm,
    methodFormTable,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoading,
  } = values
  const { control, reset, watch } = methodForm
  const { onSubmit, onChangePageSize, onReset, onReconcile } = handles
  const [paramsPartner, setParamsPartner] = useState<any>({})

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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='type'
                label='Loại khách hàng'
                options={balanceType}
                onChangeValue={(val) => {
                  if (val === 'INTERNAL') {
                    setParamsPartner({
                      activated: true,
                      brandNowId: idBranch,
                      isDefaultCompany: true,
                    })
                  } else {
                    setParamsPartner({
                      activated: true,
                    })
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              {/* <CoreAutocomplete
                control={control}
                name='partnerId'
                label='Khách hàng'
                placeholder='Chọn khách hàng'
                labelPath2='code'
                required
                valuePath='id'
                labelPath='name'
                loading={isLoadingPartners}
                options={partnerSelect}
              /> */}
              <CoreAutoCompleteAPI
                fetchDataFn={
                  watch('type') === 'INTERNAL' ? getBranchList : getPartnerList
                }
                control={control}
                name='partner'
                label='Khách hàng'
                placeholder='Chọn khách hàng'
                labelPath2='code'
                required
                params={paramsPartner}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              <CoreCheckbox name='isMatching' control={control} label='Khớp' />
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

        <div className='flex my-5'>
          <CoreButton
            theme='submit'
            onClick={onReconcile}
            disabled={methodFormTable.watch('accountMoveLine').length < 1}
            loading={isLoadingReconcile}
          >
            Đối soát
          </CoreButton>
        </div>

        <CoreTable
          tableName='EntryList'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoading}
        />
      </div>
    </PageContainer>
  )
}

export default EntryList
