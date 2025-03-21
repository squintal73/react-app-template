// src/pages/Empresa.js
import React from 'react';
import ListaProdutos from '../components/ListaProdutos';

const Empresa = () => {
  return (
    <main style={styles.body}>
      <ListaProdutos />
    </main>
  );
};

const styles = {
  body: {
    padding: '20px',
    flex: 1,
    textAlign: 'center',
  },
};

export default Empresa;