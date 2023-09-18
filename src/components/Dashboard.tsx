import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import { mainListItems } from './listItems'
// import Chart from './Chart'
// import Deposits from './Deposits'
import CommunityList from './CommunityList'
import { Navbar } from './Navbar'
import { Drawer } from './Drawer'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FilledInput from '@mui/material/FilledInput'
import SearchIcon from '@mui/icons-material/Search'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#003c77',
    },
    secondary: {
      main: '#3e5463',
    },
    warning: {
      main: '#CC0B08',
    },
  },
  // typography: {
  //   fontFamily: ['Hoefler text', 'Arial'].join(','),
  //   fontSize: 15,
  // },
})

export default function Dashboard() {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar position="absolute" open={open} color="primary">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              fontFamily={'Hoefler text'}
              fontSize={30}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              HomeBuilderOS
            </Typography>
            <IconButton color="inherit">
              <Badge color="secondary">
                <HelpOutlineIcon />
              </Badge>
              <Badge color="primary">
                <SettingsIcon />
              </Badge>
              <Badge badgeContent={4} color="warning">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Navbar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            {/* <Divider sx={{ my: 1 }} /> */}
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Grid
            item
            container
            direction={'column'}
            alignItems={'flex-end'}
            // justifyContent={'flex-start'}
            sx={{ mt: 2, ml: -4.5 }}
          >
            <ButtonGroup
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button style={{ color: '#003c77', background: 'white' }}>
                Community
              </Button>
              <Button
                disabled
                // style={{ color: '#003c77', background: 'white' }}
              >
                Monthly
              </Button>
            </ButtonGroup>
          </Grid>
          <Container maxWidth="lg" sx={{ mt: -4.5, mb: 4, mr: 2, ml: 2 }}>
            <Typography
              fontFamily={'Hoefler text'}
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, mb: 3 }}
            >
              Community Overview
            </Typography>
            <Grid container spacing={1}>
              {/* Chart */}
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}
              {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              <Grid>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <FormControl
                    fullWidth
                    variant="filled"
                    size="small"
                    sx={{ m: 1, width: '35ch' }}
                  >
                    <FilledInput
                      sx={{ height: '4ch' }}
                      id="filled-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start" sx={{ mb: 1.5 }}>
                          <SearchIcon /> Search for community or homesite
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <CommunityList />
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
