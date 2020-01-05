<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(collectionOperations={
 *     "get",
 *     "meanprices"={
 *         "method"="GET",
 *         "path"="property_value/houseandapp",
 *         "controller"=App\Controller\GetHouseAndApp::class,
 *         "pagination_enabled"=false,
 *         "read"= false,
 *         "openapi_context"={
 *              "summary"="Gets all propertyValue with nature 'Vente' and type 'Maison' or 'Appartement'",
 *              "description"="Gets all propertyValue with nature 'Vente' and type 'Maison' or 'Appartement'",
 *              "read"="false"
 *          }
 *     }
 * })
 * @ORM\Entity(repositoryClass="App\Repository\PropertyValueRepository")
 */
class PropertyValue
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nature;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $region;

    /**
     * @ORM\Column(type="float")
     */
    private $priceSquareMeter;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getNature(): ?string
    {
        return $this->nature;
    }

    public function setNature(string $nature): self
    {
        $this->nature = $nature;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getPriceSquareMeter(): ?float
    {
        return $this->priceSquareMeter;
    }

    public function setPriceSquareMeter(float $priceSquareMeter): self
    {
        $this->priceSquareMeter = $priceSquareMeter;

        return $this;
    }
}
