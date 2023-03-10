import {Styled_search_results_list, Styled_search_results_list_item} from './index.styles';

function SearchResults({ items = ["defauls", "defauls","defauls", "defauls","defauls", "defauls","defauls", "defauls"] }) {
  return (
    <Styled_search_results_list>
        {items.map((item, index) => (
            <Styled_search_results_list_item key={index}>{item}</Styled_search_results_list_item>
        ))}
    </Styled_search_results_list>
  );
}

export default SearchResults;
