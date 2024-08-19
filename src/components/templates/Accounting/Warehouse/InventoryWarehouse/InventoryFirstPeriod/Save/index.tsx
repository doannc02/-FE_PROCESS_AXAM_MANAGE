import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { TableCustomDnd } from '@/components/organism/TableCustomDnd'
import { ActionTable } from '@/components/organism/TableCustomDnd/ActionTable'
import { Dashboard } from '@mui/icons-material'
import {
  Box,
  Grid,
  IconButton,
  Step,
  StepButton,
  Stepper,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useSaveInventoryFirstPeriod } from './useSaveInventoryFirstPeriod'
import { MENU_URL } from '@/routes'
import useCheckPath from '@/components/hooks/path/useCheckPath'
import { getWarehouseList } from '@/service/warehouse/getList'
import { getStockPickingTypeList } from '@/service/warehouse/inventoryFirstPeriod/getListStockPickingType'
import { getUserList } from '@/service/uaa/user/getList'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { useRouter } from 'next/router'

const steps = [
  {
    step: 0,
    label: 'Bước 1',
  },
  {
    step: 1,
    label: 'Bước 2',
  },
]

const SaveInventoryFirstPeriod = () => {
  const [completed, setCompleted] = useState<{
    [k: number]: boolean
  }>({})

  const [values, handles] = useSaveInventoryFirstPeriod()
  const {
    t,
    warehouseId,
    stockPickingLinesData,
    columnsStep1,
    columnsStep2,
    stockPickingLinesDataStep2,
    methodForm,
    actionType,
    defaultValues,
    isLoading,
    isLoadingSubmit,
    isUpdate,
    activeStep,
    isView,
  } = values
  const {
    onSubmit,
    onCancel,
    // handleOpenDialogWarning,
    setValue,
    append,
    setActiveStep,
  } = handles
  const { typeWareHouse } = useCheckPath()
  const router = useRouter()
  const id = Number(router.query?.id)

  const { control, watch } = methodForm
  return (
    <PageContainer
      title={
        <div className='flex w-full items-center justify-between'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: (
                  <IconButton>
                    <Dashboard fontSize='small' />
                  </IconButton>
                ),
                pathname: '/dashboard',
              },
              {
                title: 'Tồn kho đầu kỳ',
                pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.INVENTORY_FIRST_PERIOD}`,
              },
              {
                title: (
                  <Typography>{isView ? 'Chi tiết' : 'Thêm mới'}</Typography>
                ),
              },
            ]}
          />
        </div>
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            rightAction: (
              <TopAction
                actionList={
                  watch(`sourceDocument`) === 'FIRST_PERIOD' ? ['edit'] : []
                }
                onEditAction={() => {
                  router.push({
                    pathname: `${MENU_URL.WARE_HOUSE[typeWareHouse].INVENTORY_WAREHOUSE.INVENTORY_FIRST_PERIOD}/[id]`,
                    query: {
                      id,
                    },
                  })
                }}
              ></TopAction>
            ),
            content: isLoading ? (
              <div className='flex justify-center items-center h-full min-h-[600px]'>
                <CoreLoading />
              </div>
            ) : (
              <FormProvider {...methodForm}>
                <form className='mx-20 mt-15' onSubmit={onSubmit}>
                  <Box className='flex justify-center'>
                    <Stepper
                      activeStep={activeStep}
                      nonLinear={!!actionType}
                      className='w-[250px]'
                    >
                      {steps.map((item, index) => (
                        <Step key={item?.step}>
                          <StepButton onClick={() => setActiveStep(index)}>
                            {item?.label}
                          </StepButton>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                  <Box className='mt-15'>
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CoreAutoCompleteAPI
                          control={control}
                          required
                          name='warehouse'
                          label='Nhập vào kho'
                          placeholder='Chọn kho nhập'
                          fetchDataFn={getWarehouseList}
                          labelPath='name'
                          type={typeWareHouse}
                          valuePath='id'
                          disabled={!!!watch('sourceProductType')}
                          onChangeValue={(val) => {
                            if (val) {
                              setValue('warehouseId', val.id)
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CoreAutoCompleteAPI
                          control={control}
                          required
                          name='pickingType'
                          label='Loại hoạt động'
                          placeholder='Chọn loại hoạt động'
                          fetchDataFn={getStockPickingTypeList}
                          labelPath='name'
                          valuePath='id'
                          type={typeWareHouse}
                          params={{
                            warehouseId: warehouseId,
                            pickingType: 'RECEIPT',
                          }}
                          disabled={!!!watch('warehouseId')}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CoreAutoCompleteAPI
                          control={control}
                          required
                          name='employee'
                          label='Người nhập kho'
                          placeholder='Chọn người nhập kho'
                          fetchDataFn={getUserList}
                          valuePath='id'
                          labelPath='firstName'
                          labelPath2='lastName'
                          sign=' '
                          params={{
                            isActive: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CoreInput
                          control={control}
                          name='note'
                          label='Ghi chú'
                          placeholder='Nhập ghi chú'
                          multiline
                          minRows={5}
                        />
                      </Grid>
                    </Grid>
                    {stockPickingLinesData && stockPickingLinesData.length > 0 && (
                      <div className='py-20'>
                        <Typography
                          variant='subtitle2'
                          className='pb-8 font-bold'
                        >
                          {activeStep === 0
                            ? 'Sản phẩm tồn kho đầu kỳ'
                            : 'Sản phẩm tồn đầu kỳ theo vị trí'}
                        </Typography>
                        {/* <CoreTable
                      columns={activeStep === 0 ? columnsStep1 : columnsStep2}
                      data={
                        activeStep === 0
                          ? stockPickingLinesData
                          : stockPickingLinesDataStep2
                      }
                      paginationHidden
                    /> */}
                        <TableCustomDnd
                          setValue={setValue}
                          watch={watch}
                          fieldsName='stockPickingLines'
                          columns={
                            activeStep === 0 ? columnsStep1 : columnsStep2
                          }
                          data={
                            activeStep === 0
                              ? stockPickingLinesData
                              : stockPickingLinesDataStep2
                          }
                          isShowColumnStt
                          actionTable={
                            <ActionTable
                              action='Thêm sản phẩm'
                              columns={
                                activeStep === 0 ? columnsStep1 : columnsStep2
                              }
                              append={append}
                              defaultValueLine={
                                defaultValues.stockPickingLines[0]
                              }
                            />
                          }
                        />
                      </div>
                    )}
                    {actionType !== 'VIEW' && (
                      <div className='flex items-center justify-center w-full my-13'>
                        <div className='flex gap-10'>
                          <CoreButton theme='cancel' onClick={onCancel}>
                            Hủy
                          </CoreButton>
                          {activeStep === 0 ? (
                            <CoreButton
                              theme='submit'
                              onClick={() => setActiveStep(1)}
                            >
                              Lưu và chuyển sang bước 2
                            </CoreButton>
                          ) : (
                            <CoreButton
                              theme='submit'
                              loading={isLoadingSubmit}
                              onClick={onSubmit}
                            >
                              {isUpdate ? 'Chỉnh sửa' : 'Thêm mới'}
                            </CoreButton>
                          )}
                        </div>
                      </div>
                    )}
                  </Box>
                </form>
              </FormProvider>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}

export default SaveInventoryFirstPeriod
