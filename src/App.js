import './App.css';
import InputField from './components/controls/input';
import Button from './components/controls/button';
import Paragraph from './components/texts/paragraph';
import SearchResults from './pages/home/search-results';

import {useEffect, useState} from "react";

import {useGetDataMutation, useSetDataMutation, useGetExternalDataMutation} from "./utilities/redux/services/api.service";

function App() {

  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  
  const [getData] = useGetDataMutation();
  const [setData] = useSetDataMutation();
  const [getExternalData] = useGetExternalDataMutation();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('search');
    query && setQuery(query);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => getData(query ? {item: query} : null).then(response => setItems(response.data)), 500);

    // eslint-disable-next-line no-restricted-globals
    history.pushState({}, '', query === "" ? "?" : `?search=${query}`);

    return () => clearTimeout(delayDebounceFn)
  }, [query]);

  const addNewItem = () => {
    if (newItem != "") {
      setData({body: {item: newItem}}).then(response => {
        alert(response.data.message);
      })
    }
  }

  const getExternalApiData = () => {
    getExternalData().then(response => console.log(response.data))
  }

  return (
    <div className="App">
      <header className="App-header">
        <Paragraph>Hi my name is Skynet, I'm a friendly search algorithm</Paragraph>
        <Paragraph>Simply allow me to take control, it will be fine!</Paragraph>
        <InputField onChange={(e) => setQuery(e.target.value)} value={query} />
        <SearchResults items={items} />
        <div>
          <InputField onChange={(e) => setNewItem(e.target.value)} value={newItem} />
          <Button onClick={e => addNewItem()}>ADD NEW ITEM</Button>
          <Button onClick={e => getExternalApiData()}>GET DATA FROM JSON PLACEHOLDER API TO CONSOLE</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
