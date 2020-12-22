import React, { useEffect, useRef, useState } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { updateCategory } from './categoriesSlice'
import TextField from '@material-ui/core/TextField'
import { useOutsideClick, useEnterKeyPressed } from '../../hooks'
import { useDispatch } from 'react-redux'

// export default function CategoriesTextCell({ category, onUpdate }) {
export default function CategoriesTextCell({ id, name, type, onUpdate }) {
    const [isInChangeMode, setChangeMode] = useState(false)
    const [newValue, setNewValue] = useState(null)
    const [updatedCategory, setUpdatedCategory] = useState(false)
    const containerRef = useRef()
    
    console.log(arguments)

    useEffect(() => {
        containerRef.current
        if (isInChangeMode) {
            containerRef.current.querySelector('input').focus()
        }
    }, [isInChangeMode])

    useOutsideClick(containerRef, () => {
        if (!isInChangeMode) return
        submitChanges()
    })

    useEnterKeyPressed(() => {
        submitChanges()
    })

    const handleChange = (e) => {
        const newName = e.target.value
        if (!newName) return
        setUpdatedCategory({id, name: newName, type: type.toLowerCase()})
    }

    const submitChanges = () => {
        if (!updatedCategory) return
        onUpdate(updatedCategory)
        setChangeMode(false)
    }

    return (
        <TableCell
            ref={containerRef}
            data-id={'value'}
            data-name={name}
            onClick={handleChange}
        >
            {!isInChangeMode ? (
                <span onClick={() => setChangeMode(true)}>{name}</span>
            ) : (
                <TextField
                    defaultValue={name}
                    onChange={handleChange}
                />
            )}
        </TableCell>
    )
}
