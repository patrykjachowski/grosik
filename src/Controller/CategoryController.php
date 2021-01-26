<?php

namespace App\Controller;

use App\Entity\Budget;
use App\Entity\Subcategory;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends AbstractController
{
    const NEW_SUBCATEGORY_NAME = 'New subcategory';

    /**
     * @Route("/api/categories/{category_id}/subcategories/", methods={"POST"})
     * @param Request $request
     * @param CategoryRepository $categoryRepository
     * @param EntityManagerInterface $entityManager
     *
     * @return Response
     */
    public function createSubcategory(Request $request, CategoryRepository $categoryRepository, EntityManagerInterface $entityManager) : Response
    {
        $id = $request->get('category_id');
        $category = $categoryRepository->find($id);
        $subcategory = new Subcategory();
        $subcategory->setName(self::NEW_SUBCATEGORY_NAME);
        $budget = new Budget();
        $budget->setDate(new \DateTime());

        $subcategory->addBudget($budget);
        $category->addSubcategory($subcategory);

        $entityManager->persist($category);
        $entityManager->persist($subcategory);
        $entityManager->persist($budget);
        $entityManager->flush();

        return new Response('Success ', Response::HTTP_OK);
    }
}
