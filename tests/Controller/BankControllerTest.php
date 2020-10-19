<?php

namespace App\Tests\Controller;

use App\Controller\BankController;
use App\Entity\User;
use App\Form\BankType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class BankControllerTest extends WebTestCase
{

    public function testShouldCreateEmptyBankByLoggedUser()
    {
        // Given
        $client = static::createClient();
        $userRepository = static::$container->get(UserRepository::class);
        $testUser = $userRepository->findOneByEmail('test@test.pl');
        $bankName = 'Test bank';

        // When
        $client->loginUser($testUser);
        $client->request('GET', '/bank/new');
        $client->submitForm('Save', ['bank[name]' => $bankName]);

        $collection = $testUser->getBanks();
        $filteredCollection = $collection->filter(function($element, $bankName) {
            return $element->getName() == $bankName;
        });

        // Then
        $this->assertNotEmpty($filteredCollection);
        $this->assertEquals(1, $filteredCollection->count());
        $this->assertEquals(0, $filteredCollection[0]->getBalance());
    }

}
