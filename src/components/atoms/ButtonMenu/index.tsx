import { Button, ButtonProps } from '@mui/material'

export const ButtonMenu = (props: ButtonProps) => {
  const { style, ...rest } = props
  return (
    <Button
      //color='primary'
      style={{
        padding: 0,
        height: 40,
        width: '100%',
        borderRadius: '0px 20px 20px 0px',
        border: 0,
        ...style,
      }}
      {...rest}
    />
  )
}
