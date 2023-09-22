// import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

// Generate Order Data
function createData(
  id: number,
  community: string,
  forecasted: number,
  projected: number,
  totalHomesites: number,
  paneled: number,
  permitted: number,
  sop: number,
  trenched: number,
  communityStatus: string
) {
  return {
    id,
    community,
    forecasted,
    projected,
    totalHomesites,
    paneled,
    permitted,
    sop,
    trenched,
    communityStatus,
  }
}

export const communityRowsData = [
  createData(7695, 'Aspen Groove', 0, 35, 45, 0, 2, 0, 0, 'Active'),
  createData(26176, 'Azalea Village SFR', 35, 0, 208, 0, 2, 208, 208, 'Active'),
  createData(
    26187,
    'Candleberry Place',
    35,
    0,
    208,
    0,
    2,
    208,
    208,
    'Completed'
  ),
  createData(7601, 'Cedar Grove', 35, 0, 208, 0, 2, 208, 208, 'Completed'),
  createData(
    68809,
    'Dartmoor At Mountian Crest',
    0,
    35,
    45,
    0,
    2,
    0,
    0,
    'Completed'
  ),
  createData(7669, 'Deerhaven SFR', 35, 0, 208, 0, 2, 208, 208, 'Archived'),
  createData(
    26174,
    'Envoy at Ponce TH',
    35,
    0,
    208,
    0,
    2,
    208,
    208,
    'Archived'
  ),
  createData(26152, 'Erkside Road', 35, 0, 208, 5, 2, 208, 208, 'Archived'),
  createData(26132, 'Fernhust', 0, 35, 45, 0, 2, 0, 0, 'Archived'),
  createData(
    26193,
    'Gainsville Township',
    35,
    0,
    208,
    0,
    2,
    208,
    208,
    'Archived'
  ),
  createData(7649, 'Haddonstone II', 35, 0, 208, 0, 2, 208, 208, 'Active'),
  createData(26179, 'Hawkings Manor', 35, 0, 208, 0, 2, 208, 208, 'Active'),
  createData(261325, 'Fernhust II', 0, 40, 45, 0, 2, 24, 0, 'Archived'),
  createData(261793, 'Hawkings Major', 35, 0, 298, 0, 2, 208, 207, 'Active'),
]

export const tableHeaderData = [
  {
    id: 1,
    header: 'Community',
  },
  {
    id: 2,
    header: 'Community Id',
  },
  {
    id: 3,
    header: 'Forecasted',
  },
  {
    id: 4,
    header: 'Projected',
  },
  {
    id: 5,
    header: 'Total Homesites',
  },
  {
    id: 6,
    header: 'Paneled',
  },
  {
    id: 7,
    header: 'Permitted',
  },
  {
    id: 8,
    header: 'SOP',
  },
  {
    id: 9,
    header: 'Trenched',
  },
  {
    id: 10,
    header: 'Action',
  },
]

// export const communityColumnsData: GridColDef[] = [
//   { field: 'community', headerName: 'Community', width: 180 },
//   { field: 'id', headerName: 'Community Id', width: 120 },
//   { field: 'forecasted', headerName: 'Forecasted', width: 90 },
//   {
//     field: 'projected',
//     headerName: 'Projected',
//     width: 90,
//   },
//   {
//     field: 'totalHomesites',
//     headerName: 'Total Homesites',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 130,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
//   { field: 'paneled', headerName: 'Paneled', width: 130 },
//   { field: 'permitted', headerName: 'Permitted', width: 130 },
//   { field: 'sop', headerName: 'SOP', width: 130 },
//   { field: 'trenched', headerName: 'Trenched', width: 130 },
//   { field: 'action', headerName: 'Action', width: 130 },
// ]
