<?php

namespace App\Controller;

use App\Entity\Bank;
use App\Form\BankType;
use App\Repository\BankRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/bank")
 */
class BankController extends AbstractController
{
    /**
     * @Route("/", name="bank_index", methods={"GET"})
     */
    public function index(BankRepository $bankRepository): Response
    {
        return $this->render('bank/index.html.twig', [
            'banks' => $bankRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="bank_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $bank = new Bank();
        $form = $this->createForm(BankType::class, $bank);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($bank);
            $entityManager->flush();

            return $this->redirectToRoute('bank_index');
        }

        return $this->render('bank/new.html.twig', [
            'bank' => $bank,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="bank_show", methods={"GET"})
     */
    public function show(Bank $bank): Response
    {
        return $this->render('bank/show.html.twig', [
            'bank' => $bank,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="bank_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Bank $bank): Response
    {
        $form = $this->createForm(BankType::class, $bank);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('bank_index');
        }

        return $this->render('bank/edit.html.twig', [
            'bank' => $bank,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="bank_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Bank $bank): Response
    {
        if ($this->isCsrfTokenValid('delete'.$bank->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($bank);
            $entityManager->flush();
        }

        return $this->redirectToRoute('bank_index');
    }
}
