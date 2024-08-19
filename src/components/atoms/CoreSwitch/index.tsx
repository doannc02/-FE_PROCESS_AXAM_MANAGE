import { GREEN, RED } from '@/helper/colors'
import {
  Box,
  FormControl,
  Switch,
  SwitchProps,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Props extends SwitchProps {
  control: any
  className?: string
  name: string
  label?: string | ReactElement
  helpText?: string
  isViewProp?: boolean
}
const CoreSwitch = (props: Props) => {
  const { t } = useTranslation('common')
  const {
    className,
    control,
    helpText,
    name,
    label,
    isViewProp,
    ...restProps
  } = props

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp !== undefined ? isViewProp : actionType === 'VIEW'

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          return (
            <>
              {isView ? (
                <div className='flex gap-5'>
                  <Typography variant='body1'>{t('common:status')}</Typography>
                  <Typography
                    variant='body1'
                    style={{
                      color: value ? GREEN : RED,
                    }}
                  >
                    {value ? 'Active' : 'Inactive'}
                  </Typography>
                </div>
              ) : (
                <FormControl component='fieldset'>
                  <Box className='flex items-center'>
                    <Switch
                      checked={value}
                      onChange={onChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                      {...restProps}
                    />
                    <Typography>{label ?? t('status')}</Typography>
                  </Box>
                  {helpText && (
                    <Typography className='italic text-[#747475] text-[12px] ml-28'>
                      {helpText}
                    </Typography>
                  )}
                </FormControl>
              )}
            </>
          )
        }}
      />
    </div>
  )
}

export default React.memo(CoreSwitch)
