import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import format from 'date-fns/format'
import { updateTransaction } from './transactionsSlice'
import { useEnterKeyPressed, useOutsideClick } from '../../hooks'
import { useDispatch } from 'react-redux'

export default function TransactionsDateCell({ transaction }) {
  const [isInChangeMode, setChangeMode] = useState(false)
  const [updatedTransaction, setUpdatedTransaction] = useState(false)
  const containerRef = useRef()
  const dispatch = useDispatch()

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
    setUpdatedTransaction({
      ...transaction,
      date: new Date(e.target.value),
    })
  }

  const submitChanges = () => {
    if (!updatedTransaction) return
    dispatch(updateTransaction(updatedTransaction))
    setChangeMode(false)
  }

  const getDefaultDate = () => {
    const transactionDate = new Date(transaction.date)
    return format(transactionDate, 'yyyy-MM-dd')
  }

  return (
    <TableCell ref={containerRef}>
      {!isInChangeMode ? (
        <span onClick={() => setChangeMode(true)}>
          {new Date(transaction.date).toLocaleDateString()}
        </span>
      ) : (
        <form noValidate>
          <TextField
            id="date"
            label="Data transakcji"
            type="date"
            defaultValue={getDefaultDate()}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
          />
        </form>
      )}
    </TableCell>
  )
}

TransactionsDateCell.propTypes = {
  transaction: PropTypes.object.isRequired,
}
