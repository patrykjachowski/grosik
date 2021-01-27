export const getCategoryWithAdditionalData = (
    category,
    calendarCurrentDate
) => {
    const subcategories = category.subcategories.map((subcategory) => {
        return {
            ...subcategory,
            activity: getCurrentMonthTransactionsSum(
                subcategory,
                calendarCurrentDate
            ),
            budget: getCurrentMonthBudget(subcategory, calendarCurrentDate),
        }
    })

    const activity = parseFloat(
        subcategories.reduce((a, b) => a + b.activity, 0).toFixed(2)
    )

    const budget = subcategories.reduce((a, b) => a + b.budget[0].value, 0)

    return {
        ...category,
        activity,
        budget,
        subcategories,
    }
}

const getCurrentMonthTransactionsSum = (subcategory, calendarCurrentDate) => {
    const transactions = getCurrentMonthElements(
        'transactions',
        subcategory,
        calendarCurrentDate
    )

    if (!transactions.length) return 0
    return transactions.reduce((a, b) => a + b.value, 0)
}

const getCurrentMonthBudget = (subcategory, calendarCurrentDate) => {
    return getCurrentMonthElements('budgets', subcategory, calendarCurrentDate)
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
