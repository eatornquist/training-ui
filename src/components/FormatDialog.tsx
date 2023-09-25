import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Dialog from '@mui/material/Dialog'
import { Divider } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

export const firstOptions = [
  'View more details',
  'View plan table',
  'View insights',
  'Add a note',
  'Download projections',
]

export const secondOptions = ['Complete', 'Archive']

export const thirdOptions = ['Csv', 'Pdf', 'Xlsx']

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

export default function FormatDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props

  const [secondDialogOpen, setSecondDialogOpen] = useState(false)

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleCloseSecond = (value: string) => {
    setSecondDialogOpen(false)
    // setSelectedValue(value)
  }

  const handleListItemClick = (value: string) => {
    if (value === 'Download projections') {
      setSecondDialogOpen(true)
    } else {
      onClose(value)
    }
  }

  const handleSecondListItemClick = (value: string) => {
    handleCloseSecond(value)
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          display: 'flex',
          justifyContent: 'right',
          mt: 4,
          mr: 18,
        }}
      >
        <List sx={{ pt: 0 }}>
          {firstOptions.map((option) => (
            <ListItem disableGutters key={option}>
              <ListItemButton onClick={() => handleListItemClick(option)}>
                <ListItemText primary={option} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          {secondOptions.map((option) => (
            <ListItem disableGutters>
              <ListItemButton onClick={() => handleListItemClick('option')}>
                <ListItemText primary={option} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Dialog
        onClose={handleCloseSecond}
        open={secondDialogOpen}
        sx={{ display: 'flex', justifyContent: 'right', mt: 18, mr: 2 }}
      >
        <List sx={{ pt: 0 }}>
          {thirdOptions.map((option) => (
            <ListItem disableGutters sx={{ width: 100, height: 50 }}>
              <ListItemButton
                autoFocus
                onClick={() => handleSecondListItemClick('option')}
              >
                <ListItemText primary={option} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  )
}
