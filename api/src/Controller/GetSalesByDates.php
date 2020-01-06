<?php

namespace App\Controller;


use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class GetSalesByDates
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $data)
    {
        $interval = $data->query->get('interval');
        $start = $data->query->get('start');
        $end = $data->query->get('end');

        $sql = "SELECT DATE_TRUNC('".$interval."', p.date) AS cur_date, COUNT(p.nature) AS sales
                FROM App:propertyValue p
                WHERE p.nature = 'Vente' AND p.date BETWEEN '".$start."' AND '".$end."'
                GROUP BY cur_date
                ORDER BY cur_date";

        return $this->entityManager->createQuery($sql)->getResult();

    }
}
