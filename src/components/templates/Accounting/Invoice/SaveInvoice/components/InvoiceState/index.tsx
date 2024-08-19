import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { state } from '@/enum'
import { PRIMARY } from '@/helper/colors'
import { Typography } from '@mui/material'

export const InvoiceState = ({ stateInvoice }: { stateInvoice: string }) => {
  return (
    <CoreBreadcrumbs
      breadcrumbs={state.map((ele, index) => ({
        title: (
          <Typography
            sx={{
              color: stateInvoice === ele.value ? PRIMARY : undefined,
            }}
          >
            {`${index + 1}. ${ele.label}`}
          </Typography>
        ),
      }))}
    />
  )
}
