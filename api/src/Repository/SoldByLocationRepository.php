<?php

namespace App\Repository;

use App\Entity\SoldByLocation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method SoldByLocation|null find($id, $lockMode = null, $lockVersion = null)
 * @method SoldByLocation|null findOneBy(array $criteria, array $orderBy = null)
 * @method SoldByLocation[]    findAll()
 * @method SoldByLocation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SoldByLocationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SoldByLocation::class);
    }

    // /**
    //  * @return SoldByLocation[] Returns an array of SoldByLocation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SoldByLocation
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
