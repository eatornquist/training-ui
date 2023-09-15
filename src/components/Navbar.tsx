// import { Button, Icon, IconButton } from '@mui/material'
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
// import SettingsIcon from '@mui/icons-material/Settings'
// import NotificationsIcon from '@mui/icons-material/Notifications'

// export default function Navbar() {
// return (
//     <>
//       <nav className="navbar">
//         <h2>HomeBuilderOs</h2>
//         <div className="nav-icons">
//           <Button variant="contained">Division: West</Button>
//           <IconButton>
//             <HelpOutlineIcon />
//           </IconButton>
//           <IconButton>
//             <SettingsIcon />
//           </IconButton>
//           <IconButton>
//             <NotificationsIcon />
//           </IconButton>
//           <IconButton>ET</IconButton>
//         </div>
//       </nav>
//     </>
//   )
// }

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

export const Navbar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))
