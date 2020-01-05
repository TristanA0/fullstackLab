<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(collectionOperations={
 *     "get",
 *     "priceSquareMeterByMonth"={
 *         "method"="GET",
 *         "path"="property_value/price_square_meter_by_month",
 *         "controller"=App\Controller\GetPriceSquareMeterByMonth::class,
 *         "pagination_enabled"=false,
 *         "read"= false,
 *         "openapi_context"={
 *              "summary"="Gets all price square meter by month",
 *              "description"="Gets all price square meter by month",
 *              "read"="false"
 *          }
 *     },
 *     "salesByRegions"={
 *         "method"="GET",
 *         "path"="property_value/sales_by_regions",
 *         "controller"=App\Controller\GetSalesByRegions::class,
 *         "pagination_enabled"=false,
 *         "read"= false,
 *         "openapi_context"={
 *              "summary"="Gets all sales for every regions",
 *              "description"="Gets all sales for every regions",
 *              "read"="false"
 *          }
 *     },
 *     "salesByDates"={
 *         "method"="GET",
 *         "path"="property_value/sales_by_dates",
 *         "controller"=App\Controller\GetSalesByDates::class,
 *         "pagination_enabled"=false,
 *         "read"= false,
 *         "openapi_context"={
 *              "summary"="Gets all sales for an interval",
 *              "description"="Gets all sales for an interval",
 *              "read"="false",
 *              "parameters"={
 *                  {
 *                      "in"="query",
 *                      "name"="interval",
 *                      "required"= true,
 *                      "schema"= {
 *                          "type"="string",
 *                          "enum"={"day","month","year"}
 *                      },
 *                      "example"="month"
 *                  },
 *                  {
 *                      "in"="query",
 *                      "name"="start",
 *                      "required"= true,
 *                      "schema"= {
 *                          "type"="string",
 *                          "format"="full-date"
 *                      },
 *                      "example"="2015-01-01"
 *                  },
 *                  {
 *                      "in"="query",
 *                      "name"="end",
 *                      "required"= true,
 *                      "schema"= {
 *                          "type"="string",
 *                          "format"="full-date"
 *                      },
 *                      "example"="2019-12-31"
 *                  }
 *              }
 *          }
 * 
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
