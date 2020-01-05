<?php

namespace App\Controller;

use App\Entity\PropertyValue;

use Doctrine\ORM\EntityManagerInterface;

class GetHouseAndApp
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke()
    {
        $sql = "SELECT DATE_TRUNC('month', p.date) AS cur_date,
            AVG(p.priceSquareMeter) AS priceSquareM
            FROM App:propertyValue p
            WHERE p.priceSquareMeter <> -1 AND p.nature = 'Vente' AND p.type LIKE 'Appartement' OR p.type LIKE 'Maison'
            GROUP BY cur_date
            ORDER BY cur_date";

        return $this->entityManager->createQuery($sql)->getResult();    
    }
}