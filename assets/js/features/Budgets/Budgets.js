import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {budgetsSlice, selectBudgets} from "./budgetsSlice";

export default function Budgets() {
    const budgets = useSelector(selectBudgets)
    const totalBalance = useSelector(selectBudgets)
    const dispatch = useDispatch()

    const budgetSum = budgets.reduce((a,b) => a + b.value, 0)
    console.log(budgetSum)

    return `Total budgeted for the current month: ${budgetSum}`

}