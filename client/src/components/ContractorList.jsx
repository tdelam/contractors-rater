import React from 'react'

const ContractorList = () => {
  return (
    <div className="list-group">
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
          <tr>
            <td>
              Acme Inc.
            </td>
            <td>Toronto</td>
            <td>$$</td>
            <td>Rating</td>
            <td><button className="btn btn-warning">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>
          <tr>
            <td>
              Acme Inc.
            </td>
            <td>Toronto</td>
            <td>$$</td>
            <td>Rating</td>
            <td><button className="btn btn-warning">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>

          <tr>
            <td>
              Acme Inc.
            </td>
            <td>Toronto</td>
            <td>$$</td>
            <td>Rating</td>
            <td><button className="btn btn-warning">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ContractorList
