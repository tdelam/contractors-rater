import React, { useState, createContext } from 'react';

export const ContractorsContext = createContext();

export const ContractorsContextProvider = props => {
  const [contractors, setContractors] = useState([]);

  return (
    <ContractorsContext.Provider value={{contractors, setContractors}}>
      {props.children}
    </ContractorsContext.Provider>
  )
}
