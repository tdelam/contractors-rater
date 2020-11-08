import React, { useEffect, useContext, useState } from "react";
import ContractorsAPI from "../apis/ContractorsAPI";
import { ContractorsContext } from "../context/ContractorsContext";

const ContractorList = (props) => {
  const { contractors, setContractors } = useContext(ContractorsContext);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ContractorsAPI.get("/");
        setContractors(response.data.contractors);
      } catch (err) {
        setError(`${err}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="list-group">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Contractor/Company</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {contractors &&
            contractors.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.name}</td>
                <td>{contract.location}</td>
                <td>{"$".repeat(contract.price_range)}</td>
                <td>Rating</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractorList;
