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
        $manager->getConnection()->getConfiguration()->setSQLLogger(null);

        $handle = @fopen(__DIR__ . DIRECTORY_SEPARATOR."../../public/data/valeursfoncieres-2019.txt", "r");
        if ($handle) {
            $i = 0;
            while (($buffer = fgets($handle, 4096)) !== false) {
                if($i == 0) {
                    $i++;
                    continue;
                }

                // clear memory
                if($i % 100 == 0) {
                    $manager->flush();
                    $manager->clear();
                }

                $splitValue = explode("|", $buffer);
                $propertyValue = new PropertyValue();

                // date format
                $date = null;
                try {
                    $dateSplit = explode("/", $splitValue[8]);

                    $date = new DateTime($dateSplit[2].'-'.$dateSplit[1].'-'.$dateSplit[0]);
                } catch (Exception $e) {
                    echo $e->getMessage();
                    exit(1);
                }

                
                $propertyValue->setDate($date);
                $propertyValue->setNature($splitValue[9]);
                $propertyValue->setType($splitValue[36]);
                $propertyValue->setRegion($splitValue[18]);

                // compute price per square meter
                $squareMeter = -1;
                $splitValue[38] = str_replace(",", ".", $splitValue[38]);
                $splitValue[42] = str_replace(",", ".", $splitValue[42]);
                if (is_numeric($splitValue[38]))
                    $squareMeter = floatval($splitValue[38]);
                else if(is_numeric($splitValue[42]))
                    $squareMeter = floatval($splitValue[42]);
                else {
                    $propertyValue->setPriceSquareMeter(-1);
                }

                $price = -1;
                
                $splitValue[10] = str_replace(",", ".", $splitValue[10]);
                if (is_numeric($splitValue[10]))
                    $price =floatval($splitValue[10]);
                else {
                    $propertyValue->setPriceSquareMeter(-1);
                }

                
                if($price > -1 && $squareMeter > -1) {
                    if($squareMeter > 0) {
                        $priceSquareM = $price / $squareMeter;
                        $propertyValue->setPriceSquareMeter($priceSquareM);
                    } else {
                        $propertyValue->setPriceSquareMeter(-1);
                    }
                }

                $manager->persist($propertyValue);
                $i++;
            }
            if (!feof($handle)) {
                echo "Erreur: fgets() failed\n";
            }
            fclose($handle);
        }

        $manager->flush();
    }
}
