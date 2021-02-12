<?php

namespace App\DataFixtures;

use App\Entity\Subcategory;
use App\Repository\CategoryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class SubcategoryFixtures extends Fixture implements DependentFixtureInterface
{
    public const MAX_SUBCATEGORIES = 5;
    /**
     * @var CategoryRepository
     */
    private $categoryRepository;

    /**
     * SubcategoryFixtures constructor.
     *
     * @param CategoryRepository $categoryRepository
     */
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function load(ObjectManager $manager)
    {
        $firstCategoryId = $this->categoryRepository->findOneBy([])->getId();
        $lastCategoryId = $firstCategoryId + CategoryFixtures::MAX_CATEGORIES - 1;

        for ($i = 0; $i < self::MAX_SUBCATEGORIES; $i++) {
            $randomCategoryId = rand($firstCategoryId, $lastCategoryId);
            $subcategory = new Subcategory();
            $subcategory->setName('Subcategory' . $i);
            $subcategory->setCategory($this->categoryRepository->find($randomCategoryId));
            $manager->persist($subcategory);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            CategoryFixtures::class,
        ];
    }
}
