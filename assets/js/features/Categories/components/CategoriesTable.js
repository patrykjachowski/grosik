import React from 'react'
import PropTypes from 'prop-types'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CategoriesTableHead from './CategoriesTableHead'
import { getCategoryWithAdditionalData } from '../helpers'
import { useSelector } from 'react-redux'
import { selectDate } from '../../Calendar/calendarSlice'
import CategoriesTableBody from './CategoriesTableBody'

const CategoriesTable = ({ category }) => {
  const calendarCurrentDate = useSelector(selectDate)
  const categoryEnriched = getCategoryWithAdditionalData(
    category,
    calendarCurrentDate
  )
  const { id, name, budget, activity, collapsed } = categoryEnriched
  const type = categoryEnriched['@type']

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" style={{ tableLayout: 'fixed' }}>
        {!category ? (
          <TableBody>
            <TableRow>
              <TableCell>Loading categories...</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <>
            <CategoriesTableHead
              id={id}
              name={name}
              type={type}
              budget={budget}
              activity={activity}
              collapsed={collapsed}
            />
            <CategoriesTableBody
              category={categoryEnriched}
              collapsed={collapsed}
            />
          </>
        )}
      </Table>
    </TableContainer>
  )
}

CategoriesTable.propTypes = {
  category: PropTypes.object.isRequired,
}

export default CategoriesTable
