import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { update } from './categoriesSlice'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import CategoriesTextCell from './CategoriesTextCell'

export default function CategoriesSubRows({ category, onCheckboxClick }) {
  const dispatch = useDispatch()

  return !category.subcategories.length ? (
    <TableRow>
      <TableCell colSpan={6}>No categories...</TableCell>
    </TableRow>
  ) : (
    category.subcategories.map((subcategory) => {
      const available = (
        subcategory.budget[0].value + subcategory.activity
      ).toFixed(2)

      return (
        <TableRow key={subcategory['@id']}>
          <TableCell padding="checkbox">
            <Checkbox
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={rowCount > 0 && numSelected === rowCount}
              onChange={() => onCheckboxClick(subcategory)}
              inputProps={{
                'aria-label': 'select row',
              }}
            />
          </TableCell>
          <CategoriesTextCell
            id={subcategory.id}
            name={subcategory.name}
            type={subcategory['@type']}
            onUpdate={(changedElement) => dispatch(update(changedElement))}
            colSpan={2}
          />
          <CategoriesTextCell
            id={subcategory.budget[0] ? subcategory.budget[0].id : 0}
            name={subcategory.budget[0].value || 0}
            type={'budget'}
            onUpdate={(changedElement) =>
              dispatch(
                update({
                  ...changedElement,
                  value: parseFloat(changedElement.name),
                })
              )
            }
          />
          <TableCell>{subcategory.activity}</TableCell>
          <TableCell> {available} </TableCell>
          <TableCell />
        </TableRow>
      )
    })
  )
}

CategoriesSubRows.propTypes = {
  category: PropTypes.object,
  onCheckboxClick: PropTypes.func,
}
