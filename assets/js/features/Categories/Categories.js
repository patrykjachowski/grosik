import React from 'react'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, selectCategories } from './categoriesSlice'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ErrorPopup from '../../components/ErrorPopup'
import CategoriesTable from './CategoriesTable'

export default function Categories() {
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()

  return (
    <div style={{ position: 'relative', paddingBottom: '100px' }}>
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
      {!categories ? (
        <CategoriesTable category={null} />
      ) : (
        categories.map((category) => (
          <CategoriesTable key={category.id} category={category} />
        ))
      )}
      <br />
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'absolute', right: '10px', bottom: '10px' }}
        onClick={() => dispatch(createCategory())}
      >
        <AddIcon />
      </Fab>
      <ErrorPopup />
    </div>
  )
}
