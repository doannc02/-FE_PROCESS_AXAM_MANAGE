import { GRAY } from '@/helper/colors'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t } = useTranslation('common')

  return (
    <div
      className='flex justify-end text-center pr-20'
      style={{
        backgroundColor: GRAY,
      }}
    >
      <Typography variant='body1' className='py-10'>
        {t('footer.label')}
      </Typography>
    </div>
  )
}

export default Footer
