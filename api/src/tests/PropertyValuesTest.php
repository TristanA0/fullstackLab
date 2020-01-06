<?php
namespace App\Tests;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\PropertyValue;
use Hautelook\AliceBundle\PhpUnit\RefreshDatabaseTrait;

class PropertyValuesTest extends ApiTestCase
{
    // This trait provided by HautelookAliceBundle will take care of refreshing the database content to a known state before each test
    use RefreshDatabaseTrait;

    public function testGetCollection(): void
    {
        // The client implements Symfony HttpClient's `HttpClientInterface`, and the response `ResponseInterface`
        $response = static::createClient()->request('GET', '/property_values');

        $this->assertResponseIsSuccessful();
        // Asserts that the returned content type is JSON-LD (the default)
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        // Asserts that the returned JSON is a superset of this one
        $this->assertJsonContains([
            '@context' => '/contexts/PropertyValue',
            '@id' => '/property_values',
            '@type' => 'hydra:Collection',
            'hydra:totalItems' => 201,
            'hydra:view' => [
                '@id' => '/property_values?page=1',
                '@type' => 'hydra:PartialCollectionView',
                'hydra:first' => '/property_values?page=1',
                'hydra:last' => '/property_values?page=7',
                'hydra:next' => '/property_values?page=2',
            ],
        ]);

        // Because test fixtures are automatically loaded between each test, you can assert on them
        $this->assertCount(30, $response->toArray()['hydra:member']);

        // Asserts that the returned JSON is validated by the JSON Schema generated for this resource by API Platform
        // This generated JSON Schema is also used in the OpenAPI spec!
        $this->assertMatchesResourceCollectionJsonSchema(PropertyValue::class);
    }

    public function testUpdatePropertyValue(): void
    {
        $client = static::createClient();

        // created in fixture
        $iri = static::findIriBy(PropertyValue::class, ['region' => '94']);

        $client->request('PUT', $iri, ['json' => [
            'type' => 'Appartement',
        ]]);

        $this->assertResponseIsSuccessful();
        $this->assertJsonContains([
            '@id' => $iri,
            'region' => '94',
            'type' => 'Appartement',
        ]);
    }

    public function testDeletePropertyValue(): void
    {
        $client = static::createClient();
        $iri = static::findIriBy(PropertyValue::class, ['region' => '94']);

        $client->request('DELETE', $iri);

        $this->assertResponseStatusCodeSame(204);
        $this->assertNull(
            // Through the container, you can access all your services from the tests, including the ORM, the mailer, remote API clients...
            static::$container->get('doctrine')->getRepository(PropertyValue::class)->findOneBy(['region' => '94'])
        );
    }
}