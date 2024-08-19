import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { SaveTaxReturn } from '@/service/accounting/taxReturn/taxReturn/put/type'
import { getCityList } from '@/service/common/city/list'
import { getDistrictListByCityId } from '@/service/common/district/list'
import { getWardListByDistrictId } from '@/service/common/ward/getList'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'

export const Region = () => {
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const { watch, setValue, control } = useFormContext<SaveTaxReturn>()

  return (
    <div className='flex gap-5 mt-8 items-center'>
      <div className='flex items-center gap-5 min-w-[300px]'>
        <div className='min-w-[140px]'>
          <Typography mt={0.5}>[11a] Tỉnh/Thành phố:</Typography>
        </div>

        {!isView ? (
          <div className='w-full'>
            <CoreAutoCompleteAPI
              control={control}
              name='value11a'
              label={undefined}
              placeholder={'Chọn thành phố'}
              fetchDataFn={getCityList}
              params={{ activated: true, countryId: 366 }}
              onChangeValue={(val) => {
                setValue('value11b', null)
                setValue('value11c', null)
              }}
            />
          </div>
        ) : (
          <Typography mt={0.5}>{watch('value11a')?.name}</Typography>
        )}
      </div>

      <div className='flex items-center gap-5 ml-20 min-w-[300px]'>
        <div className='min-w-[130px]'>
          <Typography mt={0.5}>[11b] Quận/Huyện</Typography>
        </div>

        {!isView ? (
          <div className='w-full'>
            <CoreAutoCompleteAPI
              control={control}
              name='value11b'
              placeholder={'Chọn quận/huyện'}
              fetchDataFn={getDistrictListByCityId}
              params={{
                activated: true,
                cityId: watch('value11a')?.id,
              }}
              disabled={!watch('value11a')?.id}
              onChangeValue={(val) => {
                setValue('value11c', null)
              }}
              label={undefined}
            />
          </div>
        ) : (
          <Typography mt={0.5}>{watch('value11b')?.name}</Typography>
        )}
      </div>

      <div className='flex items-center gap-5 ml-20 min-w-[300px]'>
        <div className='min-w-[130px]'>
          <Typography mt={0.5}> [11c] Xã/Phường</Typography>
        </div>

        {!isView ? (
          <div className='w-full'>
            <CoreAutoCompleteAPI
              control={control}
              name='value11c'
              label={''}
              fetchDataFn={getWardListByDistrictId}
              params={{
                activated: true,
                districtId: watch('value11b')?.id,
              }}
              disabled={!watch('value11b')?.id}
              placeholder={'Chọn xã/phường'}
            />
          </div>
        ) : (
          <Typography mt={0.5}>{watch('value11c')?.name}</Typography>
        )}
      </div>
    </div>
  )
}
