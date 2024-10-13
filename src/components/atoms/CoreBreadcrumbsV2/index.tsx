import { Breadcrumbs, Typography } from '@mui/material'

interface CoreBreadcrumbsPropsV2 {
  className?: string
  breadcrumbsData: {
    title: string
    onClick?: () => void
  }[]
}
export const CoreBreadcrumbsV2 = (props: CoreBreadcrumbsPropsV2) => {
  const { className, breadcrumbsData } = props

  return (
    <Breadcrumbs
      className={className}
      separator='/dashboard'
      classes={{
        root: 'bg-[#ffffff] h-[57px] flex item-center mb-0',
      }}
    >
      {breadcrumbsData?.map((item, index) => (
        <Typography
          key={index}
          className={
            breadcrumbsData?.length === index + 1 ? '' : 'cursor-pointer'
          }
          variant='subtitle1'
          color={breadcrumbsData?.length === index + 1 ? '' : 'primary'}
          sx={{ textTransform: 'uppercase' }}
          onClick={item?.onClick}
        >
          {item?.title}
        </Typography>
      ))}
    </Breadcrumbs>
  )
}
