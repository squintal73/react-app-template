// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Home from './pages/Home';
import Produto from './pages/Produtos';
import Carrossel from './components/Carrossel';
import Footer from './layout/Footer';

const App = () => {
  return (
    <Router>
      <div style={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empresa" element={<Produto />} />
          <Route path="/carrossel" element={<Carrossel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
};

export default App;