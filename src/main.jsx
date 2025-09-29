import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppA from './AppA.jsx';
import './index.css'
import { StyledEngineProvider } from '@mui/joy/styles';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <AppA/>
    </StyledEngineProvider>
  </StrictMode>
);