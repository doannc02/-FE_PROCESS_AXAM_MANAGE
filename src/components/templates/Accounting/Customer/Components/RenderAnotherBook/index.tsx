import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { RemoveIcon } from '@/components/atoms/RemoveIcon'
import PlusIcon from '@/components/icons/PlusIcon'
import { useAppSelector } from '@/redux/hook'
import { getAccountJournalList } from '@/service/accounting/accountJournal/getList'
import { getAccountLedger } from '@/service/accounting/accountLedger/getList'
import { Grid } from '@mui/material'

import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
interface Props {
  control: any
  fieldLedgerRefs: any
  remove: any
  append: any
  actionType: any
  watch: any
}
const RenderAnotherBook = ({
  fieldLedgerRefs,
  control,
  remove,
  append,
  watch,
  actionType,
}: Props) => {
  const { t } = useTranslation()
  const { id: idLedger } = useAppSelector((state) => state.ledgerRefData)
  let exceptValues = useRef<{ id: number }[]>([])
  return fieldLedgerRefs?.map((item: any, index: number) => {
    return (
      <Grid key={item?.id} item xs={12}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutoCompleteAPI
              exceptValues={exceptValues.current}
              control={control}
              name={`ledgerRefs.${index}.accountLedger`}
              label='Sổ cái'
              required
              placeholder='Chọn sổ cái'
              className='w-full'
              rules={{ required: t('common:validation.required') }}
              fetchDataFn={getAccountLedger}
              params={{
                accountLedgerNowId: idLedger,
              }}
              onChangeValue={(value) => {
                if (value) {
                  exceptValues.current.push(value)
                }else {
                  exceptValues.current.pop()
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreAutoCompleteAPI
              exceptValues={exceptValues.current}
              control={control}
              name={`ledgerRefs.${index}.accountJournal`}
              label='Sổ kế toán'
              className='w-full'
              required
              placeholder='Chọn sổ kế toán'
              fetchDataFn={getAccountJournalList}
              params={{
                accountLedgerId: watch(`ledgerRefs.${index}.accountLedger`)?.id,
              }}
              disabled={!watch(`ledgerRefs.${index}.accountLedger`)}
            />
          </Grid>
          {actionType !== 'VIEW' && (
            <Grid item xs={1}>
              <div
                className='flex items-center justify-center mt-5'
                key={item?.id}
              >
                <PlusIcon
                  onClick={() => {
                    append({
                      accountLedger: null,
                      accountJournal: null,
                    })
                  }}
                />
                {fieldLedgerRefs.length > 1 && (
                  <RemoveIcon
                    handleClick={() => {
                      remove(index)
                    }}
                  />
                )}
              </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  })
}

export default RenderAnotherBook
