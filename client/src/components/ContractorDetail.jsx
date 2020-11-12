import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContractorsAPI from "../apis/ContractorsAPI";
import { ContractorsContext } from "../context/ContractorsContext";
import Reviews from "./Reviews";
import StarRating from "./StarRating";
import AddReview from "./AddReview";

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
        setSelectedContractor(response.data);
      } catch (err) {
        setError(`${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {selectedContractor && (
        <>
          <h1 className="font-weight-light text-center display-3 mt-5 mb-5">
            {selectedContractor.contractor.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedContractor.contractor.average_rating} />
            <span className="text-warning ml-1">
              {selectedContractor.contractor.count
                ? `(${selectedContractor.contractor.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedContractor.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </>
  );
};

export default ContractorDetail;
