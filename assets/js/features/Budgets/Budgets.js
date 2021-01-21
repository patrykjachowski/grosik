import React from 'react'
import { useSelector } from 'react-redux'
import { selectBudgets } from './budgetsSlice'
import { selectUser } from '../User/userSlice'

export default function Budgets() {
    const budgets = useSelector(selectBudgets)
    const user = useSelector(selectUser)
    const totalBalance = user ? user.totalBalance : 0
    const budgetSum = budgets.reduce((a, b) => a + b.value, 0)

    const renderBudgetInfo = () => {
        return totalBalance === budgetSum ? (
            <span className="alarm">Budget cleared</span>
        ) : totalBalance > budgetSum ? (
            <span className="success">To be budgeted</span>
        ) : (
            <span className="alarm">Overbudget!</span>
        )
    }

    return (
        <div>
            <div>{(totalBalance - budgetSum).toFixed(2)}</div>
            <div>{renderBudgetInfo()}</div>
        </div>
    )
}
