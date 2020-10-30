<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Subcategory;
use App\Entity\Transaction;
use App\Repository\BankRepository;
use App\Repository\SubcategoryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\DataFixtures\UserFixtures;
use App\DataFixtures\CategoryFixtures;
use App\DataFixtures\SubcategoryFixtures;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class TransactionFixtures extends Fixture implements DependentFixtureInterface
{
    /**
     * @var SubcategoryRepository
     */
    private $subcategoryRepository;
    /**
     * @var BankRepository
     */
    private $bankRepository;

    /**
     * TransactionFixtures constructor.
     *
     * @param BankRepository $bankRepository
     * @param SubcategoryRepository $subcategoryRepository
     */
    public function __construct(BankRepository $bankRepository, SubcategoryRepository $subcategoryRepository)
    {
        $this->subcategoryRepository = $subcategoryRepository;
        $this->bankRepository = $bankRepository;
    }

    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 40; $i++) {
            $dateNow = date("Y-m-d H:i:s");

            $transaction = new Transaction();
            $transaction->setBank($this->bankRepository->find(1));
            $transaction->setSubcategory($this->subcategoryRepository->find(rand(0,SubcategoryFixtures::MAX_SUBCATEGORIES)));
            $transaction->setDate(new \DateTime());
            $transaction->setValue(rand(0, 500));
            $transaction->setPayee('random payee');
            $transaction->setMemo('memo');

            $manager->persist($transaction);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
            CategoryFixtures::class,
            SubcategoryFixtures::class,
        );
    }
}
