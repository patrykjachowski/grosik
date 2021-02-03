import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import CategoriesTextCell from './CategoriesTextCell'
import CategoriesRowEdit from './CategoriesRowEdit'
import PropTypes from 'prop-types'
import { TableHead, TableRow } from '@material-ui/core'
import ArrowButton from '../../../components/ArrowButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  update,
  deleteSubcategories,
  deselectSubcategories,
  selectMarkedSubcategories,
  toggleCategoryCollapse,
} from '../categoriesSlice'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const CategoriesTableHead = ({
  id,
  name,
  type,
  budget,
  activity,
  collapsed = false,
}) => {
  const dispatch = useDispatch()
  const available = (activity + budget).toFixed(2)
  const selectedSubcategories = useSelector(selectMarkedSubcategories)
  const markedCategorySubcategories = selectedSubcategories.filter(
    (subcategory) => subcategory.categoryId === id
  )

  const handleDeleteSubcategories = () => {
    dispatch(deleteSubcategories(selectedSubcategories))
    dispatch(deselectSubcategories)
  }

  const handleCategoryCollapse = () => {
    dispatch(toggleCategoryCollapse(id))
  }

  return (
    <TableHead>
      {markedCategorySubcategories.length ? (
        <TableRow bgcolor="danger">
          <TableCell colSpan={3}>
            <Typography>
              Selected subcategories: {selectedSubcategories.length}
            </Typography>
          </TableCell>
          <TableCell colSpan={4} align="right">
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={handleDeleteSubcategories}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell style={{ width: '48px' }}>
            <ArrowButton
              collapsed={collapsed}
              onToggleCollapse={handleCategoryCollapse}
            />
          </TableCell>
          <CategoriesTextCell
            id={id}
            name={name}
            type={type}
            onUpdate={(changedElement) => dispatch(update(changedElement))}
            colSpan={2}
          />
          <TableCell>{budget}</TableCell>
          <TableCell>{activity}</TableCell>
          <TableCell>{available}</TableCell>
          <TableCell align="right">
            <CategoriesRowEdit id={id} />
          </TableCell>
        </TableRow>
      )}
    </TableHead>
  )
}

CategoriesTableHead.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  activity: PropTypes.number.isRequired,
  collapsed: PropTypes.bool,
}

export default CategoriesTableHead
