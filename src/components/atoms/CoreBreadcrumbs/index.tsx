import { Dashboard } from '@mui/icons-material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Breadcrumbs, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ParsedUrlQueryInput } from 'querystring'
import { ReactNode } from 'react'

interface CoreBreadcrumbsPropsV2 {
  className?: string
  breadcrumbs?: {
    title: ReactNode
    pathname?: string
    query?: string | ParsedUrlQueryInput | null
    onCLick?: () => void
  }[]
  textPrev?: any
  textCurrent?: any
  prevUrl?: string
  query?: string | ParsedUrlQueryInput | null
  onCancel?: () => void
  isShowDashboard?: boolean
}
export const CoreBreadcrumbs = (props: CoreBreadcrumbsPropsV2) => {
  const {
    className,
    breadcrumbs,
    textPrev,
    textCurrent,
    prevUrl,
    query,
    isShowDashboard,
  } = props

  const router = useRouter()
  let onCancel = props.onCancel ? props.onCancel : () => router.back()

  if (textPrev) {
    const breadcrumbsData = [
      <Typography
        key='prev'
        variant='subtitle1'
        color='primary'
        className='first-letter:uppercase cursor-pointer'
        onClick={() =>
          prevUrl ? router.push({ pathname: prevUrl, query }) : onCancel()
        }
      >
        {textPrev}
      </Typography>,

      <Typography
        key='current'
        variant='subtitle1'
        className='first-letter:uppercase'
      >
        {textCurrent}
      </Typography>,
    ]
    return (
      <Breadcrumbs
        className={className}
        separator={<KeyboardArrowRightIcon fontSize='small' />}
        classes={{
          root: 'h-full flex item-center mb-0',
        }}
      >
        {breadcrumbsData}
      </Breadcrumbs>
    )
  }

  return (
    <Breadcrumbs
      className={className}
      separator={<KeyboardArrowRightIcon fontSize='small' />}
      classes={{
        root: 'bg-white h-30 flex item-center mb-0',
        separator: 'm-0',
      }}
    >
      {isShowDashboard && (
        <div
          style={{
            cursor: 'pointer',
          }}
          onClick={() => router.push({ pathname: '/dashboard' })}
        >
          <div className='flex gap-4 items-center'>
            <IconButton>
              <Dashboard fontSize='small' />
            </IconButton>
          </div>
        </div>
      )}

      {breadcrumbs?.map((item, index) => (
        <div key={index} className='flex gap-2 items-center'>
          <div
            style={{
              cursor: item.pathname ? 'pointer' : 'not-allowed',
            }}
            onClick={() => {
              item.onCLick ? item.onCLick() : null
              return item.pathname
                ? router.push({ pathname: item.pathname, query: item.query })
                : null
            }}
          >
            {item.title}
          </div>
        </div>
      ))}
    </Breadcrumbs>
  )
}
