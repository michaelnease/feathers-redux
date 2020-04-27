import React from 'react';
import Header from '../components/Header';
import Users from '../components/Users';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <Users />
      </main>
    </div>
  );
};

export default Home;
