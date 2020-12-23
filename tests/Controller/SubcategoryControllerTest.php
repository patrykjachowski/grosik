<?php

namespace App\Tests\Controller;

use App\Controller\SubcategoryController;
//use PHPUnit\Framework\WebTestCase;
use App\DataFixtures\SubcategoryFixtures;
use App\DataFixtures\TransactionFixtures;
use App\Entity\Subcategory;
use App\Entity\Transaction;
use App\Repository\BankRepository;
use App\Repository\SubcategoryRepository;
use App\Repository\TransactionRepository;
use Doctrine\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SubcategoryControllerTest extends WebTestCase
{
    public function testShouldDeleteSubcategoryAndChangeItsTransactionToUncategorised()
    {
        // Given
        $client = static::createClient();
        $bankRepository = static::$container->get(BankRepository::class);
        $subcategoryRepository = static::$container->get(SubcategoryRepository::class);

        /** Subcategory $subcategory */
        $subcategory = new Subcategory();
        $subcategory->setId(rand(0,100));
        $subcategory->setName('groceries');

        $transaction = new Transaction();
        $transaction->setBank($bankRepository->find(1));
        $transaction->setSubcategory($subcategoryRepository->find(rand(0,SubcategoryFixtures::MAX_SUBCATEGORIES)));
        $transaction->setDate(new \DateTime());
        $transaction->setValue(rand(0, 500));
        $transaction->setPayee('random payee');
        $transaction->setMemo('memo');

        $subcategory->addTransaction($transaction);

        // When
        $client->request('DELETE',  '/api/subcategories/'.$subcategory->getId());
        $client->followRedirects(true);

        //Then
        $this->assertEquals('Uncategorized', $transaction->getSubcategory());
    }

}
