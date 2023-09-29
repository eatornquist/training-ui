import React from 'react'
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { headCells } from '../data'
import { ICommunities } from './Dashboard'

export type Order = 'asc' | 'desc'

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ICommunities
  ) => void
  order: Order
  orderBy: string
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof ICommunities) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow style={{ background: '#dce3e8', fontWeight: 'bold' }}>
        {headCells.map((data) => (
          <TableCell
            key={data.label}
            style={{
              border: '1px solid',
              borderColor: '#f4f6f9',
              fontWeight: 'bold',
            }}
            sortDirection={orderBy === data.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === data.id}
              direction={orderBy === data.id ? order : 'asc'}
              onClick={createSortHandler(data.id)}
            >
              {data.label}
              {orderBy === data.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
