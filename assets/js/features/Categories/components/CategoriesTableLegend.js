import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'

const CategoriesTableLegend = () => (
  <TableContainer component={Paper} style={{ marginBottom: 0 }}>
    <Table aria-label="collapsible table" style={{ tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow>
          <TableCell style={{ width: '60px' }} />
          <TableCell colSpan={2}>Category</TableCell>
          <TableCell>Budgeted</TableCell>
          <TableCell>Activity</TableCell>
          <TableCell>Available</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
    </Table>
  </TableContainer>
)

export default CategoriesTableLegend
