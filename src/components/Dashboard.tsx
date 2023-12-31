import * as React from 'react'
import {
  useState,
  useRef,
  useEffect,
  // createContext,
  // useContext,
  // ReactNode,
} from 'react'
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
import { Avatar, TextField } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import DownloadIcon from '@mui/icons-material/Download'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { debounce } from 'lodash'
import { communityRowsData } from '../data'
// import EnhancedTable from './testSorting'
import FormatDialog from './FormatDialog'
import { firstOptions } from './FormatDialog'
import * as XLSX from 'xlsx'
import { useParams } from 'react-router-dom'
import { unparse } from 'papaparse'
import { appInsights } from '../lib/appInsights'
// import { useSnackBarContext } from '../context/SnackBar'
// import { theme } from '../themes/theme'

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
  communityId: number
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

  const [dialogOpen, setDialogOpen] = useState(false)

  const [selectedValue, setSelectedValue] = useState(firstOptions[1])

  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'xlsx' | string>(
    'csv'
  )

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

  const handleTabClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = (value: 'csv' | 'xlsx' | string) => {
    setDialogOpen(false)
    setSelectedFormat(value)
  }

  const handleCloseSecond = (value: 'csv' | 'xlsx' | string) => {
    setSecondDialogOpen(false)
    setSelectedFormat(value)
  }

  //Download functionality start:
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)
  const { id } = useParams<{ id: string }>()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const docOpen = Boolean(anchorEl)
  // const { create, remove } = useSnackBarContext()

  const handleDocumentClose = () => {
    setAnchorEl(null)
  }

  const handleFormatSelect = (value: 'csv' | 'xlsx' | string) => {
    handleCloseSecond(value)
    handleClose(value)
  }

  const handleDownload = async (downloadType: 'csv' | 'xlsx' | string) => {
    try {
      const body = (
        filteredData.current.length === 0
          ? allCommunitiesCache.current
          : filteredData.current
      ).map((row, index) => {
        const exportedRow = {
          Community: row.community,
          'Community Id': row.communityId,
          Forecasted: row.forecasted,
          Projected: row.projected,
          'Total Homesites': row.totalHomesites,
          Paneled: row.paneled,
          Permitted: row.permitted,
          SOP: row.sop,
          Trenched: row.trenched,
        }
        return exportedRow
      })
      let blob
      if (downloadType === 'xlsx') {
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet([...body])
        // excel sheet name cannot be longer than 30 characters, : is an invalid character so we remove it
        const sheetName = id?.replace(/:/g, '').substring(0, 30)
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
        blob = XLSX.write(workbook, {
          type: 'buffer',
          bookType: 'xlsx',
        })
      } else {
        blob = unparse([...body])
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filePicker = await (window as any).showSaveFilePicker({
        suggestedName: `${id}.${downloadType}`,
        types: [
          {
            description: 'Excel File',
            accept: {
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                ['.xlsx'],
            },
          },
          {
            description: 'CSV File',
            accept: {
              'text/csv': ['.csv'],
            },
          },
        ],
      })

      const writableStream = await filePicker.createWritable()
      await writableStream.write(blob)
      await writableStream.close()

      handleDocumentClose()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error?.message?.includes(401)) {
        appInsights.trackTrace({
          message: `handleDownload Error: ${error}`,
        })
        console.log('Forecast export canceled.', {
          severity: 'warning',
        })
      }
    }
  }
  //Download functionality end:

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
                          onClick={handleTabClick}
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
                          onClick={handleTabClick}
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
                          onClick={handleTabClick}
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
                          onClick={handleTabClick}
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
                        // borderWidth: 3,
                      }}
                    >
                      <IconButton size="small">
                        <KeyboardArrowLeftIcon
                          color="secondary"
                          sx={{ width: 15 }}
                        />
                      </IconButton>
                      FY 2023
                      <IconButton size="small" sx={{}}>
                        <KeyboardArrowRightIcon
                          color="secondary"
                          sx={{ width: 15 }}
                        />
                      </IconButton>
                    </Button>
                    <IconButton
                      size="small"
                      sx={{ ml: 1 }}
                      onClick={() => handleDownload(selectedFormat)}
                    >
                      <DownloadIcon color="secondary" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ ml: -1 }}
                      onClick={handleClickOpen}
                    >
                      <KeyboardArrowDownIcon //small window to select format (Dialog component)
                        color="secondary"
                      />
                    </IconButton>
                    <FormatDialog
                      selectedValue={selectedValue}
                      open={dialogOpen}
                      onClose={handleClose}
                      onFormatSelect={handleFormatSelect}
                      secondDialogOpen={secondDialogOpen}
                      onCloseSecond={handleCloseSecond}
                      setSecondDialogOpen={setSecondDialogOpen}
                    />
                  </div>
                  <CommunityList data={communities} />
                  {/* <EnhancedTable /> */}
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
