import './App.css';
import InputField from './components/controls/input';
import Paragraph from './components/texts/paragraph';
import SearchResults from './pages/home/search-results';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Paragraph>Hi my name is Skynet, I'm a friendly search algorithm</Paragraph>
        <Paragraph>Simply allow me to take control, it will be fine!</Paragraph>
        <InputField />
        <SearchResults />
        <div></div>
      </header>
    </div>
  );
}

export default App;
