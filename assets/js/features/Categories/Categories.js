import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, update } from './categoriesSlice'
import Checkbox from '@material-ui/core/Checkbox'
import CategoriesTextCell from './CategoriesTextCell'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
})

function Row({ row }) {
    const [open, setOpen] = React.useState(true)
    const classes = useRowStyles()
    const dispatch = useDispatch()

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell style={{ marginRight: '30px' }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {!open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <CategoriesTextCell
                    id={row.id}
                    name={row.name}
                    type={row['@type']}
                    onUpdate={(changedElement) =>
                        dispatch(
                            update(
                                changedElement
                            )
                        )
                    }
                />
                <TableCell>{row.budgeted || 0}</TableCell>
                <TableCell>{row.activity || 0}</TableCell>
                <TableCell>{row.available || 0}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table
                                aria-label="purchases"
                                style={{ tableLayout: 'fixed' }}
                            >
                                <TableBody>
                                    {row.subcategories.map((subcategory) => (
                                        <TableRow key={subcategory['@id']}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                                                    // checked={rowCount > 0 && numSelected === rowCount}
                                                    // onChange={onSelectAllClick}
                                                    inputProps={{
                                                        'aria-label':
                                                            'select row',
                                                    }}
                                                />
                                            </TableCell>

                                            <CategoriesTextCell
                                                id={subcategory.id}
                                                name={subcategory.name}
                                                type={subcategory['@type']}
                                                onUpdate={(changedElement) =>
                                                    dispatch(
                                                        update(
                                                            changedElement
                                                        )
                                                    )
                                                }
                                            />
                                            <TableCell>
                                                {subcategory.budgeted || 0}
                                            </TableCell>
                                            <TableCell>
                                                {subcategory.activity || 0}
                                            </TableCell>
                                            <TableCell>
                                                {subcategory.available || 0}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default function Categories() {
    const categories = useSelector(selectCategories)

    return (
        <TableContainer component={Paper}>
            <Table
                aria-label="collapsible table"
                style={{ tableLayout: 'fixed' }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '60px' }} />
                        <TableCell>Category</TableCell>
                        <TableCell>Budgeted</TableCell>
                        <TableCell>Activity</TableCell>
                        <TableCell>Available</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!categories ? (
                        <TableRow>
                            <TableCell>Loading categories...</TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category) => (
                            <Row key={category.name} row={category} />
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
