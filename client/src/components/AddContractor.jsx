import React, { useState, useContext } from "react";
import ContractorsAPI from "../apis/ContractorsAPI";
import { ContractorsContext } from "../context/ContractorsContext";

const AddContractor = () => {
  const [form, setFormState] = useState({
    name: "",
    location: "",
    priceRange: "",
  });

  const [error, setError] = useState("");

  const { addContractor } = useContext(ContractorsContext);

  const updateField = (e) => {
    setFormState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, location, priceRange } = form;
      const response = await ContractorsAPI.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addContractor(response.data.contractor);
    } catch (err) {
      // set error message for flash error message
      setError(`${err}`);
    }
  };

  return (
    <div className="mb-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              onChange={updateField}
              value={form.name}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              name="location"
              onChange={updateField}
              value={form.location}
            />
          </div>
          <div className="col">
            <select
              className="custom-select my-1 mr-sm-2"
              name="priceRange"
              onChange={updateField}
              value={form.priceRange}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="1">$$$$$</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContractor;
