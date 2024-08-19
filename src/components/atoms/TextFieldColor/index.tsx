import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'
import { Control, Controller } from 'react-hook-form'

export const TextFieldColor = forwardRef<
  HTMLInputElement,
  TextFieldProps & { name: string; control: Control<any>; trigger?: any }
>(function TextboxBase({ control, name, trigger, onChange, ...props }, ref) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          ref={ref}
          value={field.value}
          fullWidth
          margin='none'
          InputProps={{
            startAdornment: (
              <input
                type='color'
                value={field.value}
                className='input_color'
                onChange={(e) => {
                  field.onChange(e.target.value)
                  onChange && onChange(e)
                  trigger && trigger(name)
                }}
              />
            ),
          }}
          {...props}
        />
      )}
    />
  )
})
