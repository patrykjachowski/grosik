import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { update, updateBudget } from './categoriesSlice'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import CategoriesTextCell from './CategoriesTextCell'
import { getCurrentMonthActivities } from './helpers'
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
            const activity = getCurrentMonthActivities(subcategory, calendarDate)
            const available = (subcategory.budget[0].value + parseFloat(activity)).toFixed(2)
            console.log(activity)

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
                        id={subcategory.budget[0].id}
                        name={subcategory.budget[0].value}
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
                    <TableCell>{activity}</TableCell>
                    <TableCell> {available} </TableCell>
                    <TableCell/>
                </TableRow>
            )
        })
    )
}
