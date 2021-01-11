<?php

namespace App\Controller;

use App\Repository\BankRepository;
use App\Service\StatementParser;
use Symfony\Component\HttpKernel\Exception\HttpException;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StatementController extends AbstractController
{
    /**
     * @Route("/statement", name="statement")
     * @param Request $request
     *
     * @param BankRepository $bankRepository
     */
    public function index(Request $request, BankRepository $bankRepository) : Response
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

        foreach ($transactions as $transaction) {
            $bank->addTransaction($transaction);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($transaction);
            $entityManager->flush();
        }

        return new Response('Success ', Response::HTTP_OK);
    }
}
