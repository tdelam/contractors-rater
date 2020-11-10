import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ContractorsAPI from "../apis/ContractorsAPI";

const UpdateContractor = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const [error, setError] = useState("");

  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ContractorsAPI.get(`/${id}`);
        const {
          name,
          location,
          price_range
        } = response.data.contractor;

        setName(name)
        setLocation(location)
        setPriceRange(price_range)
      } catch (err) {
        setError(`${err}`);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ContractorsAPI.put(`/${id}`, {
        name,
        location,
        price_range: priceRange
      })
      history.push("/");
    } catch (err) {
      setError(`${err}`);
    }
  }

  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            className="form-control"
            id="location"
          />
        </div>
        <div className="form-group">
          <select
            className="custom-select my-1 mr-sm-2"
            name="priceRange"
            onChange={(e) => setPriceRange(e.target.value)}
            value={priceRange}
          >
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </>
  );
};

export default UpdateContractor;
