import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
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
import NotificationsIconOutlined from '@mui/icons-material/NotificationsOutlined'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SettingsIconOutlined from '@mui/icons-material/SettingsOutlined'
import { mainListItems } from './listItems'
// import Chart from './Chart'
// import Deposits from './Deposits'
import CommunityList from './CommunityList'
import { Navbar } from './Navbar'
import { Drawer } from './Drawer'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
// import FilledInput from '@mui/material/FilledInput'
import SearchIcon from '@mui/icons-material/Search'
import { Avatar, InputLabel, OutlinedInput, TextField } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import DownloadIcon from '@mui/icons-material/Download'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { debounce } from 'lodash'
import { communityRowsData } from '../data'
import DataTable from './testSorting'

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

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#003c77',
    },
    secondary: {
      main: '#1f75bb',
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

export type ICommunities = {
  id: number
  community: string
  forecasted: number
  projected: number
  totalHomesites: number
  paneled: number
  permitted: number
  sop: number
  trenched: number
  communityStatus: string
}

export default function Dashboard() {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const [communities, setAllCommunities] = useState<ICommunities[]>([])
  const allCommunitiesCache = useRef<ICommunities[]>([])

  const [selectedTab, setSelectedTab] = useState<string>('All')

  const filteredData = useRef<ICommunities[]>([])

  const applySearch = debounce(
    (val: string) =>
      setAllCommunities(
        (filteredData.current.length === 0
          ? allCommunitiesCache.current
          : filteredData.current
        ).filter((el) =>
          el.community.toLocaleLowerCase().includes(val.toLocaleLowerCase())
        )
      ),
    300
  )

  const handleSearchTextChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchValue = evt.target.value
    applySearch.cancel()
    console.log(filteredData)
    if (!searchValue.length) {
      setAllCommunities(
        filteredData.current.length === 0
          ? allCommunitiesCache.current
          : filteredData.current
      )
    }
    applySearch(searchValue)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let target = event.currentTarget.className
    setSelectedTab(target)
    filteredData.current = allCommunitiesCache.current.filter(function (el) {
      if (target === 'All') {
        return allCommunitiesCache
      }
      return el.communityStatus === target
    })
    setAllCommunities(filteredData.current)
  }

  // useEffect(() => {
  //   setAllCommunities([
  //     {
  //       id: 7669,
  //       community: 'Deerhaven SFR',
  //       forecasted: 35,
  //       projected: 0,
  //       totalHomesites: 208,
  //       paneled: 0,
  //       permitted: 2,
  //       sop: 208,
  //       trenched: 208,
  //       communityStatus: 'active',
  //     },
  //   ])
  // }, [])

  useEffect(() => {
    setAllCommunities(communityRowsData)
    allCommunitiesCache.current = communityRowsData
  }, [])

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
            <div style={{ marginRight: -20 }}>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <Button
                  style={{
                    background: 'white',
                    color: 'secondary',
                    fontSize: 10,
                    fontWeight: 'bold',
                    height: 28,
                    borderRadius: 20,
                  }}
                >
                  Division: Boise
                </Button>
              </IconButton>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <HelpOutlineIcon />
              </IconButton>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <SettingsIconOutlined />
              </IconButton>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <Badge badgeContent={4} color="warning">
                  <NotificationsIconOutlined />
                </Badge>
              </IconButton>
              <IconButton color="secondary" sx={{ mr: 2 }}>
                <Avatar sx={{ background: '#ffc107' }}>
                  <Button
                    style={{
                      color: 'primary',
                      background: '#ffc107',
                      fontSize: 12,
                    }}
                  >
                    ET
                  </Button>
                </Avatar>
              </IconButton>
            </div>
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
                          onClick={handleClick}
                          style={{
                            color:
                              selectedTab === 'All' ? '#005DAA' : '#1C2B36',
                            whiteSpace: 'nowrap',
                            borderBottom:
                              selectedTab === 'All' ? '2px solid #005DAA' : '',
                            padding: '1em 11em',
                            fontWeight: 'bold',
                          }}
                        >
                          All
                        </div>
                        <div
                          className="Active"
                          onClick={handleClick}
                          style={{
                            color:
                              selectedTab === 'Active' ? '#005DAA' : '#1C2B36',
                            whiteSpace: 'nowrap',
                            borderBottom:
                              selectedTab === 'Active'
                                ? '2px solid #005DAA'
                                : '',
                            padding: '1em 11em',
                            fontWeight: 'bold',
                          }}
                        >
                          Active
                        </div>
                        <div
                          className="Completed"
                          onClick={handleClick}
                          style={{
                            color:
                              selectedTab === 'Completed'
                                ? '#005DAA'
                                : '#1C2B36',
                            whiteSpace: 'nowrap',
                            borderBottom:
                              selectedTab === 'Completed'
                                ? '2px solid #005DAA'
                                : '',
                            padding: '1em 15em',
                            fontWeight: 'bold',
                          }}
                        >
                          Completed
                        </div>
                        <div
                          className="Archived"
                          onClick={handleClick}
                          style={{
                            color:
                              selectedTab === 'Archived'
                                ? '#005DAA'
                                : '#1C2B36',
                            whiteSpace: 'nowrap',
                            borderBottom:
                              selectedTab === 'Archived'
                                ? '2px solid #005DAA'
                                : '',
                            padding: '1em 11em',
                            fontWeight: 'bold',
                          }}
                        >
                          Archived
                        </div>
                      </div>
                    </div>
                  </Box>
                  {/* <Divider sx={{ my: 1 }} /> */}
                  {/* <FormControl
                    fullWidth
                    variant="filled"
                    size="small"
                    sx={{ m: 1, width: '40ch', mb: 2 }}
                  >
                    <FilledInput
                      sx={{ height: '4ch' }}
                      id="filled-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start" sx={{ mb: 1.5 }}>
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </FormControl> */}

                  {/* <FormControl
                    sx={{ m: 1, width: '40ch' }}
                    variant="filled"
                    size="small"
                  >
                    <InputLabel htmlFor="">
                      🔍 Search for community or homesite
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      type={'text'}
                      // startAdornment={
                      //   <InputAdornment position="start">
                      //     <SearchIcon />
                      //   </InputAdornment>
                      // }
                    />
                  </FormControl> */}

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
                    onChange={handleSearchTextChange}
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
                    <DownloadIcon color="secondary" sx={{ ml: 3, mb: -1 }} />
                    <KeyboardArrowDownIcon //small window to select format
                      color="secondary"
                      sx={{ mb: -0.8 }}
                    />
                  </div>
                  <CommunityList data={communities} />
                  {/* <DataTable /> */}
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
