import { createRoot } from 'react-dom/client';
import App from './App';
import './locales/index';
import 'ag-grid-community/styles/ag-grid.css';
import './themes/ag-grid/devs-theme.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
