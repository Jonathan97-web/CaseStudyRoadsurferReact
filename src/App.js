import logo from './logo.svg';
import {Route, Routes} from "react-router-dom"
import Calendar from "./pages/Calendar"
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/calendar" element={<Calendar />} />

      </Routes>
    </div>
  );
}

export default App;
