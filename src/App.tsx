import React from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import BeerList from './routes/BeerList';

import './styles/main.scss';

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<BeerList />} />
    </Routes>
    <Footer />
  </>
);

export default App;
