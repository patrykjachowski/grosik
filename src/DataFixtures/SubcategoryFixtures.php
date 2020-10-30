<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Subcategory;
use App\Repository\CategoryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\DataFixtures\CategoryFixtures;
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
        for ($i = 0; $i < self::MAX_SUBCATEGORIES; $i++) {
            $subcategory = new Subcategory();
            $subcategory->setName('Subcategory' . $i);
            $subcategory->setCategory($this->categoryRepository->find(rand(1,CategoryFixtures::MAX_CATEGORIES)));
            $manager->persist($subcategory);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            CategoryFixtures::class,
        );
    }
}
