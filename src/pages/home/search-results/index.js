import {Styled_search_results_list, Styled_search_results_list_item} from './index.styles';

function SearchResults({ items }) {
  return (
    <Styled_search_results_list data-testid="search-results">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <Styled_search_results_list_item key={index}>{item}</Styled_search_results_list_item>
          ))
        ) : (
          <Styled_search_results_list_item>No results found</Styled_search_results_list_item>
        )}
    </Styled_search_results_list>
  );
}

export default SearchResults;
