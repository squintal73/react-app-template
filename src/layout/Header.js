// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Para navegação entre páginas

const Header = () => {
  return (
    <header style={styles.header}>
      <nav>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/empresa" style={styles.link}>Empresa</Link>
        <Link to="/carrossel" style={styles.link}>Carrossel</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
  },
  link: {
    color: '#fff',
    margin: '0 10px',
    textDecoration: 'none',
  },
};

export default Header;