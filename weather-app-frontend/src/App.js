import logo from './logo.svg';
import './App.css';
import Weather from './Component/weather';
import "bootstrap/dist/css/bootstrap.min.css"
import 'weather-icons/css/weather-icons.css'

function App() {
  return (
    <div className="App">
      <Weather/>
    </div>
  );
}

export default App;
