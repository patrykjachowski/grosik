import React, {useEffect, useRef, useState} from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { updateTransaction } from './transactionsSlice'
import TextField from '@material-ui/core/TextField'
import { useOutsideClick, useEnterKeyPressed } from '../../hooks'
import {useDispatch} from "react-redux";

export default function TransactionTextCell({transaction, valueName, value }) {
    const [isInChangeMode, setChangeMode] = useState(false)
    const [newValue, setNewValue] = useState(null)
    const [updatedTransaction, setUpdatedTransaction] = useState(false)
    const containerRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        containerRef.current;
    }, []);

    useOutsideClick(containerRef, () => {
        if (!isInChangeMode) return
        submitChanges()
    })

    useEnterKeyPressed(() => {
        submitChanges()
    })

    const handleChange = (e) => {
        const newValue = e.target.value
        if (!newValue) return
        const updatedTransaction = {...transaction}

        updatedTransaction[valueName] = newValue
        setUpdatedTransaction(updatedTransaction)
    }

    const submitChanges = () => {
        if (!updatedTransaction) return
        dispatch(updateTransaction(updatedTransaction))
        setChangeMode(false)
    }

    return (
        <TableCell ref={containerRef} data-id={'value'} data-name={name} onClick={handleChange}>

            {!isInChangeMode ? (
                <span onClick={() => setChangeMode(true)}>{value}</span>
            ) : (
                <TextField
                    defaultValue={value}
                    onChange={handleChange}
                />
            )}
        </TableCell>
    )
}
