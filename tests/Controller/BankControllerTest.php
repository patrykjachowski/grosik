<?php

namespace App\Tests\Controller;

use App\Controller\BankController;
use App\Entity\Bank;
use App\Entity\Transaction;
use App\Entity\User;
use App\Form\BankType;
use App\Repository\TransactionRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class BankControllerTest extends WebTestCase
{

    public function testShouldCreateEmptyBank()
    {
        // Given
        $expected = 0;
        $bankUnderTest = new Bank();
    
        // When
        $actual = $bankUnderTest->getTransactions()->count();

        // Then
        $this->assertSame($expected, $actual);
    }
    
    public function testShouldAddOneTransactionToBankAndUpdateBalance()
    {
        // Given
        $expectedNumber = 1;
        $expectedBalance = 100;
        $bankUnderTest = new Bank();
        $transaction = new Transaction();
        $transaction->setValue(100);

        // When
        $bankUnderTest->addTransaction($transaction);
        $actualNumber = $bankUnderTest->getTransactions()->count();
        $actualBalance = $bankUnderTest->getBalance();

        // Then
        $this->assertSame($expectedNumber, $actualNumber);
        $this->assertSame($expectedBalance, $actualBalance);
    }

}
