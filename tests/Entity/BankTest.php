<?php

namespace App\Tests\Entity;

use App\Entity\Bank;
use App\Entity\Transaction;
use App\Exception\TransactionNotFoundException;
use PHPUnit\Framework\TestCase;

class BankTest extends TestCase
{

    public function testShouldCreateNewBankWithEmptyBalance()
    {
        // Given
        $bankUnderTest = new Bank();
        $expectedNumber = 0;
        $expectedBalance = 0.0;

        // When
        $actualNumber = $bankUnderTest->getTransactions()->count();
        $actualBalance = $bankUnderTest->getBalance();

        // Then
        $this->assertSame($expectedNumber, $actualNumber);
        $this->assertSame($expectedBalance, $actualBalance);
    }

    public function testShouldAddOneTransactionToBankAndUpdateBalance()
    {
        // Given
        $bankUnderTest = new Bank();
        $transaction = new Transaction();
        $transaction->setValue(100);
        $expectedNumber = 1;
        $expectedBalance = 100.0;

        // When
        $bankUnderTest->addTransaction($transaction);
        $actualNumber = $bankUnderTest->getTransactions()->count();
        $actualBalance = $bankUnderTest->getBalance();

        // Then
        $this->assertSame($expectedNumber, $actualNumber);
        $this->assertSame($expectedBalance, $actualBalance);
    }

    public function testShouldAddManyTransactionsToBankAndUpdateBalance()
    {
        // Given
        $bankUnderTest = new Bank();
        $transaction1 = new Transaction();
        $transaction2 = new Transaction();
        $transaction3 = new Transaction();
        $transaction1->setValue(50);
        $transaction2->setValue(-100.50);
        $transaction3->setValue(100.50);
        $expectedNumber = 3;
        $expectedBalance = 50.0;

        // When
        $bankUnderTest->addTransaction($transaction1);
        $bankUnderTest->addTransaction($transaction2);
        $bankUnderTest->addTransaction($transaction3);
        $actualNumber = $bankUnderTest->getTransactions()->count();
        $actualBalance = $bankUnderTest->getBalance();

        // Then
        $this->assertSame($expectedNumber, $actualNumber);
        $this->assertSame($expectedBalance, $actualBalance);

        return $bankUnderTest;
    }

    /**
     * @depends testShouldAddManyTransactionsToBankAndUpdateBalance
     *
     * @param Bank $bankUnderTest
     */
    public function testShouldRemoveTransactionFromBankAndUpdateBalance(Bank $bankUnderTest)
    {
        // Given
        $expected = -50.5;
        $transaction = $bankUnderTest->getTransactions()->last();

        // When
        $bankUnderTest->removeTransaction($transaction);
        $actual = $bankUnderTest->getBalance();

        // Then
        $this->assertSame($expected, $actual);
    }

    /**
     * @depends testShouldAddManyTransactionsToBankAndUpdateBalance
     *
     * @param Bank $bankUnderTest
     */
    public function testShouldRemoveManyTransactionsFromBankAndUpdateBalance(Bank $bankUnderTest)
    {
        // Given
        $expected = 0.0;
        $transactions = $bankUnderTest->getTransactions();

        // When
        $bankUnderTest->removeTransaction($transactions[0]);
        $bankUnderTest->removeTransaction($transactions[1]);
        $actual = $bankUnderTest->getBalance();

        // Then
        $this->assertSame($expected, $actual);
    }

    /**
     * @depends testShouldAddManyTransactionsToBankAndUpdateBalance
     *
     * @param Bank $bankUnderTest
     */
    public function testShouldThrowTransactionNotFoundExceptionWhenITryToRemoveNotExistingTransactionFromBank(Bank $bankUnderTest)
    {
        // Expect
        $this->expectException(TransactionNotFoundException::class);
        $this->expectExceptionMessage('Transaction is not found');

        // Given
        $bankUnderTest = new Bank();
        $transaction = new Transaction();
        $bankUnderTest->addTransaction($transaction);

        // When
        $bankUnderTest->removeTransaction($transaction);
        $bankUnderTest->removeTransaction($transaction);
    }
    




}
