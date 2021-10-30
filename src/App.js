import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import DomainSearch from './components/domainSearch';

function App() {
  return (
    <div className="app">
      <Navbar />
      <DomainSearch ajax={true} related={true} />
    </div>
  );
}

export default App;
