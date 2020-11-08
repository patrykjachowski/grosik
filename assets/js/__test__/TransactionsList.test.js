import React from 'react';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Transactions from '../components/TransactionsList'

const singleTransaction = [
    {
        bank: 'AcmeBank',
        subcategory: 'Electricity',
        date: new Date(),
        value: 35,
        payee: 'Electricity Provider',
        memo: ''
    }
]

const multipleTransactions = [
    {
        bank: 'AcmeBank',
        subcategory: 'Electricity',
        date: new Date(),
        value: 35,
        payee: 'Electricity Provider',
        memo: ''
    },
    {
        bank: 'AcmeBank',
        subcategory: 'Water',
        date: new Date(),
        value: 20,
        payee: 'Water Provider',
        memo: ''
    }
]

test('Should return empty list when no transactions provided', () => {
    render(<Transactions/>)

    // expect(screen.getByText('Transactions list is empty')).toBeVisible();
    expect(screen.getByRole('table')).toBeVisible();
    expect(screen.getByText('Bank')).toBeVisible()
    expect(screen.getByText('Category')).toBeVisible()
    expect(screen.getByText('Date')).toBeVisible()
    expect(screen.getByText('Value')).toBeVisible()
    expect(screen.getByText('Payee')).toBeVisible()
    expect(screen.getByText('Memo')).toBeVisible()
})

test('Should return single transaction when one is provided', () => {
    render(<Transactions transactions={[singleTransaction]} />)

    expect(screen.queryByText('Transactions list is empty')).not.toBeInTheDocument();
})

test('Should return multiple transactions when they are provided', () => {
    render(<Transactions transactions={[singleTransaction]} />)

    expect(screen.queryByText('Transactions list is empty')).not.toBeInTheDocument();
})

