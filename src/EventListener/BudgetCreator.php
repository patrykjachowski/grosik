<?php

namespace App\EventListener;

use App\Entity\Subcategory;
use App\Service\Budgeter;
use DateTime;
use Doctrine\ORM\Event\LifecycleEventArgs;

class BudgetCreator
{
    /** @var Budgeter */
    private $budgeter;

    /**
     * @param Budgeter $budgeter
     */
    public function __construct(Budgeter $budgeter)
    {
        $this->budgeter = $budgeter;
    }

    public function postPersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof Subcategory) {
            return;
        }

        $currentMonthDate = new DateTime('now');
        $nextMonthDate = (new DateTime('now'))->modify('first day of next month');

        $this->budgeter->createSubcategoryBudget($entity, $currentMonthDate);
        $this->budgeter->createSubcategoryBudget($entity, $nextMonthDate);
    }
}