import React, { useState, createContext } from 'react';

export const ContractorsContext = createContext();

export const ContractorsContextProvider = props => {
  const [contractors, setContractors] = useState([]);

  const addContractor = (contractor) => {
    console.log("connn ", contractor);
    setContractors([...contractors, contractor])
  }

  return (
    <ContractorsContext.Provider value={{contractors, setContractors, addContractor}}>
      {props.children}
    </ContractorsContext.Provider>
  )
}
