export const getCurrentMonthTransactionsSum = (
    subcategory,
    calendarCurrentDate
) => {
    const transactions = getCurrentMonthElements(
        'transactions',
        subcategory,
        calendarCurrentDate
    )

    if (!transactions.length) return 0
    return transactions.reduce((a, b) => a + b.value, 0).toFixed(2)
}

export const getCurrentMonthBudget = (subcategory, calendarCurrentDate) => {
    const budget = getCurrentMonthElements(
        'budgets',
        subcategory,
        calendarCurrentDate
    )

    return budget.length ? budget[0] : 0
}

const getCurrentMonthElements = (
    elements,
    subcategory,
    calendarCurrentDate
) => {
    if (!subcategory) return 0

    return subcategory[elements]
        .map((element) => {
            const elementDate = new Date(element.date)
            const elementYear = elementDate.getFullYear()
            const elementMonth = elementDate.getMonth()

            const calendarDate = new Date(calendarCurrentDate)
            const calendarDateYear = calendarDate.getFullYear()
            const calendarDateMonth = calendarDate.getMonth()

            if (
                elementYear === calendarDateYear &&
                elementMonth === calendarDateMonth
            ) {
                return element
            }
        })
        .filter((n) => n)
}
