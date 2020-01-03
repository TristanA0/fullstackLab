<?php

namespace App\DataFixtures;

use App\Entity\CountSold;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

use \DateTime;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {

        for ($i = 0; $i < 50; $i = $i+25) {
            $countSold = new CountSold();
            $countSold->setDate(new DateTime());
            $countSold->setSolds($i);
            $manager->persist($countSold);
        }

        $manager->flush();
    }
}
