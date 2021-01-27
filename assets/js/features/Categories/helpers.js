export const getCurrentMonthActivities = (subcategory, calendarCurrentDate) => {
    if (!subcategory) return 0

    const matchingTransactions = subcategory.transactions.map((transaction) => {
        const transactionDate = new Date(transaction.date)
        const transactionYear = transactionDate.getFullYear()
        const transactionMonth = transactionDate.getMonth()

        const calendarDate = new Date(calendarCurrentDate)
        const calendarDateYear = calendarDate.getFullYear()
        const calendarDateMonth = calendarDate.getMonth()

        if (
            transactionYear === calendarDateYear &&
            transactionMonth === calendarDateMonth
        ) {
            return transaction
        }
    }).filter((n) => n)


    if (!matchingTransactions.length) return 0
    return matchingTransactions.reduce((a, b) => a + b.value, 0).toFixed(2)
}
