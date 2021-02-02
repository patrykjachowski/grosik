import React from 'react'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import { TableRow } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import { createSubcategory } from './categoriesSlice'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch } from 'react-redux'
import CategoriesTableBodyInner from './CategoriesTableBodyInner'

const CategoriesTableBody = ({ category }) => {
  const dispatch = useDispatch()

  return (
    <TableBody>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={7}>
          <Collapse in={!category.collapsed} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table aria-label="purchases" style={{ tableLayout: 'fixed' }}>
                <TableBody>
                  <CategoriesTableBodyInner
                    subcategories={category.subcategories}
                  />
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="right"
                      style={{
                        padding: '5px 16px',
                        borderBottom: 0,
                      }}
                    >
                      <IconButton
                        aria-label="add subcategory"
                        size="small"
                        onClick={() => dispatch(createSubcategory(category.id))}
                      >
                        <AddIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

CategoriesTableBody.propTypes = {
  category: PropTypes.object,
  unCollapsed: PropTypes.bool,
}

export default CategoriesTableBody
