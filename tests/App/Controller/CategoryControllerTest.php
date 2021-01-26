<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Subcategory;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\Validator\Constraints\DateTime;

class CategoryControllerTest extends WebTestCase
{
    private $client;
    /** * @var EntityManager */
    private $entityManager;

    protected function setUp() : void
    {
        $this->client = static::createClient();
        $this->client->catchExceptions(false);

        $this->entityManager = $this->client->getContainer()->get('doctrine')->getManager();
    }

    protected function tearDown() : void
    {
        parent::tearDown();

        $this->entityManager->close();
        $this->entityManager = null;
        $this->client = null;
    }

    public function testShouldCreateNewSubcategoryForCategory()
    {
        // Given
        /** @var Category $categoryUnderTest */
        $categoryUnderTest = $this->entityManager->getRepository(Category::class)->find(1);
        $baseSubcategoriesNumber = $categoryUnderTest->getSubcategories()->count();

        // When
        $this->client->request('POST', '/api/categories/' . $categoryUnderTest->getId() . '/subcategories/');
        $actualSubcategoriesNumber = $categoryUnderTest->getSubcategories()->count();
        /** @var Subcategory $newSubcategory */
        $newSubcategory = $categoryUnderTest->getSubcategories()->last();
        $actualNewSubcategoryBudgetDate = $newSubcategory->getBudgets()->last()->getDate();

        // Then
        $this->assertEquals(200, $this->client->getResponse()->getStatusCode());
        $this->assertEquals($baseSubcategoriesNumber + 1, $actualSubcategoriesNumber);
        $this->assertEquals(($actualNewSubcategoryBudgetDate)->format("Ym"), (new \DateTime())->format("Ym"));
    }
}
