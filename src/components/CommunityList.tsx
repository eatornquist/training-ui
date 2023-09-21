import * as React from 'react'
// import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
// import Title from './Title'
import { tableHeaderData } from '../data'
import { TableFooter, TablePagination } from '@mui/material'
// import { Label } from '@mui/icons-material'
import { ICommunities } from './Dashboard'

// function preventDefault(event: React.MouseEvent) {
//   event.preventDefault()
// }

export interface dataProps {
  data: {
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
  }[]
}

// export default function CommunityList(props: IRecentForecast) {
const CommunityList: React.FC<dataProps> = ({ data }) => {
  let forecastedSum: number = 0
  let projectedSum: number = 0
  let totalHomesitesSum: number = 0
  let paneledSum: number = 0
  let permittedSum: number = 0
  let sopSum: number = 0
  let trenchedSum: number = 0

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      <Table style={{ width: 1750 }}>
        <TableHead>
          <TableRow style={{ background: '#dce3e8', fontWeight: 'bold' }}>
            {tableHeaderData.map((data) => {
              return (
                <TableCell
                  id={data.id.toString()}
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                    fontWeight: 'bold',
                  }}
                >
                  {data.header}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? tableHeaderData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : data
          ).map((row) => {
            forecastedSum += row.forecasted
            projectedSum += row.projected
            totalHomesitesSum += row.totalHomesites
            paneledSum += row.paneled
            permittedSum += row.permitted
            sopSum += row.sop
            trenchedSum += row.trenched
            return (
              <TableRow key={row.id}>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                  }}
                >
                  {row.community}
                </TableCell>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                  }}
                >
                  {row.id}
                </TableCell>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                  }}
                >
                  {row.forecasted}
                </TableCell>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                  }}
                >
                  {row.projected}
                </TableCell>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                    color: '#1f75bb',
                  }}
                >
                  {row.totalHomesites}
                </TableCell>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                  }}
                >
                  {row.paneled}
                </TableCell>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                  }}
                >
                  {row.permitted}
                </TableCell>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                  }}
                >
                  {row.sop}
                </TableCell>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                  }}
                >
                  {row.trenched}
                </TableCell>
                <TableCell
                  style={{
                    border: '1px solid',
                    borderColor: '#f4f6f9',
                  }}
                >
                  ...
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow style={{ background: '#f3faff' }}>
            <TableCell colSpan={2} style={{ fontWeight: 'bold' }}>
              Total
            </TableCell>
            <TableCell>{forecastedSum}</TableCell>
            <TableCell>{projectedSum}</TableCell>
            <TableCell>{totalHomesitesSum}</TableCell>
            <TableCell>{paneledSum}</TableCell>
            <TableCell>{permittedSum}</TableCell>
            <TableCell>{sopSum}</TableCell>
            <TableCell>{trenchedSum}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Total
      </Link> */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, { value: -1, label: 'All' }]}
        component="div"
        count={tableHeaderData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  )
}

export default CommunityList
