<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class HomeController extends AbstractController
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        $this->manuallyAuthenticateUser();

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    public function manuallyAuthenticateUser()
    {
        $user = $this->userRepository->find(1);
        $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
        $this->get('security.token_storage')->setToken($token);
        $this->get('session')->set('_security_main', serialize($token));
    }
}
