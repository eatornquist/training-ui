import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
// import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
// import Title from './Title'
import { TablePagination } from '@mui/material'
// import { Label } from '@mui/icons-material'
// import { ICommunities } from './Dashboard'
import EnhancedTableHead from './EnhancedTableHead'
import { Order } from './EnhancedTableHead'
import { ICommunities } from './Dashboard'

// function preventDefault(event: React.MouseEvent) {
//   event.preventDefault()
// }

interface dataProps {
  data: {
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
  }[]
}
// export interface Data {
//   community: string
//   communityId: number
//   forecasted: number
//   projected: number
//   totalHomesites: number
//   paneled: number
//   permitted: number
//   sop: number
//   trenched: number
//   communityStatus: string
// }

// export default function CommunityList(props: IRecentForecast) {
const CommunityList: React.FC<dataProps> = ({ data }) => {
  let forecastedSum: number = 0
  let projectedSum: number = 0
  let totalHomesitesSum: number = 0
  let paneledSum: number = 0
  let permittedSum: number = 0
  let sopSum: number = 0
  let trenchedSum: number = 0

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof ICommunities>('community')

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ICommunities
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function tableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) {
        return order
      }
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  const visibleRows = useMemo(
    () =>
      tableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  )

  // const [visibleRows, setVisibleRows] = React.useState(() =>
  //   tableSort(data, getComparator(order, orderBy)).slice(
  //     page * rowsPerPage,
  //     page * rowsPerPage + rowsPerPage
  //   )
  // )

  // useEffect(() => {
  //   setVisibleRows(data)
  // }, [])

  // console.log(visibleRows)
  // console.log(data)

  return (
    <React.Fragment>
      <Table style={{ width: 1750 }}>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {(rowsPerPage > 0
            ? visibleRows.length === 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : visibleRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
            : visibleRows.length === 0
            ? data
            : visibleRows
          ).map((row) => {
            forecastedSum += row.forecasted
            projectedSum += row.projected
            totalHomesitesSum += row.totalHomesites
            paneledSum += row.paneled
            permittedSum += row.permitted
            sopSum += row.sop
            trenchedSum += row.trenched
            return (
              <TableRow key={row.communityId}>
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
                  {row.communityId}
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, { value: -1, label: 'All' }]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  )
}

export default CommunityList
