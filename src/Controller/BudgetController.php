<?php

namespace App\Controller;

use App\Entity\Budget;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class BudgetController extends AbstractController
{
    /**
     * @Route("/budget/{id}", name="budget", methods={"PATCH"})
     * @param Request $request
     * @param Budget $budget
     *
     * @return Response
     */
    public function index(Request $request, Budget $budget)
    {
        $newBudgetValue = $request->request->get('value');
        $budget->setValue($newBudgetValue);

        return new Response(true, 200 );
    }
}
