<?php

namespace App\Service;

use App\Entity\Budget;
use App\Entity\Subcategory;
use App\Exception\BudgetAlreadyExistsException;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;

class Budgeter
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function createSubcategoryBudgetByDate(Subcategory $subcategory, \DateTime $date) : self
    {
        if (null != $this->getBudgetByDate($subcategory, $date)) {
            throw new BudgetAlreadyExistsException('Budget is already created for selected date!');
        }

        $budget = new Budget();
        $dateUnified = $this->unifyDate($date);
        $budget->setDate($dateUnified);
        $subcategory->addBudget($budget);



        //$this->entityManager->persist($budget);
        //$this->entityManager->persist($subcategory);

        //$this->entityManager->flush();

        return $this;
    }

    public function getBudgetByDate(Subcategory $subcategory, DateTime $date) : ?Budget
    {
        $dateUnified = $this->unifyDate($date);

        $budgets = $subcategory->getBudgets()->filter(function($budget) use ($dateUnified) {
            return $budget->getDate() === $dateUnified;
        });

        return $budgets[0];
    }

    private function unifyDate(\DateTime $date) : \DateTime
    {
        $date->setDate($date->format('Y'), $date->format('m'), 1);
        $date->setTime(0, 0, 0);

        return $date;
    }
}