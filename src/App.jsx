import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameOne from './pages/GameOne/GameOne';
import GameTwo from './pages/GameTwo/GameTwo';
import InitApp from './pages/InitApp/InitApp';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<InitApp />} />
          <Route path='/gameone' element={<GameOne />} />
          <Route path='/gametwo' element={<GameTwo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
