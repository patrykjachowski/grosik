<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\BudgetRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"category"}},
 * )
 * @ORM\Entity(repositoryClass=BudgetRepository::class)
 */
class Budget
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"category"})
     */
    private $id;

    /**
     * @ORM\ManyToOne (targetEntity=Subcategory::class, cascade={"persist", "remove"}, inversedBy="budgets")
     * @ORM\JoinColumn(nullable=false)
     */
    private $subcategory;

    /**
     * @Groups({"category"})
     * @ORM\Column(type="float")
     */
    private $value = 0;

    /**
     * @ORM\Column(type="date")
     * @Groups({"category"})
     */
    private $date;

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

    public function getSubcategory() : ?Subcategory
    {
        return $this->subcategory;
    }

    public function setSubcategory(Subcategory $subcategory) : self
    {
        $this->subcategory = $subcategory;

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

    public function getDate() : ?\DateTime
    {
        return $this->date;
    }

    public function setDate(\DateTime $date) : self
    {
        $this->date = $date;

        return $this;
    }
}
