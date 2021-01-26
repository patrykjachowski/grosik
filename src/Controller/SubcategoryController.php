<?php

namespace App\Controller;

use App\Entity\Subcategory;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SubcategoryController extends AbstractController
{
    /**
     * @Route("/api/subcategories/{id}", methods={"DELETE"})
     * @param Subcategory $subcategory
     * @param EntityManagerInterface $entityManager
     *
     * @return Response
     */
    public function remove(Subcategory $subcategory, EntityManagerInterface $entityManager) : Response
    {
        $transactions = $subcategory->getTransactions()->toArray();
        $budgets = $subcategory->getBudgets();

        foreach ($transactions as $transaction) {
            $transaction->setSubcategory(null);
        }
        foreach ($budgets as $budget) {
            $entityManager->remove($budget);
        }

        $entityManager->remove($subcategory);
        $entityManager->flush();

        return new Response('Subcategory deleted.', Response::HTTP_OK);
    }
}
