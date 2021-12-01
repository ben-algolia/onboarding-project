#!/opt/homebrew/bin/php
<?php

require __DIR__ . '/vendor/autoload.php';

define('MAX_RECORDS', false); // Set to a positive integer, or false for no limit

define('INDEX_ID', 'I98ERVUJ34');
define('API_KEY', 'b9250962d37704b5654a6c3df9dd7275');
define('INDEX_NAME', 'concerts');

define('DATA_FILENAME', 'Data/alternative_rock_artists.json');

$client = Algolia\AlgoliaSearch\SearchClient::create(INDEX_ID, API_KEY);

$index = $client->initIndex(INDEX_NAME);

// Index records
try {
    $records = json_decode(file_get_contents(DATA_FILENAME), true);
    if (MAX_RECORDS !== false) {
        // Truncate $records to MAX_RECORDS entries
        array_splice($records, MAX_RECORDS);
    }
    echo 'Attempting to index ' . count($records) . " records \n";
    $index->saveObjects($records, [
        'autoGenerateObjectIDIfNotExist' => true,
    ]);
    echo 'Records indexed!';
} catch (Exception $e) {
    echo $e->getMessage();
}
