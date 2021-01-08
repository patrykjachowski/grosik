<?php

namespace App\Service;

use App\Entity\Bank;
use App\Repository\BankRepository;
//use Doctrine\ORM\EntityManagerInterface;

class StatementParser
{
    const MBANK_TRANSACTIONS_BEGIN = 45;
    private $entityManager;

    public function __construct(BankRepository $bankRepository)
    {
        $this->bankRepository = $bankRepository;
    }


    private function getBankByName(string $bankName)
    {
        $em = $this->bankRepository;
        dd($em);
        //$bankRepository = $em->getRepository(Bank::class);
        dd($bankRepository->findOneBy(['name'=>$bankName]));
        //$product = $this->getDoctrine()
        //    ->getRepository(Product::class)
        //    ->find($id);
        ///** @var BankRepository $banks */
        //$banks = BankRepository::class;
        //$banks->findOneBy(['name'=> $bankName]);
    }

    private function parseMbankStatement(string $bankName, array $statement)
    {
        $transactions = [];

        $lastItemIndex = array_search(end($statement), $statement);

        for ($i = self::MBANK_TRANSACTIONS_BEGIN; $i <= $lastItemIndex; $i++) {
            if (!isset($statement[$i]))  continue;
            if ($statement[$i][0] == null) break;

            $transactions[$i] = [
                'date' => \DateTime::createFromFormat('Y-m-d', $statement[$i][1]),
                'description' => $statement[$i][2],
                'title' => $statement[$i][3],
                'bank' => $this->getBankByName($bankName),
                'memo' => $statement[$i][6],
                'value' => floatval(str_replace(',','.',$statement[$i][7])),
                'subcategory' => null,
            ];
        }

        return array_values($transactions);
    }

    public function getBankType(array $statement1)
    {
        if (str_contains($statement1[0][0], 'mBank')) {
            return 'mBank';
        }

        if (str_contains($statement1[0][0], 'ING')) {
            return 'ING';
        }

        if (str_contains($statement1[0][0], 'Millenium')) {
            return 'Millenium';
        }

        return false;
    }

    public function getTransactions(string $bankName, array $statement)
    {
        // TODO: Not found bank exception
        switch ($bankName) {
            case 'mBank':
                dd($this->parseMbankStatement($bankName, $statement));
                return $this->parseMbankStatement($bankName, $statement);
        }
    }
}