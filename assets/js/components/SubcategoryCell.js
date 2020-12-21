import React, {useEffect, useState} from 'react'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {useDispatch, useSelector} from 'react-redux'
import { selectCategories } from '../features/Categories/categoriesSlice'
import { updateTransaction } from "../features/Transactions/transactionsSlice";

export default function SubcategoryCell({ transaction }) {
    const [isSelectVisible, setSelectVisible] = useState(false)
    const { subcategory } = transaction
    const dispatch = useDispatch()

    const handleChange = (value) => {
        const changedTransaction = {
            ...transaction,
            bank: transaction.bank['@id'],
            subcategory: value['@id']
        }
        dispatch(updateTransaction((changedTransaction)))
        setSelectVisible(false)
    }

    return (
        <TableCell >
            {!isSelectVisible ? (
                <span onClick={() => setSelectVisible(true)}>{subcategory ? subcategory.name : 'uncategorised'}</span>
            ) : (
                <Grouped onValueChange={handleChange} />
            )}
        </TableCell>
    )
}

function Grouped({onValueChange}) {
    const  categories  = useSelector(selectCategories)
    const options = categories
        .map((option) => {
            const subcategories = option.subcategories.map(
                (subcategory) => ({ ...subcategory, group: option.name })
            )

            return [...subcategories]
        })
        .reduce((a, b) => a.concat(b), [])

    return (
        <Autocomplete
            id="grouped-demo"
            options={options}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={(e, value) =>  onValueChange(value)}
            renderInput={(params) => (
                <TextField {...params} label="Kategorie" variant="outlined"  />
            )}
        />
    )
}

