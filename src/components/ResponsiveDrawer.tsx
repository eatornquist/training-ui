import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Button, Grid, InputAdornment, Paper, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import DownloadIcon from '@mui/icons-material/Download'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CommunityList from './CommunityList'
import FormatDialog from './FormatDialog'
import { ICommunities } from './Dashboard'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function MiniDrawer() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [communities, setAllCommunities] = React.useState<ICommunities[]>([])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ pb: '2rem' }}>
              <div style={{ paddingTop: '1px', marginTop: '-15px' }}>
                <div
                  style={{
                    display: 'flex',
                    borderBottom: '1px solid',
                    borderBottomColor: 'lightgray',
                  }}
                >
                  <div
                    className="All"
                    // onClick={handleClick}
                    // style={{
                    //   color:
                    //     selectedTab === 'All' ? '#005DAA' : '#1C2B36',
                    //   whiteSpace: 'nowrap',
                    //   borderBottom:
                    //     selectedTab === 'All' ? '2px solid #005DAA' : '',
                    //   padding: '1em 11em',
                    //   fontWeight: 'bold',
                    // }}
                  >
                    All
                  </div>
                  <div
                    className="Active"
                    // onClick={handleClick}
                    // style={{
                    //   color:
                    //     selectedTab === 'Active' ? '#005DAA' : '#1C2B36',
                    //   whiteSpace: 'nowrap',
                    //   borderBottom:
                    //     selectedTab === 'Active'
                    //       ? '2px solid #005DAA'
                    //       : '',
                    //   padding: '1em 11em',
                    //   fontWeight: 'bold',
                    // }}
                  >
                    Active
                  </div>
                  <div
                    className="Completed"
                    // onClick={handleClick}
                    // style={{
                    //   color:
                    //     selectedTab === 'Completed'
                    //       ? '#005DAA'
                    //       : '#1C2B36',
                    //   whiteSpace: 'nowrap',
                    //   borderBottom:
                    //     selectedTab === 'Completed'
                    //       ? '2px solid #005DAA'
                    //       : '',
                    //   padding: '1em 15em',
                    //   fontWeight: 'bold',
                    // }}
                  >
                    Completed
                  </div>
                  <div
                    className="Archived"
                    // onClick={handleClick}
                    // style={{
                    //   color:
                    //     selectedTab === 'Archived'
                    //       ? '#005DAA'
                    //       : '#1C2B36',
                    //   whiteSpace: 'nowrap',
                    //   borderBottom:
                    //     selectedTab === 'Archived'
                    //       ? '2px solid #005DAA'
                    //       : '',
                    //   padding: '1em 11em',
                    //   fontWeight: 'bold',
                    // }}
                  >
                    Archived
                  </div>
                </div>
              </div>
            </Box>
            <TextField
              id="input-with-icon-adornment"
              variant="filled"
              placeholder="Search for community or homesite"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                'data-testid': 'search-text-field',
              }}
              style={{
                width: '20%',
              }}
              // onChange={handleSearchTextChange}
            />

            <div
              style={{
                marginLeft: 1500,
                marginBottom: 25,
                marginTop: -50,
              }}
            >
              <Button
                color="secondary"
                variant="outlined"
                sx={{
                  width: 150,
                  fontWeight: 'bold',
                  borderWidth: 3,
                }}
              >
                <KeyboardArrowLeftIcon sx={{ width: 15 }} />
                FY 2023
                <KeyboardArrowRightIcon sx={{ width: 15 }} />
              </Button>
              <IconButton
                size="small"
                sx={{ ml: 1 }}
                // onClick={() => handleDownload(selectedFormat)}
              >
                <DownloadIcon color="secondary" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ ml: -1 }}
                // onClick={handleClickOpen}
              >
                <KeyboardArrowDownIcon //small window to select format (Dialog component)
                  color="secondary"
                />
              </IconButton>
              {/* <FormatDialog
              selectedValue={selectedValue}
              open={dialogOpen}
              onClose={handleClose}
              onFormatSelect={handleFormatSelect}
              secondDialogOpen={secondDialogOpen}
              onCloseSecond={handleCloseSecond}
              setSecondDialogOpen={setSecondDialogOpen}
              /> */}
            </div>
            <CommunityList data={communities} />
            {/* <DataTable /> */}
          </Paper>
        </Grid>
      </Box>
    </Box>
  )
}
