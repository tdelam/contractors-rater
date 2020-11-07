import React from 'react';
import AddContractor from '../components/AddContractor';
import ContractorList from '../components/ContractorList';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      <Header />
      <AddContractor />
      <ContractorList />
    </>
  )
}

export default Home;
