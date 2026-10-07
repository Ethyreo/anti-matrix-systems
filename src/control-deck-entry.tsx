import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ControlDeck from './pages/ControlDeck';
import './index.css';
import './signal-type.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ControlDeck />
  </BrowserRouter>
);
