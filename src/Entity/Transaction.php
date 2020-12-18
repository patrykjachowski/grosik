<?php

namespace App\Entity;

use App\Repository\TransactionRepository;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TransactionRepository::class)
 *
 * @ApiResource(
 *     collectionOperations={
 *          "get"={"normalization_context"={"groups"="transaction:list"}},
 *     },
 *     itemOperations={"get","put"}
 * )
 */
class Transaction
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"transaction:list", "transaction:item"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     *
     * @Groups({"transaction:list", "transaction:item"})
     */
    private $date;

    /**
     * @ORM\Column(type="float")
     *
     * @Groups({"transaction:list", "transaction:item"})
     */
    private $value;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"transaction:list", "transaction:item"})
     */
    private $payee;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Groups({"transaction:list", "transaction:item"})
     */
    private $memo;

    /**
     * @ORM\ManyToOne(targetEntity=Bank::class, inversedBy="transactions")
     * @ORM\JoinColumn(nullable=false)
     *
     * @Groups({"transaction:list", "transaction:item"})
     */
    private $bank;

    /**
     * @ORM\ManyToOne(targetEntity=Subcategory::class, inversedBy="transactions")
     *
     * @Groups({"transaction:list"})
     */
    private $subcategory;

    public function getId() : ?int
    {
        return $this->id;
    }

    public function getDate() : ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date) : self
    {
        $this->date = $date;

        return $this;
    }

    public function getValue() : ?float
    {
        return $this->value;
    }

    public function setValue(float $value) : self
    {
        $this->value = $value;

        return $this;
    }

    public function getPayee() : ?string
    {
        return $this->payee;
    }

    public function setPayee(string $payee) : self
    {
        $this->payee = $payee;

        return $this;
    }

    public function getMemo() : ?string
    {
        return $this->memo;
    }

    public function setMemo(?string $memo) : self
    {
        $this->memo = $memo;

        return $this;
    }

    public function getBank() : ?Bank
    {
        return $this->bank;
    }

    public function setBank(?Bank $bank) : self
    {
        $this->bank = $bank;

        return $this;
    }

    public function getSubcategory() : ?Subcategory
    {
        return $this->subcategory;
    }

    public function setSubcategory(?Subcategory $subcategory) : self
    {
        $this->subcategory = $subcategory;

        return $this;
    }
}
