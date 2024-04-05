import logo from './logo.svg';
import {Route, Routes} from "react-router-dom"
import Calendar from "./pages/Calendar"
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
