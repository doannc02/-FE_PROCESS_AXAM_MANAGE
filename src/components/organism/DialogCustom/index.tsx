import { useTheme } from '@mui/material'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import * as React from 'react'
import { ComponentPropsWithoutRef, ReactNode, useId } from 'react'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />
})

function BootstrapDialogTitle({
  children,
  onClose,
  ...other
}: {
  id: string
  children?: React.ReactNode
  onClose: () => void
}) {
  return (
    <DialogTitle
      variant='h4'
      sx={{
        padding: '30px 0 0 0',
        minHeight: '50px',
        display: 'flex',
        justifyContent: 'center',
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <Image
          className='absolute right-7 top-7 cursor-pointer'
          onClick={onClose}
          height={25}
          width={25}
          src={require('@/assets/svg/close.svg')}
          alt='close'
        />
      ) : null}
    </DialogTitle>
  )
}

export type Props = {
  open?: boolean
  title: ReactNode
  children: ReactNode
  formProps?: ComponentPropsWithoutRef<'form'>
  bottomNode?: ReactNode
  onClose: () => void
  width?: number
  height?: number
  fontSize?: number
} & Omit<DialogProps, 'open' | 'title'>

export const DialogCustom = ({
  open = true,
  title,
  fontSize,
  children,
  formProps,
  bottomNode,
  fullScreen,
  width = 640,
  height,
  onClose,
  ...other
}: Props) => {
  const headingId = useId()
  const theme = useTheme()
  const fullScreenValue = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      TransitionComponent={Transition}
      aria-labelledby={headingId}
      open={open}
      fullScreen={fullScreen || fullScreenValue}
      PaperProps={{
        style: {
          height: height,
          width: '100%',
          minWidth: `${width}px`,
          maxWidth: `${width}px`,
          overflowY: 'auto',
         // overflowX: 'hidden',
        },
      }}
      sx={{
        color: '#242424',
        '& .MuiDialog-container': {
          flexDirection: 'column',
          justifyContent: 'center',
        },
      }}
      {...other}
    >
      <BootstrapDialogTitle id={headingId} onClose={onClose}>
        {title}
      </BootstrapDialogTitle>

      <form {...formProps}>
        <DialogContent dividers sx={{ border: 'none', padding: 0, margin: 0 }}>
          {children}
        </DialogContent>
        {bottomNode && <>{bottomNode}</>}
      </form>
    </Dialog>
  )
}
