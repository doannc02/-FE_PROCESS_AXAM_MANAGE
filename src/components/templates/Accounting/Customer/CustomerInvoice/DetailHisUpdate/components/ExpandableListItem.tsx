import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Collapse, List, ListItemText, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

const ExpandableListItem = ({
  header,
  content,
  contentHeder,
  isShowCollapse
}: {
  header?: ReactJSXElement
  content: ReactJSXElement
  contentHeder?: ReactJSXElement
  isShowCollapse: boolean
}) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(isShowCollapse)
  }, [isShowCollapse])

  return (
    <List
      sx={{
        padding: 0,
        mx: { xs: 0, md: 3 },
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
