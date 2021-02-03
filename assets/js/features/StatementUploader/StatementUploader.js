import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { DropzoneArea } from 'material-ui-dropzone'
import { fetchTransactions } from '../Transactions/transactionsSlice'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import {
  selectStatementUploaderStatus,
  toggleStatementUploader,
} from './statementUploaderSlice'

const StatementUploader = () => {
  const dispatch = useDispatch()
  const isActive = useSelector(selectStatementUploaderStatus)

  const handleFileUpload = (file) => {
    if (!file.length) return
    const formData = new FormData()
    const bankId = 1

    formData.append('file', file[0])
    formData.append('bankId', bankId)

    axios
      .post('/statement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        dispatch(fetchTransactions())
      })
      .catch((error) => {
        console.log(error.response.data.detail)
      })
  }

  return (
    <Box mb={2}>
      <Box mb={2} align="right">
        {isActive ? (
          <Button
            position="right"
            variant="outlined"
            color="secondary"
            align="right"
            endIcon={<Icon>close</Icon>}
            onClick={() => dispatch(toggleStatementUploader())}
          >
            Close
          </Button>
        ) : (
          <Button
            position="right"
            variant="outlined"
            color="primary"
            align="right"
            endIcon={<Icon>add</Icon>}
            onClick={() => dispatch(toggleStatementUploader())}
          >
            Add transactions
          </Button>
        )}
      </Box>
      {isActive && <DropzoneArea onChange={handleFileUpload} />}
    </Box>
  )
}

export default StatementUploader
