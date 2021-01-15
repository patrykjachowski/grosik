<?php

namespace App\Service;

use App\Entity\Budget;
use App\Entity\Subcategory;
use App\Exception\BudgetAlreadyExistsException;
use DateTime;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Service\Budgeter;

class BudgeterTest extends WebTestCase
{
    private static $currentDate;
    private static $pastDate;

    public static function setUpBeforeClass() : void
    {
        self::$currentDate = new DateTime();
        self::$pastDate = new DateTime('2010-05-10');
        self::bootKernel();
        $budgeter = self::$container->get('app.budgeter');
    }

    public function testShouldCreateBudgetWithDateForSubcategory()
    {
        // Given
        // returns the real and unchanged service container
        //$container = self::$kernel->getContainer();

        // gets the special container that allows fetching private services
        $container = self::$container;
        $budgeter = self::$container->get(Budgeter::class);
        $subcategory = new Subcategory();
        $subcategory->setName('asd');
        $expected = self::$currentDate;

        // When
        $budgeter->createSubcategoryBudgetByDate($subcategory, self::$currentDate);
        $actual = $subcategory->getBudgets()->first()->getDate();

        // Then
        $this->assertSame($expected, $actual);

        return $subcategory;
    }

    //public function testShouldCreateManyBudgetsWithDatesForSubcategory()
    //{
    //    // Given
    //    $budgeterUnderTest = new Budgeter;
    //    $subcategory = new Subcategory();
    //
    //    // When
    //    $budgeterUnderTest->createSubcategoryBudgetByDate($subcategory, self::$pastDate);
    //    $budgeterUnderTest->createSubcategoryBudgetByDate($subcategory, self::$currentDate);
    //
    //    $expectedDate1 = $subcategory->getBudgets()[0]->getDate();
    //    $expectedDate2 = $subcategory->getBudgets()[1]->getDate();
    //
    //    // Then
    //    $this->assertCount(2, $subcategory->getBudgets());
    //    $this->assertSame($expectedDate1, self::$pastDate);
    //    $this->assertSame($expectedDate2, self::$currentDate);
    //
    //    return $subcategory;
    //}
    //
    //public function testShouldThrowBudgetAlreadyExistsWhenITryToAddNewBudgetWithTheSameDate()
    //{
    //    // Expect
    //    $this->expectException(BudgetAlreadyExistsException::class);
    //    $this->expectExceptionMessage('Budget is already created for selected date!');
    //
    //    // Given
    //    $budgeterUnderTest = new Budgeter;
    //    $subcategory = new Subcategory();
    //
    //    // When
    //    $budgeterUnderTest->createSubcategoryBudgetByDate($subcategory, self::$currentDate);
    //    $budgeterUnderTest->createSubcategoryBudgetByDate($subcategory, self::$currentDate);
    //}
    //
    ///**
    // * @depends testShouldCreateManyBudgetsWithDatesForSubcategory
    // *
    // * @param Subcategory $subcategory
    // */
    //public function testShouldGetBudgetByDate(Subcategory $subcategory)
    //{
    //    // Given
    //    $budgeterUnderTest = new Budgeter;
    //    $budget = $subcategory->getBudgets()->first();
    //
    //    // When
    //    $actual = $budgeterUnderTest->getBudgetByDate($subcategory, $budget->getDate());
    //
    //    // Then
    //    $this->assertSame($budget, $actual);
    //}
}
