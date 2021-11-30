// Replace with your own values
const searchClient = algoliasearch(
  'I98ERVUJ34',
  'c43b258d6b10e132df6239366cb268eb' // search only API key, not admin API key
);

const search = instantsearch({
  indexName: 'onboarding-project',
  searchClient,
  routing: true,
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 10,
  })
]);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for concerts',
  })
]);

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
