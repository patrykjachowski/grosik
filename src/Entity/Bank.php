<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Exception\TransactionNotFoundException;
use App\Repository\BankRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=BankRepository::class)
 *
 * @ApiResource(
 *     collectionOperations={"get"={"normalization_context"={"groups"="bank:list"}}},
 *     itemOperations={"get"={"normalization_context"={"groups"="bank:item"}}},
 *     paginationEnabled=false
 * )
 */
class Bank
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"transaction:list","bank:list"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="banks")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="bank")
     */
    private $transactions;

    public function __construct()
    {
        $this->transactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getTransactions(): Collection
    {
        return $this->transactions;
    }

    public function addTransaction(Transaction $transaction): self
    {
        if (!$this->transactions->contains($transaction)) {
            $transaction->setBank($this);
            $transaction->setBalance();
            $this->transactions[] = $transaction;
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if (!$this->transactions->contains($transaction)){
            throw new TransactionNotFoundException('Transaction is not found!');
        }

        if ($this->transactions->contains($transaction)) {
            $this->transactions->removeElement($transaction);
            // set the owning side to null (unless already changed)
            if ($transaction->getBank() === $this) {
                $transaction->setBank(null);
            }
        }

        return $this;
    }

    public function getBalance()
    {
        if (!$this->getLastTransaction()) return 0.0;
        return $this->getLastTransaction()->getBalance();
    }

    private function getLastTransaction()
    {
        $transactions = $this->getTransactions();
        $transactionsNumber = count($transactions);

        if ($transactionsNumber > 1) {
            return $transactions[$transactionsNumber - 1];
        }

        return $transactions[0];
    }
}
