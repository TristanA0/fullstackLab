<?php

namespace App\Controller;

use App\Entity\PropertyValue;

use Doctrine\ORM\EntityManagerInterface;

class GetSalesByRegions
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke()
    {
        $sql = "SELECT p.region as region,
            COUNT(p.region) AS sales
            FROM App:PropertyValue p
            WHERE p.nature = 'Vente'
            GROUP BY region";

        return $this->entityManager->createQuery($sql)->getResult();
    }
}
