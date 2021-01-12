<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SubcategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\SubcategoryController;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SubcategoryRepository::class)
 *
 * @ApiResource(
 *     normalizationContext={"groups"={"subcategory"}},
 *
 * itemOperations={
 *     "get","put",
 *     "delete"={
 *         "controller"=SubcategoryController::class
 *     }
 * })
 *
 *
 */

class Subcategory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"category:list"})
     *
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"transaction:list", "category:list"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="subcategories")
     * @ORM\JoinColumn(nullable=false)
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="subcategory")
     */
    private $transactions;

    /**
     * @ORM\OneToMany(targetEntity=budget::class, cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $budget;

    public function __construct()
    {
        $this->transactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id) : void
    {
        $this->id = $id;
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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

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
            $this->transactions[] = $transaction;
            $transaction->setSubcategory($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transactions->contains($transaction)) {
            $this->transactions->removeElement($transaction);
            // set the owning side to null (unless already changed)
            if ($transaction->getSubcategory() === $this) {
                $transaction->setSubcategory(null);
            }
        }

        return $this;
    }

    public function getBudget(): ?budget
    {
        return $this->budget;
    }

    public function setBudget(budget $budget): self
    {
        $this->budget = $budget;

        return $this;
    }
}
