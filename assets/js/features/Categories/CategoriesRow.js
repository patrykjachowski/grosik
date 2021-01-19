import React from "react";
import {useDispatch} from "react-redux";
import {createSubcategory, deleteSubcategories, update} from "./categoriesSlice";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CategoriesTextCell from "./CategoriesTextCell";
import CategoriesRowEdit from "./CategoriesRowEdit";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import AddIcon from "@material-ui/icons/Add";
import CategoriesSubRows from "./CategoriesSubRows";
import {makeStyles} from "@material-ui/core/styles";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
})


export default function Row({ row }) {
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
                                    {/*{renderSubcategories(*/}
                                    {/*    row,*/}
                                    {/*    countSelectedSubcategories*/}
                                    {/*)}*/}
                                    <CategoriesSubRows row={row} countSelectedSubcategories={countSelectedSubcategories} />
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
