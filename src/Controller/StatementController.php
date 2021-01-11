<?php

namespace App\Controller;

use App\Repository\BankRepository;
use App\Service\StatementParser;
use Symfony\Component\HttpKernel\Exception\HttpException;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class StatementController extends AbstractController
{
    /**
     * @Route("/statement", name="statement")
     * @param Request $request
     *
     * @param BankRepository $bankRepository
     */
    public function index(Request $request, BankRepository $bankRepository) : void
    {
        $statement = $request->files->get('file');

        if ($statement->getClientOriginalExtension() != 'csv') {
            throw new HttpException(400, "Only CSV format is allowed!");
        }

        $bankId = $request->request->get('bankId');
        $bank = $bankRepository->find($bankId);
        $statement = array_map(function($v) {
            return str_getcsv($v, ";");
        }, file($statement));

        $statementParser = new StatementParser();
        $transactions = $statementParser->getTransactions($bank, $statement);
    }
}
