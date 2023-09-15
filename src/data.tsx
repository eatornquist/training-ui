import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

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
  createData(26187, 'Candleberry Place', 35, 0, 208, 0, 2, 208, 208, 'Active'),
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
