import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import { useOutsideClick, useEnterKeyPressed } from '../../../hooks'

export default function CategoriesTextCell({
  id,
  name,
  type,
  onUpdate,
  colSpan,
}) {
  const [isInChangeMode, setChangeMode] = useState(false)
  const [updatedCategory, setUpdatedCategory] = useState(false)
  const containerRef = useRef()

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
    setUpdatedCategory({ id, name: newName, type: type.toLowerCase() })
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
      colSpan={colSpan}
    >
      {!isInChangeMode ? (
        <span onClick={() => setChangeMode(true)}>{name}</span>
      ) : (
        <TextField defaultValue={name} onChange={handleChange} />
      )}
    </TableCell>
  )
}

CategoriesTextCell.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
  onUpdate: PropTypes.func,
  colSpan: PropTypes.number,
}
