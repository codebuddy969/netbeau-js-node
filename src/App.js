import './App.css';
import InputField from './components/controls/input';
import Paragraph from './components/texts/paragraph';
import SearchResults from './pages/home/search-results';

import {useEffect, useState} from "react";

import {useGetDataMutation} from "./utilities/redux/services/api.service";

function App() {

  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [getData] = useGetDataMutation();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('search');
    query && setQuery(query);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => getData(query ? {item: query} : null).then(response => setItems(response.data)), 500);

    // eslint-disable-next-line no-restricted-globals
    history.pushState({}, '', query === "" ? "?" : `?search=${query}`);

    // Cancel the debounce on useEffect cleanup
    return () => clearTimeout(delayDebounceFn)
  }, [query]);


  return (
    <div className="App">
      <header className="App-header">
        <Paragraph>Hi my name is Skynet, I'm a friendly search algorithm</Paragraph>
        <Paragraph>Simply allow me to take control, it will be fine!</Paragraph>
        <InputField onChange={(e) => setQuery(e.target.value)} value={query} />
        <SearchResults items={items} />
        <div></div>
      </header>
    </div>
  );
}

export default App;
