import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import { communityRowsData } from '../data'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function CommunityList() {
  return (
    <React.Fragment>
      {/* <Title>Recent Orders</Title> */}
      <Table style={{ width: 1750 }}>
        <TableHead>
          <TableRow>
            <TableCell>Community</TableCell>
            <TableCell>Community Id</TableCell>
            <TableCell>Forecasted</TableCell>
            <TableCell>Projected</TableCell>
            <TableCell>Total Homesites</TableCell>
            <TableCell>Panneled</TableCell>
            <TableCell>Permitted</TableCell>
            <TableCell>SOP</TableCell>
            <TableCell>Trenched</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {communityRowsData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.community}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.forecasted}</TableCell>
              <TableCell>{row.projected}</TableCell>
              <TableCell>{row.totalHomesites}</TableCell>
              <TableCell>{row.paneled}</TableCell>
              <TableCell>{row.permitted}</TableCell>
              <TableCell>{row.sop}</TableCell>
              <TableCell>{row.trenched}</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  )
}
