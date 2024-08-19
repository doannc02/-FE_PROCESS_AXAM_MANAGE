import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { Action } from '@/components/molecules/Action'
import PageContainer from '@/components/organism/PageContainer'
import { invoicePrintTypeConfig } from '@/enum'
import { Item } from '@/service/common/signatureConfig/save/type'
import { Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import ArraySignature from './ArraySignature'
import BorderedSection from './borderSection'
import usePrintConfig from './usePrintConfig'

const PrintConfig = () => {
  const { t } = useTranslation('accounting/account-print')
  const [values, handles] = usePrintConfig()
  const { control, isUpdate, isLoadingSubmit, methodForm, fields } = values

  const { watch, register, trigger } = methodForm
  const { onSubmit, onCancel, remove, append } = handles

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
      <div className='w-full flex flex-col'>
        <form className='bg-[#ffffff] px-10' onSubmit={onSubmit}>
          {fields.map((item, index) => {
            const curList = watch('data')
            const invoiceTypeHandle = invoicePrintTypeConfig.filter(
              (v) =>
                !curList.some(
                  (v2, idx) => v2.printedCoupons === v.value && index !== idx
                )
            )

            return (
              <Grid
                container
                spacing={{ xs: 1, sm: 2, md: 3 }}
                key={item.key}
                style={{ marginTop: 24 }}
              >
                <Grid item xs={12} sm={12} md={11} lg={11}>
                  <BorderedSection
                    title={
                      <CoreAutocomplete
                        className='min-w-[310px]'
                        control={control}
                        name={`data.${index}.printedCoupons`}
                        label='Loại đơn'
                        placeholder='Chọn loại đơn'
                        options={invoiceTypeHandle}
                      />
                    }
                  >
                    <ArraySignature index={index} methodForm={methodForm} />
                  </BorderedSection>
                </Grid>
                <Grid item xs={12} sm={12} md={1} lg={1}>
                  <div className='flex items-center h-full'>
                    {index > 0 ? (
                      <Action
                        actionList={['append', 'remove']}
                        onAppendAction={() => {
                          append({
                            id: null,
                            // printedCoupons: null,
                            // signatures: [],
                          } as Item)
                        }}
                        onRemoveAction={() => {
                          remove(index)
                        }}
                      />
                    ) : (
                      <Action
                        actionList={['append']}
                        onAppendAction={() => {
                          append({
                            id: null,
                            // printedCoupons: null,
                            // signatures: [],
                          } as Item)
                        }}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
            )
          })}

          <div className='space-x-12 text-center my-15'>
            <CoreButton theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </CoreButton>
            <CoreButton theme='submit' type='submit' loading={isLoadingSubmit}>
              {isUpdate ? t('common:btn.save_change') : t('common:btn.add')}
            </CoreButton>
          </div>
        </form>
      </div>
    </PageContainer>
  )
}

export default PrintConfig
