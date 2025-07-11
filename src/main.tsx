import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            {/* Marketing campaign routes */}
            <Route path="/criacao-sites" element={<App />} />
            <Route path="/criacao-software" element={<App />} />
            <Route path="/consultoria-ti" element={<App />} />
            <Route path="/migracao-cloud" element={<App />} />
            <Route path="/apps-mobile" element={<App />} />
            <Route path="/solucoes-ecommerce" element={<App />} />
            {/* Blog routes */}
            <Route path="/blog/:id" element={<App />} />
            {/* Home route */}
            <Route path="/*" element={<App />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);