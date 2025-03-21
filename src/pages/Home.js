// src/pages/Home.js
import React from 'react';
import User from '../components/WithApi';

const Home = () => {
  return (
    <main style={styles.body}>
      <User/>
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

export default Home;