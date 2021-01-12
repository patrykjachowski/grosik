<?php

namespace App\EventSubscriber;

use App\Entity\Subcategory;
use App\Repository\BudgetRepository;
use App\Repository\SubcategoryRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class AuthSubscriber implements EventSubscriberInterface
{
    ///** @var EntityManagerInterface */
    //private $entityManager;

    //public function __construct(EntityManagerInterface $entityManager)
    //{
    //   $this->entityManager = $entityManager;
    //}
    /**
     * @var SubcategoryRepository
     */
    private $subcategoryRepository;
    /**
     * @var BudgetRepository
     */
    private $budgetRepository;

    /**
     * AuthSubscriber constructor.
     *
     * @param BudgetRepository $budgetRepository
     * @param SubcategoryRepository $subcategoryRepository
     */
    public function __construct(BudgetRepository $budgetRepository, SubcategoryRepository $subcategoryRepository)
    {
        $this->subcategoryRepository = $subcategoryRepository;
        $this->budgetRepository = $budgetRepository;
    }

    public static function getSubscribedEvents()
    {
        return [
            InteractiveLoginEvent::class => ['createBudgets'],
        ];
    }

    public function createBudgets()
    {
/*        $subcategories = $this->subcategoryRepository->findAll();

        foreach ($subcategories as $subcategory){
            $subcategory->setBudget()

            //BudgetSerivice->createBudget($subcategory);

        }

        dd($budgets);*/
    }
}