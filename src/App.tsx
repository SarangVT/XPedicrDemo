import './App.css'
import { Route, Routes } from 'react-router-dom';
import EMRForm from './components/EMRForm';

function App () {
  return (
    <Routes>
      <Route path='/' element={<EMRForm/>}/>
    </Routes>
  );
}

export default App
