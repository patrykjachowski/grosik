<?php

namespace App\Service;

use App\Entity\Category;
use App\Entity\Subcategory;
use App\Exception\BudgetAlreadyExistsException;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class BudgeterTest extends WebTestCase
{
    private static $currentDate;
    private static $pastDate;
    /** * @var Budgeter */
    private $budgeterUnderTest;

    protected function setUp() : void
    {
        self::bootKernel();
        $this->budgeterUnderTest = self::$container->get('app.budgeter');
    }

    public static function setUpBeforeClass() : void
    {
        self::$currentDate = new DateTime();
        self::$pastDate = new DateTime('2010-05-10');
    }

    public function testShouldCreateBudgetWithUnifiedDate()
    {
        //Given
        $category = new Category();
        $category->setName('Life costs');

        $subcategory = new Subcategory();
        $subcategory->setName('Groceries');
        $subcategory->setCategory($category);
        $expected = self::$currentDate;

        // When
        $this->budgeterUnderTest->createSubcategoryBudget($subcategory, self::$currentDate);
        $actual = $subcategory->getBudgets()->first()->getDate();

        // Then
        $this->assertEquals($expected->format('Ym'), $actual->format('Ym'));
    }

    public function testShouldCreateManyBudgetsWithUnifiedDates()
    {
        //Given
        $category = new Category();
        $category->setName('Life costs');

        $subcategory1 = new Subcategory();
        $subcategory1->setName('Groceries');
        $subcategory1->setCategory($category);

        $subcategory2 = new Subcategory();
        $subcategory2->setName('Clothes');
        $subcategory2->setCategory($category);

        $expected1 = self::$currentDate;
        $expected2 = self::$pastDate;

        // When
        $this->budgeterUnderTest->createSubcategoryBudget($subcategory1, self::$currentDate);
        $this->budgeterUnderTest->createSubcategoryBudget($subcategory2, self::$pastDate);

        $actualDate1 = $subcategory1->getBudgets()->first()->getDate();
        $actualDate2 = $subcategory2->getBudgets()->first()->getDate();

        // Then
        $this->assertEquals($expected1->format('Ym'), $actualDate1->format('Ym'));
        $this->assertEquals($expected2->format('Ym'), $actualDate2->format('Ym'));
    }
}
