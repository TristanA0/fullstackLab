<?php

namespace App\DataFixtures;

use App\Entity\PropertyValue;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

use \DateTime;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $handle = @fopen(__DIR__ . DIRECTORY_SEPARATOR."../../public/data/valeursfoncieres-2019.txt", "r");
        if ($handle) {
            while (($buffer = fgets($handle, 4096)) !== false) {
                $splitValue = explode("|", $buffer);
            }
            if (!feof($handle)) {
                echo "Erreur: fgets() failed\n";
            }
            fclose($handle);
        }


        /*
        for ($i = 0; $i < 53; $i = $i+26) {
            $countSold = new CountSold();
            $countSold->setDate(new DateTime());
            $countSold->setSolds($i);
            $manager->persist($countSold);
        }*/

        $manager->flush();
    }
}
