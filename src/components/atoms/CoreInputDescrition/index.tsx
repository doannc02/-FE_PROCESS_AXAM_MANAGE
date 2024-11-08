import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import EditText from '@/components/molecules/EditText'
import { extractTextFromHtml } from '@/utils/tranText'

interface DescriptionComponentProps {
  isView: boolean
  watch: (field: string) => string | undefined
  control: Control<any>
  t: (key: string, options?: any) => string
  nameField: string
  title: string
  maxLength?: number
  color?: string
}

const CoreInputDescription: React.FC<DescriptionComponentProps> = ({
  isView,
  watch,
  control,
  nameField,
  title,
  maxLength,
  color,
  t,
}) => {
  console.log(color, 'JACK')
  return (
    <Grid item xs={12}>
      {
        <div>
          <Typography fontWeight={700} mb={2}>
            {title}
          </Typography>
          <Controller
            control={control}
            name={`${nameField}`}
            rules={{
              validate: {
                isMax: (v) => {
                  return (
                    extractTextFromHtml(v)?.length <= 1000 ||
                    t('common:validation.max', { number: 1000 })
                  )
                },
              },
            }}
            render={({ field: { onChange, value, onBlur }, fieldState }) => (
              <EditText
                maxLength={maxLength ?? 250}
                disabled={isView}
                setEditorText={onChange}
                editorText={value}
                error={fieldState.error?.message}
                placeholder={`Nhập nội dung ${title}`}
                onBlur={onBlur}
              />
            )}
          />
        </div>
      }
    </Grid>
  )
}

export default CoreInputDescription
