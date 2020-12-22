<?php

namespace App\Controller;

use App\Entity\Subcategory;
//use App\Repository\SubcategoryRepository;
use App\Repository\SubcategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

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
        $subcategory = $this->repository->find($subcategory->getId());
        $entityManager->remove($subcategory);
        $entityManager->flush();
    }
}
