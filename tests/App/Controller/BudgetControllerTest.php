<?php

namespace App\Controller;

use App\Entity\Budget;
use App\Entity\Category;
use App\Entity\Subcategory;
use App\Service\Budgeter;
use DateTime;
use Doctrine\Persistence\ObjectRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Validator\Constraints\Date;

class BudgetControllerTest extends WebTestCase
{
    private $client;
    /** * @var Budgeter */
    private $budgeter;

    protected function setUp() : void
    {
        $this->client = self::createClient();
        $this->budgeter = self::$container->get('app.budgeter');
    }

    public function testShouldUpdateBudgetAfterRequest()
    {
        // Given
        $category = new Category();
        $category->setName('Life costs');
        $subcategory = new Subcategory();
        $subcategory->setName('Groceries');
        $subcategory->setCategory($category);

        $budgetUnderTest = $this->budgeter->createSubcategoryBudget($subcategory, new DateTime());

        //$data = ['value' => 50];
        $expectedValue = 50;

        // When
        $this->client->request('PATCH', '/budget/'. $budgetUnderTest->getId(), ['value' => 50]);
        $actual = $budgetUnderTest->getValue();

        // Then
        $this->assertEquals(200, $this->client->getResponse()->getStatusCode());
        $this->assertEquals($expectedValue, $actual);
    }
}
