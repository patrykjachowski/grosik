<?php

namespace App\Service;

use App\DataFixtures\BankFixtures;
use App\Entity\Bank;
use App\Entity\Transaction;
use DateTime;
use PHPUnit\Framework\TestCase;

class StatementParserTest extends TestCase
{
    public function testShouldParseSingleTransaction()
    {
        // Given
        $statementParserUnderTest = new StatementParser();
        $bank = new Bank();
        $bank->setType('mBank');
        $mBankStatement = [
            43 => [
                0 => null,
            ],
            44 => [
                0 => "#Data operacji",
                1 => b"#Data ksiêgowania",
                2 => "#Opis operacji",
                3 => "#Nazwa",
                4 => "#Rachunek",
                5 => "#Nazwa Banku",
                6 => "#Opis dodatkowy",
                7 => "#Kwota",
                8 => "#Saldo po operacji",
            ],
            45 => [
                0 => "2020-07-03",
                1 => "2020-07-03",
                2 => "BLIK P2P-PRZYCHODZACY",
                3 => "",
                4 => "",
                5 => "",
                6 => "Przelew na telefon BLIK",
                7 => "5,00",
                8 => "180,74",
                9 => "",
            ],
            58 => [
                0 => "",
                1 => "",
                2 => "",
                3 => "",
                4 => "",
                5 => "",
                6 => "",
                7 => "",
                8 => "",
                9 => b"W przypadku wyst¹pienia niezgodnoœci w przes³anym zestawieniu w zakresie wykonywanych operacji na rachunku, salda rachunku, prosimy o kontakt z mLini¹.",
                10 => "",
            ],
        ];

        // When
        /** @var Transaction $actual */
        $actual = $statementParserUnderTest->getTransactions($bank, $mBankStatement)[0];
        $actualValue = $actual->getValue();
        $actualPayee = $actual->getPayee();
        $actualMemo = $actual->getMemo();
        $actualBankType = $actual->getBank()->getType();

        // Then
        $this->assertInstanceOf(DateTime::class, $actual->getDate());
        $this->assertSame(5.0, $actualValue);
        $this->assertSame('BLIK P2P-PRZYCHODZACY', $actualPayee);
        $this->assertSame('Przelew na telefon BLIK', $actualMemo);
        $this->assertSame('mBank', $actualBankType);
    }

    public function testShouldShouldParseMultipleTransactions()
    {
        // Given
        $statementParserUnderTest = new StatementParser();
        $bank = new Bank();
        $bank->setType('mBank');
        $mBankStatement = [
            43 => [
                0 => null,
            ],
            44 => [
                0 => "#Data operacji",
                1 => b"#Data ksiêgowania",
                2 => "#Opis operacji",
                3 => "#Nazwa",
                4 => "#Rachunek",
                5 => "#Nazwa Banku",
                6 => "#Opis dodatkowy",
                7 => "#Kwota",
                8 => "#Saldo po operacji",
            ],
            45 => [
                0 => "2020-07-03",
                1 => "2020-07-03",
                2 => "BLIK P2P-PRZYCHODZACY",
                3 => "",
                4 => "",
                5 => "",
                6 => "Przelew na telefon BLIK",
                7 => "5,00",
                8 => "180,74",
                9 => "",
            ],
            46 => [
                0 => "2020-07-04",
                1 => "2020-07-04",
                2 => "PRZELEW ZEWNĘTRZNY PRZYCHODZĄCY",
                3 => "Jon Doe",
                4 => "",
                5 => "",
                6 => "Zysk z lokaty",
                7 => "10,00",
                8 => "180,74",
                9 => "",
            ],
            58 => [
                0 => "",
                1 => "",
                2 => "",
                3 => "",
                4 => "",
                5 => "",
                6 => "",
                7 => "",
                8 => "",
                9 => b"W przypadku wyst¹pienia niezgodnoœci w przes³anym zestawieniu w zakresie wykonywanych operacji na rachunku, salda rachunku, prosimy o kontakt z mLini¹.",
                10 => "",
            ],
        ];

        // When
        /** @var Transaction $actual */
        $transaction1 = $statementParserUnderTest->getTransactions($bank, $mBankStatement)[0];
        $transaction1Value = $transaction1->getValue();
        $transaction1Payee = $transaction1->getPayee();
        $transaction1Memo = $transaction1->getMemo();
        $transaction1BankType = $transaction1->getBank()->getType();

        $transaction2 = $statementParserUnderTest->getTransactions($bank, $mBankStatement)[1];
        $transaction2Value = $transaction2->getValue();
        $transaction2Payee = $transaction2->getPayee();
        $transaction2Memo = $transaction2->getMemo();
        $transaction2BankType = $transaction2->getBank()->getType();

        // Then
        $this->assertInstanceOf(DateTime::class, $transaction1->getDate());
        $this->assertSame(5.0, $transaction1Value);
        $this->assertSame('BLIK P2P-PRZYCHODZACY', $transaction1Payee);
        $this->assertSame('Przelew na telefon BLIK', $transaction1Memo);
        $this->assertSame('mBank', $transaction1BankType);

        $this->assertInstanceOf(DateTime::class, $transaction2->getDate());
        $this->assertSame(10.0, $transaction2Value);
        $this->assertSame('Jon Doe', $transaction2Payee);
        $this->assertSame('Zysk z lokaty', $transaction2Memo);
        $this->assertSame('mBank', $transaction2BankType);

    }

}
