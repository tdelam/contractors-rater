import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContractorsAPI from "../apis/ContractorsAPI";
import { ContractorsContext } from "../context/ContractorsContext";

const ContractorDetail = () => {
  const { id } = useParams();
  const {selectedContractor, setSelectedContractor} = useContext(ContractorsContext);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ContractorsAPI.get(`/${id}`)
        setSelectedContractor(response.data.contractor)
      } catch (err) {
        setError(`${err}`)
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>{selectedContractor && selectedContractor.name}</h1>
    </div>
  )
};

export default ContractorDetail;
