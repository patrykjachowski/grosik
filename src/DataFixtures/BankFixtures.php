<?php

namespace App\DataFixtures;

use App\Entity\Bank;
use App\Repository\UserRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\DataFixtures\UserFixtures;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class BankFixtures extends Fixture implements DependentFixtureInterface
{
    public const BANK_REFERENCE = 'bank';

    private $encoder;
    private $userRepository;

    public function __construct(UserPasswordEncoderInterface $encoder, UserRepository $userRepository)
    {
        $this->encoder = $encoder;
        $this->userRepository = $userRepository;
    }

    public function load(ObjectManager $manager)
    {
        $bank = new Bank();
        $user = $this->userRepository->findOneByEmail('test@test.pl');
        $bank->setName('AcmeBank');
        $bank->setBalance(0);
        $bank->setUser($user);

        $this->addReference(self::BANK_REFERENCE, $bank);

        $manager->persist($bank);
        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
        );
    }
}
