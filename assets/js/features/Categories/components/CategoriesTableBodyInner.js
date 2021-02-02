import React from 'react'
import PropTypes from 'prop-types'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import CategoriesTextCell from './CategoriesTextCell'
import { toggleSubcategory, update } from '../categoriesSlice'
import { useDispatch } from 'react-redux'

const CategoriesTableBodyInner = ({ subcategories }) => {
  const dispatch = useDispatch()

  return !subcategories.length ? (
    <TableRow>
      <TableCell colSpan={6}>No categories...</TableCell>
    </TableRow>
  ) : (
    subcategories.map((subcategory) => {
      const available = (
        subcategory.budget[0].value + subcategory.activity
      ).toFixed(2)

      return (
        <TableRow key={subcategory['@id']}>
          <TableCell padding="checkbox">
            <Checkbox
              onChange={() => dispatch(toggleSubcategory(subcategory.id))}
              inputProps={{
                'aria-label': 'select subcategory',
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

CategoriesTableBodyInner.propTypes = {
  subcategories: PropTypes.array,
  onCheckboxClick: PropTypes.func,
}

export default CategoriesTableBodyInner
