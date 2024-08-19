import CoreInput from '@/components/atoms/CoreInput'
import { Action } from '@/components/molecules/Action'
import { Grid } from '@mui/material'
import { useFieldArray } from 'react-hook-form'

const ArraySignature = ({
  index,
  methodForm,
}: {
  index: number
  methodForm: any
}) => {
  const { control, watch } = methodForm

  const { fields, append, remove } = useFieldArray({
    name: `data.${index}.signatures`,
    keyName: 'key',
    control,
  })

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} style={{ padding: 30 }}>
      {fields.map((item, i) => {
        return (
          <Grid item xs={12} sm={12} md={4} lg={4} key={item.key}>
            <CoreInput
              name={`data.${index}.signatures.${i}`}
              control={control}
              label={`Chữ kí ${i + 1}`}
              placeholder='Nhập chữ kí'
            />
          </Grid>
        )
      })}

      <Grid item xs={12} sm={12} md={1} lg={1}>
        <div className='flex items-center h-full'>
          {fields.length > 0 ? (
            <Action
              actionList={['append', 'remove']}
              onAppendAction={() => {
                append('')
              }}
              onRemoveAction={() => {
                remove(fields.length - 1)
              }}
            />
          ) : (
            <Action
              actionList={['append']}
              onAppendAction={() => {
                append('')
              }}
            />
          )}
        </div>
      </Grid>
    </Grid>
  )
}

export default ArraySignature
