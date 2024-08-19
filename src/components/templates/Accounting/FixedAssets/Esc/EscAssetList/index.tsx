import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SearchAdvanced from '../../Components/SearchAdvancedEsc'
import SelectMethodAddNew from '../../Components/SelectMethodAddNew'
import { EscAssetTotal } from './EscAssetTotal'
import useEscAssetList from './useEscAssetList'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import iconSearch from '@/assets/svg/iconSearch.svg'
import Image from 'next/image'
import { CurrencyFormatCustom } from '@/components/atoms/CurrencyFormatCustom'
import { GREEN } from '@/helper/colors'

const EscAssetList = () => {
  const { t } = useTranslation('')
  const [values, handles] = useEscAssetList()
  const { showDialog } = useDialog()
  const { typeIncreaseOrDecrease } = useCheckPath()
  const {
    increaseAssetTotal,
    isLoadingIncreaseAssetTotal,
    typeMethodAddToolAsset,
    typeToolAsset,
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
  } = values
  const { control } = methodForm

  const { onSubmit, onChangePageSize, onReset } = handles
  const router = useRouter()
  const variantMapping = {
    require: 'span', // Đặt 'require' thành 'span'
  }
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: (
                <Typography>
                  {typeIncreaseOrDecrease === 'INCREASE'
                    ? 'Ghi tăng'
                    : 'Ghi giảm'}
                  {typeToolAsset === 'ASSET' ? ' Tài sản' : ' CCDC'}
                </Typography>
              ),
            },
          ]}
        />
      }
    >
      <FormProvider {...methodForm}>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* <SearchAdvanced
                isShowSearchForDateTime={true}
                onReset={onReset}
                onSubmit={onSubmit}
              /> */}

            <Grid item xs={12} sm={12} md={4} lg={4} className='pt-15'>
              <CoreInput
                control={control}
                name='search'
                label='Tìm kiếm'
                placeholder='Tìm kiếm theo Mã ghi tăng'
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <Image alt='' src={iconSearch} />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} className='pt-15'>
              <CoreDatePicker
                control={control}
                name='increaseRecordDate'
                title='Ngày ghi tăng'
                placeholder='Chọn ngày ghi tăng'
                format='YYYY-MM-DD'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} className='pt-15'>
              <CoreInput
                control={control}
                name='searchProductName'
                label={`Tên ${typeToolAsset === 'TOOL' ? ' CCDC' : ' TSCĐ'}`}
                placeholder={`Tìm kiếm theo tên ${
                  typeToolAsset === 'TOOL' ? ' CCDC' : ' TSCĐ'
                }`}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} className='pt-15'>
              <CoreInput
                control={control}
                name='searchSku'
                label={`Mã ${typeToolAsset === 'TOOL' ? ' CCDC' : ' TSCĐ'}`}
                placeholder={`Tìm kiếm theo mã ${
                  typeToolAsset === 'TOOL' ? ' CCDC' : ' TSCĐ'
                }`}
              />
            </Grid>
            {/* <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className='pt-15'
                    >
                      <CoreAutocomplete
                        options={[
                          { value: 'TOOLS', label: 'Công cụ' },
                          { value: 'ASSET', label: 'Tài sản' },
                        ]}
                        control={control}
                        name='toolAsset'
                        label='Loại TSCD'
                        placeholder='Chọn loại TSCD'
                      />
                    </Grid> */}

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div className='flex justify-center mt-10'>
                <div className='m-5'>
                  <CoreButton onClick={onReset} theme='reset'>
                    Reset
                  </CoreButton>
                </div>
                <div className='m-5'>
                  <CoreButton theme='submit' type='submit'>
                    Tìm kiếm
                  </CoreButton>
                </div>
              </div>
            </Grid>

            {
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={{ xs: 1, sm: 2, xl: 3 }}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    className='border-2 border-green-600'
                  >
                    <Paper
                      elevation={3}
                      className='flex justify-around items-center h-[50px]'
                    >
                      <Typography variant='h6'>
                        Tổng giá trị
                        {typeToolAsset === 'ASSET' ? ' TSCĐ' : ' CCDC'}:
                      </Typography>
                      {isLoadingIncreaseAssetTotal ? (
                        <CircularProgress />
                      ) : (
                        <CurrencyFormatCustom
                          color={GREEN}
                          amount={increaseAssetTotal?.data?.recordedValue ?? 0}
                          showCurrencyName
                          variant='h6'
                        />
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper
                      elevation={3}
                      className='flex justify-around items-center h-[50px]'
                    >
                      <Typography variant='h6'>
                        {' '}
                        Tổng hao mòn lũy kế:
                      </Typography>
                      {isLoadingIncreaseAssetTotal ? (
                        <CircularProgress />
                      ) : (
                        <CurrencyFormatCustom
                          color={GREEN}
                          amount={increaseAssetTotal?.data?.recordedValue ?? 0}
                          showCurrencyName
                          variant='h6'
                        />
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper
                      elevation={3}
                      className='flex justify-around items-center h-[50px]'
                    >
                      <Typography variant='h6'>
                        {' '}
                        Tổng giá trị còn lại:
                      </Typography>
                      {isLoadingIncreaseAssetTotal ? (
                        <CircularProgress />
                      ) : (
                        <CurrencyFormatCustom
                          color={GREEN}
                          amount={increaseAssetTotal?.data?.recordedValue ?? 0}
                          showCurrencyName
                          variant='h6'
                        />
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            }
          </Grid>
        </form>
      </FormProvider>
      <div className='py-4 flex justify-end gap-4 items-center'>
        <CoreButton
          theme='submit'
          onClick={() => showDialog(<SelectMethodAddNew />)}
        >
          {t('common:btn.add')}
        </CoreButton>
      </div>
      <CoreTable
        tableName='escAssetLst'
        columns={columns}
        data={tableData}
        onChangePageSize={onChangePageSize}
        paginationHidden={tableData.length < 1}
        totalPages={totalPages}
        page={page}
        size={size}
        isLoading={isLoadingTable}
        isShowColumnStt
        onRowClick={(id: number, row: any) => {
          let pathname
          if (row.typeAddNew === 'HANDMADE') {
            pathname = `${MENU_URL[typeToolAsset].ESC}/handMade/[id]`
          } else {
            pathname = `${MENU_URL[typeToolAsset].ESC}/divProToolsOrAsset/[id]`
          }
          router.push({
            pathname: pathname,
            query: {
              typeAddNew: row.typeAddNew,
              id: id,
              actionType: 'VIEW',
            },
          })
        }}
        // actionTable={
        //   typeToolAsset === 'ASSET' ? (
        //     <EscAssetTotal
        //       isLoading={isLoadingIncreaseAssetTotal}
        //       isFlag={typeToolAsset === 'ASSET'}
        //       recordedValue={increaseAssetTotal?.data?.recordedValue ?? 0}
        //       remainAmount={increaseAssetTotal?.data?.remainAmount ?? 0}
        //       periodicAllocation={
        //         increaseAssetTotal?.data?.periodicAllocation ?? 0
        //       }
        //     />
        //   ) : null
        // }
      />
    </PageContainer>
  )
}

export default EscAssetList
