<?php

namespace App\EventSubscriber;

use DateTime;
use App\Repository\SubcategoryRepository;
use App\Service\Budgeter;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class AuthSubscriber implements EventSubscriberInterface
{
    /**
     * @var SubcategoryRepository
     */
    private $subcategoryRepository;
    /** * @var Budgeter */
    private $budgeter;

    public function __construct(SubcategoryRepository $subcategoryRepository, Budgeter $budgeter)
    {
        $this->budgeter = $budgeter;
        $this->subcategoryRepository = $subcategoryRepository;
    }

    public static function getSubscribedEvents()
    {
        return [
            InteractiveLoginEvent::class => ['createBudgets'],
        ];
    }

    public function createBudgets()
    {
        // TODO: Implement when multiple account is available
        $subcategories = $this->subcategoryRepository->findAll();

        foreach ($subcategories as $subcategory) {
                $this->budgeter->createSubcategoryBudget($subcategory, new DateTime());
        }
    }
}