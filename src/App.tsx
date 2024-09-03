import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Formulaire from './Formulaire';
import Formul from './Formul';
import './App.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === '/' && <h1>Formulaire</h1>}
      <Routes>
        <Route path="/" element={<Formulaire />} />
        <Route path="/Formul" element={<Formul />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
