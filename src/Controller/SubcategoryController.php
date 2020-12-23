<?php

namespace App\Controller;

use App\Entity\Subcategory;
use App\Repository\SubcategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class SubcategoryController extends AbstractController
{
    /**
     * @var Subcategory
     */
    private $repository;

    public function __construct(SubcategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(Subcategory $subcategory) : void
    {
        $entityManager = $this->getDoctrine()->getManager();
        $transactions = $subcategory->getTransactions()->toArray();
        foreach ($transactions as $transaction) {
            $transaction->setSubcategory(null);
        }
        $entityManager->remove($subcategory);
        $entityManager->flush();
    }
}
