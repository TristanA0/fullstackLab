<?php

namespace App\Repository;

use App\Entity\CountSold;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method CountSold|null find($id, $lockMode = null, $lockVersion = null)
 * @method CountSold|null findOneBy(array $criteria, array $orderBy = null)
 * @method CountSold[]    findAll()
 * @method CountSold[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CountSoldRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CountSold::class);
    }

    // /**
    //  * @return CountSold[] Returns an array of CountSold objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CountSold
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
