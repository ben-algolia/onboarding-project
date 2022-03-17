const { autocomplete } = window['@algolia/autocomplete-js'];
const { getAlgoliaResults } = window['@algolia/autocomplete-js'];

const searchClient = algoliasearch(
  'I98ERVUJ34',
  'c43b258d6b10e132df6239366cb268eb' // search only API key, not admin API key
);

const search = instantsearch({
  indexName: 'concerts',
  searchClient,
  routing: true,
});

search.addWidgets([
  instantsearch.widgets.configure({
    //hitsPerPage: 5,
    aroundLatLngViaIP: true,
  })
]);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Type any artist or venue',
  })
]);

search.addWidgets([
  instantsearch.widgets.hitsPerPage({
    container: '#hits-per-page',
    items: [
      { label: '5 hits per page', value: 5, default: true },
      { label: '10 hits per page', value: 10 },
    ],
  })
]);

instantsearch.widgets.currentRefinements({
  container: '#current-refinements',
});

search.addWidgets([
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: document.getElementById('hit-template').innerHTML,
      empty: `We didn't find any results for the search <em>"{{query}}"</em>`,
    },
  })
]);

search.start();
