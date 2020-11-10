import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContractorsAPI from "../apis/ContractorsAPI";
import { ContractorsContext } from "../context/ContractorsContext";
import Reviews from "./Reviews";
import StarRating from "./StarRating";

const ContractorDetail = () => {
  const { id } = useParams();
  const { selectedContractor, setSelectedContractor } = useContext(
    ContractorsContext
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ContractorsAPI.get(`/${id}`);
        setSelectedContractor(response.data.contractor);
      } catch (err) {
        setError(`${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {selectedContractor && (
        <>
          <div className="mt-3">
            <Reviews />
          </div>
        </>
      )}
    </div>
  );
};

export default ContractorDetail;
