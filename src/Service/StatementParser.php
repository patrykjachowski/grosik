<?php

namespace App\Service;

use App\Entity\Bank;
use App\Entity\Transaction;

class StatementParser
{
    const MBANK_TRANSACTIONS_BEGINNING_ROW = 45;

    public function getTransactions(Bank $bank, array $statement)
    {
        // TODO: Not found bank exception
        switch ($bank->getType()) {
            case 'mBank':
                return $this->parseMbankStatement($bank, $statement);
        }
    }

    private function parseMbankStatement(Bank $bank, array $statement)
    {
        $transactions = [];

        for ($i = self::MBANK_TRANSACTIONS_BEGINNING_ROW; $i <= end($statement); $i++) {
            if (!isset($statement[$i])) continue;
            if ($statement[$i][0] == null) break;

            $payee = empty($statement[$i][3]) ? $statement[$i][2] : $statement[$i][3];

            $transaction = new Transaction();
            $transaction->setDate(\DateTime::createFromFormat('Y-m-d', $statement[$i][1]));
            $transaction->setValue(floatval(str_replace(',', '.', $statement[$i][7])));
            $transaction->setPayee($payee);
            $transaction->setMemo($statement[$i][6]);
            $transaction->setBank($bank);
            $transactions[] = $transaction;

        }

        return array_values($transactions);
    }
}