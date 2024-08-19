import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Collapse, List, ListItemText, Paper } from '@mui/material'
import { useState } from 'react'

const ExpandableListItem = ({
  header,
  content,
  contentHeder,
}: {
  header: ReactJSXElement
  content: ReactJSXElement
  contentHeder?: ReactJSXElement
}) => {
  const [open, setOpen] = useState(true)

  return (
    <List
      sx={{
        mx: { xs: 0, md: 1 },
        cursor: 'pointer',
      }}
    >
      <Paper>
        {contentHeder}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 3,
            py: 1,
            backgroundColor: '#DBE8FF',
            border: '1px solid #DFE0EB',
          }}
          onClick={() => setOpen(!open)}
        >
          <ListItemText
            primary={header}
            primaryTypographyProps={{
              variant: 'subtitle1',
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </Box>
        <Collapse in={open}>
          <List
            style={{
              padding: 0,
            }}
          >
            {content}
          </List>
        </Collapse>
      </Paper>
    </List>
  )
}

export default ExpandableListItem
