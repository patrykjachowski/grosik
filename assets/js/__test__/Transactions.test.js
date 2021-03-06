import React from 'react';
import {cleanup, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Transactions from '../features/Transactions/Transactions'
import {Provider} from "react-redux";
import store from "../app/store";
import Categories from "../features/Categories/Categories";

afterEach(cleanup)

// TODO: Mock API
const singleTransaction = [
    {
        bank: {name: 'AcmeBank'},
        subcategory: 'Electricity',
        date: new Date(),
        value: '35',
        payee: 'Electricity Provider',
        memo: 'Note to myself'
    }
]

const multipleTransactions = [
    {
        bank: {name: 'AcmeBank'},
        subcategory: 'Electricity',
        date: new Date(),
        value: 35,
        payee: 'Electricity Provider',
        memo: 'asd'
    },
    {
        bank: {name: 'DeltaBank'},
        subcategory: 'Water',
        date: new Date(),
        value: 20,
        payee: 'Water Provider',
        memo: 'dsa'
    }
]


test('Should return empty list when no transactions provided', () => {
    render(<Provider store={store}><Transactions /></Provider>)

    expect(screen.getByText('Transactions list is empty')).toBeVisible();
    expect(screen.getByRole('table')).toBeVisible();
    expect(screen.getByText('Bank')).toBeVisible()
    expect(screen.getByText('Category')).toBeVisible()
    expect(screen.getByText('Date')).toBeVisible()
    expect(screen.getByText('Value')).toBeVisible()
    expect(screen.getByText('Payee')).toBeVisible()
    expect(screen.getByText('Memo')).toBeVisible()
})

// TODO: redux tests
/*
test('Should return single transaction when one is provided', () => {
    render(<Provider store={store}><Transactions transactions={singleTransaction} /></Provider>)


    expect(screen.queryByText('Transactions list is empty')).not.toBeInTheDocument();
    expect(screen.getByText(singleTransaction[0].bank.name)).toBeVisible()
    expect(screen.getByText(singleTransaction[0].date.toLocaleDateString())).toBeVisible()
    expect(screen.getByText(singleTransaction[0].value)).toBeVisible()
    expect(screen.getByText(singleTransaction[0].payee)).toBeVisible()
    expect(screen.getByText(singleTransaction[0].memo)).toBeVisible()
})

test('Should return multiple transactions when they are provided', () => {
    render(<Provider store={store}><Transactions transactions={multipleTransactions} /></Provider>)

    expect(screen.getByText(multipleTransactions[0].bank.name)).toBeVisible()
    // expect(screen.getByText(multipleTransactions[0].date.toLocaleDateString())).toBeVisible()
    // expect(screen.getByText(multipleTransactions[0].value)).toBeVisible()
    expect(screen.getByText(multipleTransactions[0].payee)).toBeVisible()
    expect(screen.getByText(multipleTransactions[0].memo)).toBeVisible()

    expect(screen.getByText(multipleTransactions[1].bank.name)).toBeVisible()
    // expect(screen.getByText(multipleTransactions[1].date.toLocaleDateString())).toBeVisible()
    // expect(screen.getByText(multipleTransactions[1].value)).toBeVisible()
    expect(screen.getByText(multipleTransactions[1].payee)).toBeVisible()
    expect(screen.getByText(multipleTransactions[1].memo)).toBeVisible()

})

*/
