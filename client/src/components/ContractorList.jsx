import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import ContractorsAPI from "../apis/ContractorsAPI";
import { ContractorsContext } from "../context/ContractorsContext";

const ContractorList = (props) => {
  const { contractors, setContractors } = useContext(ContractorsContext);
  const [error, setError] = useState("");

  let history = useHistory();

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

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await ContractorsAPI.delete(`/${id}`)
      setContractors(contractors.filter(contractor => {
        return contractor.id !== id
      }))
    } catch (err) {
      setError(`${err}`);
    }
  }

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    history.push(`/contractors/${id}/update`)
  }

  const handleSelect = async (id) => {
    history.push(`/contractors/${id}`)
  }

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
            contractors.map((contractor) => (
              <tr onClick={() => handleSelect(contractor.id)} key={contractor.id}>
                <td>{contractor.name}</td>
                <td>{contractor.location}</td>
                <td>{"$".repeat(contractor.price_range)}</td>
                <td>Rating</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={(e) => handleUpdate(e, contractor.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(e, contractor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractorList;
