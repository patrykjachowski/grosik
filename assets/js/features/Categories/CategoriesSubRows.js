import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { update, updateBudget } from './categoriesSlice'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import CategoriesTextCell from './CategoriesTextCell'
import {getCurrentMonthTransactionsSum, getCurrentMonthBudget} from './helpers'
import {selectDate} from "../Calendar/calendarSlice";

export default function CategoriesSubRows({ category, onCheckboxClick }) {
    const dispatch = useDispatch()
    const calendarDate = useSelector(selectDate)

    return !category.subcategories.length ? (
        <TableRow>
            <TableCell colSpan={6}>No categories...</TableCell>
        </TableRow>
    ) : (
        category.subcategories.map((subcategory) => {
            const activities = getCurrentMonthTransactionsSum(subcategory, calendarDate)
            const budget = getCurrentMonthBudget(subcategory, calendarDate)
            // const available = (subcategory.budget[0].value + parseFloat(activities)).toFixed(2)

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
                        onUpdate={(changedElement) =>
                            dispatch(update(changedElement))
                        }
                        colSpan={2}
                    />
                    <CategoriesTextCell
                        id={budget.id}
                        name={budget.value || 0}
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
                    <TableCell>{activities}</TableCell>
                    {/*<TableCell> {available} </TableCell>*/}
                    <TableCell>0</TableCell>
                    <TableCell/>
                </TableRow>
            )
        })
    )
}
