<?php

namespace App\Controller;

use App\Entity\PropertyValue;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class GetSalesByRegions
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $data)
    {
        $year = $data->query->get('year');
        $date = $year.'-01-01 00:00:00+00';

        $sql = "SELECT p.region as region,
            COUNT(p.region) AS sales
            FROM App:PropertyValue p
            WHERE p.nature = 'Vente' AND DATE_TRUNC('year', p.date) = '".$date."'
            GROUP BY region";

        return $this->entityManager->createQuery($sql)->getResult();
    }
}
