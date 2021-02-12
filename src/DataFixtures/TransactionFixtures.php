<?php

namespace App\DataFixtures;

use App\Entity\Transaction;
use App\Repository\BankRepository;
use App\Repository\SubcategoryRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
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
        $firstSubcategoryId = $this->subcategoryRepository->findOneBy([])->getId();
        $lastCategoryId = $firstSubcategoryId + SubcategoryFixtures::MAX_SUBCATEGORIES - 1;

        for ($i = 0; $i < 40; $i++) {
            $randomCategoryId = rand($firstSubcategoryId, $lastCategoryId);
            $transaction = new Transaction();
            $transaction->setBank($this->bankRepository->findOneBy([]));
            $transaction->setSubcategory($this->subcategoryRepository->find($randomCategoryId));
            $transaction->setDate(new \DateTime());
            $transaction->setValue(rand(0, 500));
            $transaction->setPayee('random payee');
            $transaction->setMemo('memo');
            $transaction->setBalance();

            $manager->persist($transaction);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            BankFixtures::class,
            UserFixtures::class,
            CategoryFixtures::class,
            SubcategoryFixtures::class,
        );
    }
}
