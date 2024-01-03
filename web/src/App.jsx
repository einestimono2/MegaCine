import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import 'swiper/css';
import 'react-tabs/style/react-tabs.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
