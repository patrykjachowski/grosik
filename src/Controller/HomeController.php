<?php

namespace App\Controller;

use App\Entity\Budget;
use App\Repository\SubcategoryRepository;
use App\Repository\UserRepository;
use App\Service\Budgeter;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class HomeController extends AbstractController
{
    /** * @var UserRepository */
    private $userRepository;
    /** * @var SubcategoryRepository */
    private $subcategoryRepository;
    /** * @var Budgeter */
    private $budgeter;

    /**
     * @param UserRepository $userRepository
     * @param SubcategoryRepository $subcategoryRepository
     * @param Budgeter $budgeter
     */
    public function __construct(UserRepository $userRepository, SubcategoryRepository $subcategoryRepository, Budgeter $budgeter)
    {
        $this->userRepository = $userRepository;
        $this->subcategoryRepository = $subcategoryRepository;
        $this->budgeter = $budgeter;
    }

    /**
     * @Route("/", name="home")
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request)
    {
        if (!$request->cookies->has('PHPSESSID')) {
            $this->generateBudgets();
        }

        $this->manuallyAuthenticateUser();

        return $this->render('base.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    public function generateBudgets()
    {
        $currentMonthDate = new DateTime('now');
        $nextMonthDate = (new DateTime('now'))->modify('first day of next month');
        $subcategories = $this->subcategoryRepository->findAll();

        foreach ($subcategories as $subcategory) {
            $this->budgeter->createSubcategoryBudget($subcategory, $currentMonthDate);
            $this->budgeter->createSubcategoryBudget($subcategory, $nextMonthDate);
        }
    }

    public function manuallyAuthenticateUser() : void
    {
        $user = $this->userRepository->find(1);
        $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
        $this->get('security.token_storage')->setToken($token);
        $this->get('session')->set('_security_main', serialize($token));
    }
}
