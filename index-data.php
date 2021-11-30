#!/opt/homebrew/bin/php
<?php

require __DIR__ . '/vendor/autoload.php';

define('MAX_RECORDS', 9950); // Set to a positive integer, or false for no limit

$client = Algolia\AlgoliaSearch\SearchClient::create(
    'I98ERVUJ34',
    'b9250962d37704b5654a6c3df9dd7275'
);

$index = $client->initIndex('onboarding-project');

// Index records
try {
    $records = json_decode(file_get_contents('Data/alternative_rock_artists.json'), true);
    if (MAX_RECORDS !== false) {
        // Truncate $records to MAX_RECORDS entries
        array_splice($records, MAX_RECORDS);
    }
    echo 'Attempting to index ' . count($records) . " records \n";
    $index->saveObjects($records, ['autoGenerateObjectIDIfNotExist' => true]);
    echo 'Records indexed!';
} catch (Exception $e) {
    echo $e->getMessage();
}
