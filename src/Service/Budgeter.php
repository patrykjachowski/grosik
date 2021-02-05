<?php

namespace App\Service;

use App\Entity\Budget;
use App\Entity\Subcategory;
use App\Exception\BudgetAlreadyExistsException;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;

class Budgeter
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param Subcategory $subcategory
     * @param DateTime $date
     *
     * @return Response
     */
    public function createSubcategoryBudget(Subcategory $subcategory, \DateTime $date) : Response
    {
        $budget = $this->getBudgetByDate($subcategory, $this->unifyDate($date));
        if (null != $budget) return new Response('Success ', Response::HTTP_OK);

        $newBudget = new Budget();
        $newBudget->setDate($this->unifyDate($date));
        $subcategory->addBudget($newBudget);

        $this->entityManager->persist($newBudget);
        $this->entityManager->persist($subcategory);
        $this->entityManager->flush();

        return new Response('Success ', Response::HTTP_OK);
    }

    /**
     * @param Subcategory $subcategory
     * @param DateTime $date
     *
     * @return Budget|null
     */
    public function getBudgetByDate(Subcategory $subcategory, DateTime $date) : ?Budget
    {
        $dateUnified = $this->unifyDate($date);

        $budgets = $subcategory->getBudgets()->filter(function($budget) use ($dateUnified) {
            return $budget->getDate() == $dateUnified;
        });

        return $budgets[0];
    }

    private function unifyDate(\DateTime $date) : \DateTime
    {
        $dateUnified = new DateTime();
        $dateUnified->setDate($date->format('Y'), $date->format('m'), 1);
        $dateUnified->setTime(0, 0, 0);

        return $dateUnified;
    }
}