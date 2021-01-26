<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SubcategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\SubcategoryCreateController;
use App\Controller\SubcategoryController;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=SubcategoryRepository::class)
 *
 * @ApiResource(
 *  itemOperations={
 *      "get",
 *      "patch",
 *  },
 *  collectionOperations={
*     }
 *
 * )
 * @ApiFilter(SearchFilter::class, properties={"id"})
 *
 */

class Subcategory
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     *
     * @Groups({"category"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @Groups({"transaction:list", "category"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="subcategories", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="subcategory")
     * @Groups({"category"})
     */
    private $transactions;

    /**
     * @ORM\OneToMany(targetEntity=Budget::class, mappedBy="subcategory")
     */
    private $budgets;

    /**
     * @Groups({"category"})
     */
    private $budget;

    public function __construct()
    {
        $this->transactions = new ArrayCollection();
        $this->budgets = new ArrayCollection();
    }

    public function getId() : ?int
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

    public function getName() : ?string
    {
        return $this->name;
    }

    public function setName(string $name) : self
    {
        $this->name = $name;

        return $this;
    }

    public function getCategory() : ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category) : self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getTransactions() : Collection
    {
        return $this->transactions;
    }

    public function addTransaction(Transaction $transaction) : self
    {
        if (!$this->transactions->contains($transaction)) {
            $this->transactions[] = $transaction;
            $transaction->setSubcategory($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction) : self
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

    /**
     * @return Collection|Budget[]
     */
    public function getBudgets() : Collection
    {
        return $this->budgets;
    }

    public function getBudget()
    {
        return $this->getBudgets()->filter(function(Budget $budget){
            return $budget->getDate()->format('Y-m') == '2021-01';
        });
    }

    public function addBudget(Budget $budget) : self
    {
        if (!$this->budgets->contains($budget)) {
            $this->budgets[] = $budget;
            $budget->setSubcategory($this);
        }

        return $this;
    }
}
