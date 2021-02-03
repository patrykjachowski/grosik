import React from 'react'
import { useSelector } from 'react-redux'
import { selectBudgets } from './budgetsSlice'
import { selectUser } from '../User/userSlice'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'

export default function BudgetInfo() {
  const budgets = useSelector(selectBudgets)
  const user = useSelector(selectUser)
  const totalBalance = user ? user.totalBalance : 0
  const budgetSum = budgets.reduce((a, b) => a + b.value, 0)

  const renderBudgetInfo = () => {
    return totalBalance === budgetSum
      ? 'Budget cleared'
      : totalBalance > budgetSum
      ? 'To budget'
      : 'Overbudget!'
  }

  const getBoxBgColor = () => {
    return totalBalance === budgetSum
      ? 'success.light'
      : totalBalance > budgetSum
      ? 'info.main'
      : 'error.main'
  }

  return (
    <Box
      width="50%"
      bgcolor={getBoxBgColor()}
      m="auto"
      p="20px"
      boxShadow={3}
      color="white"
    >
      <Typography variant="h4" gutterBottom>
        {(totalBalance - budgetSum).toFixed(2)}
      </Typography>
      <Typography>{renderBudgetInfo()}</Typography>
    </Box>
  )
}
