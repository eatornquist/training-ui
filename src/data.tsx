import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

export const communityRowsData = [
  {
    id: 7695,
    community: 'Aspen Groove',
    forecasted: 0,
    projected: 35,
    totalHomesites: 45,
    paneled: 0,
    permitted: 2,
    sop: 0,
    trenched: 0,
    communityStatus: 'Active',
  },
  {
    id: 26176,
    community: 'Azalea Village SFR',
    forecasted: 35,
    projected: '-',
    totalHomesites: 208,
    paneled: 0,
    permitted: 2,
    sop: 208,
    trenched: 208,
    communityStatus: 'Active',
  },
  {
    id: 26187,
    community: 'Candleberry Place',
    forecasted: 35,
    projected: '-',
    totalHomesites: 208,
    paneled: 0,
    permitted: 2,
    sop: 208,
    trenched: 208,
    communityStatus: 'Active',
  },
]

export const communityColumnsData: GridColDef[] = [
  { field: 'community', headerName: 'Community', width: 180 },
  { field: 'id', headerName: 'Community Id', width: 120 },
  { field: 'forecasted', headerName: 'Forecasted', width: 90 },
  {
    field: 'projected',
    headerName: 'Projected',
    width: 90,
  },
  {
    field: 'totalHomesites',
    headerName: 'Total Homesites',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'paneled', headerName: 'Paneled', width: 130 },
  { field: 'permitted', headerName: 'Permitted', width: 130 },
  { field: 'sop', headerName: 'SOP', width: 130 },
  { field: 'trenched', headerName: 'Trenched', width: 130 },
  { field: 'action', headerName: 'Action', width: 130 },
]
