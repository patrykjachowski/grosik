import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useDispatch, useSelector } from 'react-redux'
import {
    createCategory,
    selectCategories,
} from './categoriesSlice'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ErrorPopup from '../../components/ErrorPopup'
import CategoriesRow from "./CategoriesRow";


export default function Categories() {
    const categories = useSelector(selectCategories)

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
                                <React.Fragment key={category['@id']}>
                                    <CategoriesRow category={category} />
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
