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
import {
    createCategory,
    createSubcategory,
    deleteSubcategories,
    selectCategories,
    update,
} from './categoriesSlice'
import Checkbox from '@material-ui/core/Checkbox'
import CategoriesTextCell from './CategoriesTextCell'
import CategoriesRowEdit from './CategoriesRowEdit'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Tooltip from '@material-ui/core/Tooltip'
import ErrorPopup from "../../components/ErrorPopup";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
})

function Row({ row }) {
    const [selectedSubcategories, setSelectedSubcategories] = React.useState([])
    const [open, setOpen] = React.useState(true)
    const classes = useRowStyles()
    const dispatch = useDispatch()

    const countSelectedSubcategories = (selectedSubcategory) => {
        const toggledSubcategories = selectedSubcategories.includes(
            selectedSubcategory
        )
            ? selectedSubcategories.filter(
                  (subcategory) => subcategory !== selectedSubcategory
              )
            : [...selectedSubcategories, selectedSubcategory]
        setSelectedSubcategories(toggledSubcategories)
    }

    const handleDeleteSubcategories = () => {
        dispatch(deleteSubcategories(selectedSubcategories))
        setSelectedSubcategories([])
    }

    return (
        <React.Fragment>
            {selectedSubcategories.length > 0 ? (
                <TableRow className={classes.root} bgcolor="danger">
                    <TableCell colSpan={3}>
                        <Typography>
                            Selected subcategories:{' '}
                            {selectedSubcategories.length}
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
                <TableRow className={classes.root} bgcolor="#95e3e6">
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
                            dispatch(update(changedElement))
                        }
                        colSpan={2}
                    />
                    <TableCell>{row.budgeted || 0}</TableCell>
                    <TableCell>{row.activity || 0}</TableCell>
                    <TableCell>{row.available || 0}</TableCell>
                    <TableCell align="right">
                        <CategoriesRowEdit id={row.id} />
                    </TableCell>
                </TableRow>
            )}
            <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table
                                aria-label="purchases"
                                style={{ tableLayout: 'fixed' }}
                            >
                                <TableBody>
                                    {renderSubcategories(
                                        row,
                                        countSelectedSubcategories
                                    )}
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
                                                onClick={() =>
                                                    dispatch(
                                                        createSubcategory(
                                                            row.id
                                                        )
                                                    )
                                                }
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
        </React.Fragment>
    )
}

const renderSubcategories = (row, onCheckboxClick) => {
    const dispatch = useDispatch()
    return !row.subcategories.length ? (
        <TableRow>
            <TableCell colSpan={6}>No categories...</TableCell>
        </TableRow>
    ) : (
        row.subcategories.map((subcategory) => (
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
                    onUpdate={(changedElement) =>
                        dispatch(update(changedElement))
                    }
                    colSpan={2}
                />
                <TableCell>{subcategory.budgeted || 0}</TableCell>
                <TableCell>{subcategory.activity || 0}</TableCell>
                <TableCell>{subcategory.available || 0}</TableCell>
                <TableCell></TableCell>
            </TableRow>
        ))
    )
}

export default function Categories() {
    const categories = useSelector(selectCategories)
    const dispatch = useDispatch()

    return (
        <div style={{ position: 'relative', paddingBottom: '100px' }}>
            <TableContainer component={Paper}>
                <Table
                    aria-label="collapsible table"
                    style={{ tableLayout: 'fixed' }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '60px' }} />
                            <TableCell colSpan={2}>Category</TableCell>
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
                                <React.Fragment key={category.id}>
                                    <Row row={category} />
                                </React.Fragment>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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
