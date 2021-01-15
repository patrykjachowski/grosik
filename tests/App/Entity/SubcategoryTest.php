<?php

namespace App\Entity;

use App\Exception\BudgetAlreadyExistsException;
use DateTime;
use PHPUnit\Framework\TestCase;
use Symfony\Bridge\Monolog\Logger;

class SubcategoryTest extends TestCase
{
    ///** @var DateTime */
    //private static $currentDate;
    //private static $pastDate;
    //
    //public static function setUpBeforeClass() : void
    //{
    //    self::$currentDate = new DateTime();
    //    self::$pastDate = new DateTime('2010-05-10');
    //}
    //
    //public function testShouldCreateBudgetWithDateForSubcategory()
    //{
    //    // Given
    //    $subcategoryUnderTest = new Subcategory();
    //    $expected = self::$currentDate;
    //
    //    // When
    //    $subcategoryUnderTest->createBudgetByDate(self::$currentDate);
    //    $actual = $subcategoryUnderTest->getBudgets()->first()->getDate();
    //
    //    // Then
    //    $this->assertSame($expected, $actual);
    //
    //    return $subcategoryUnderTest;
    //}
    //
    //public function testShouldCreateManyBudgetsWithDatesForSubcategory()
    //{
    //    // Given
    //    $subcategoryUnderTest = new Subcategory();
    //
    //    // When
    //    $subcategoryUnderTest->createBudgetByDate(self::$pastDate);
    //    $subcategoryUnderTest->createBudgetByDate(self::$currentDate);
    //
    //    $expectedDate1 = $subcategoryUnderTest->getBudgets()[0]->getDate();
    //    $expectedDate2 = $subcategoryUnderTest->getBudgets()[1]->getDate();
    //
    //    // Then
    //    $this->assertCount(2, $subcategoryUnderTest->getBudgets());
    //    $this->assertSame($expectedDate1, self::$pastDate);
    //    $this->assertSame($expectedDate2, self::$currentDate);
    //
    //    return $subcategoryUnderTest;
    //}
    //
    //public function testShouldThrowBudgetAlreadyExistsWhenITryToAddNewBudgetWithTheSameDate()
    //{
    //    // Expect
    //    $this->expectException(BudgetAlreadyExistsException::class);
    //    $this->expectExceptionMessage('Budget is already created for selected date!');
    //
    //    // Given
    //    $subcategoryUnderTest = new Subcategory();
    //
    //    // When
    //    $subcategoryUnderTest->createBudgetByDate(self::$currentDate);
    //    $subcategoryUnderTest->createBudgetByDate(self::$currentDate);
    //}
    //
    ///**
    // * @depends testShouldCreateManyBudgetsWithDatesForSubcategory
    // *
    // * @param Subcategory $subcategoryUnderTest
    // */
    //public function testShouldGetBudgetByDate(Subcategory $subcategoryUnderTest)
    //{
    //    // Given
    //    $budget = $subcategoryUnderTest->getBudgets()->first();
    //
    //    // When
    //    $actual = $subcategoryUnderTest->getBudgetByDate($budget->getDate());
    //
    //    // Then
    //    $this->assertSame($budget, $actual);
    //}

}

