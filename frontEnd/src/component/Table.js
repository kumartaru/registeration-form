import React, { useState, useEffect } from "react";
import axios from "axios";
function Table() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      setData(response.data);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h2>Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">age</th>
            <th scope="col">Country</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.country}</td>
              <td>{item.state}</td>
              <td>{item.city}</td>
              <td>{item.dob}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
