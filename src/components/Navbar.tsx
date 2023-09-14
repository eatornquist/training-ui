import { Button, Icon, IconButton } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <h2>HomeBuilderOs</h2>
        <div className="nav-icons">
          <Button variant="contained">Division: West</Button>
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>ET</IconButton>
        </div>
      </nav>
    </>
  )
}
