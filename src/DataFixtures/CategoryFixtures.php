<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    public const CATEGORY_REFERENCE = 'category';
    public const MAX_CATEGORIES = 5;

    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < self::MAX_CATEGORIES; $i++) {
            $category = new Category();
            $category->setName('Category ' . $i);
            $manager->persist($category);
        }

        $manager->flush();
    }
}
