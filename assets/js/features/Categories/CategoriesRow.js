import React from 'react'
import { useDispatch } from 'react-redux'
import {
    createSubcategory,
    deleteSubcategories,
    update,
} from './categoriesSlice'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import CategoriesTextCell from './CategoriesTextCell'
import CategoriesRowEdit from './CategoriesRowEdit'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import AddIcon from '@material-ui/icons/Add'
import CategoriesSubRows from './CategoriesSubRows'
import { makeStyles } from '@material-ui/core/styles'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
})

const calculateCategoryBudget = (category) => {
    const subcategoriesBudget = category.subcategories.map(
        (subcategory) => subcategory.budget[0]
    )

    return subcategoriesBudget.reduce((a, b) => a + b.value, 0)
}

const calculateCategoryActivity = (category) => {
    let activitySum = 0

    category.subcategories.forEach((subcategory) => {
        const subcategoryActivity = subcategory.transactions
            .reduce((a, b) => a + b.value, 0)
            .toFixed(2)

        activitySum += parseFloat(subcategoryActivity)
    })

    return activitySum
}

const calculateCategoryAvailable = (categoryActivity, categoryBudget) => {
    return categoryActivity + categoryBudget
}

export default function CategoriesRow({ category }) {
    const [selectedSubcategories, setSelectedSubcategories] = React.useState([])
    const [open, setOpen] = React.useState(true)
    const classes = useRowStyles()
    const dispatch = useDispatch()
    const categoryActivity = calculateCategoryActivity(category)
    const categoryBudget = calculateCategoryBudget(category)
    const categoryAvailable = calculateCategoryAvailable(categoryActivity, categoryBudget)

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
                            aria-label="expand category"
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
                        id={category.id}
                        name={category.name}
                        type={category['@type']}
                        onUpdate={(changedElement) =>
                            dispatch(update(changedElement))
                        }
                        colSpan={2}
                    />
                    <TableCell>{categoryBudget}</TableCell>
                    <TableCell>{categoryActivity}</TableCell>
                    <TableCell>{categoryAvailable}</TableCell>
                    <TableCell align="right">
                        <CategoriesRowEdit id={category.id} />
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
                                    <CategoriesSubRows
                                        category={category}
                                        onCheckboxClick={
                                            countSelectedSubcategories
                                        }
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
                                                onClick={() =>
                                                    dispatch(
                                                        createSubcategory(
                                                            category.id
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
