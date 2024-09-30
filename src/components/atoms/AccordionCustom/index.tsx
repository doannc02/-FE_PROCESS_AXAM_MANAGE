import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type Props = {
  title: string | React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

export const AccordionCustom = ({
  title,
  children,
  defaultOpen = false,
}: Props) => {
  return (
    <div>
      <Accordion defaultExpanded={defaultOpen}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          style={{
            backgroundColor: '#F6F7FB',
            height: '48px',
            borderTop: '1px solid #DFE0EB',
            borderBottom: '1px solid #DFE0EB',
          }}
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  )
}
