import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    country: "",
    state: "",
    city: "",
    dob: "",
    gender: "",
  });
  // console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const countries = ["Country 1", "Country 2", "Country 3"];
  const statesByCountry = {
    "Country 1": ["State 1A", "State 1B", "State 1C"],
    "Country 2": ["State 2A", "State 2B", "State 2C"],
    "Country 3": ["State 3A", "State 3B", "State 3C"],
  };
  const citiesByState = {
    "State 1A": ["City 1A1", "City 1A2", "City 1A3"],
    "State 1B": ["City 1B1", "City 1B2", "City 1B3"],
  };

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    country: "",
    state: "",
    city: "",
    dob: "",
    gender: "",
  });

  const validations = (name, value, fieldRules = {}) => {
    let error = "";

    if (fieldRules.required && !value.trim()) {
      error = fieldRules.errorMessage;
    }
    if (fieldRules.age || fieldRules.age === "") {
      if (fieldRules.age < 14 || fieldRules.age === "") {
        error = fieldRules.errorMessage;
      }
    }
    return error;
  };

  const getFieldRules = (fieldName) => {
    switch (fieldName) {
      case "email":
        return {
          required: true,
          errorMessage: "Must accept valid email format",
        };
      case "first_name":
        return {
          required: true,
          errorMessage: "Must accept alphabets only",
        };
      case "last_name":
        return {
          required: true,
          errorMessage: "Must accept alphabets only",
        };
      case "gender":
        return {
          required: true,
          errorMessage: "Required",
        };
      case "country":
        return {
          required: true,
          errorMessage: "Please select your country.",
        };
      case "dob":
        return {
          required: true,
          errorMessage: "Must be older than 14 years.",
          age: formData?.age || "",
        };
      case "Age":
        return {
          required: true,
          errorMessage: "Age is Requierd.",
        };
      case "city":
        return {
          required: true,
          errorMessage: "Please select your city.",
        };
      case "state":
        return {
          required: true,
          errorMessage: "Please select your state.",
        };
      default:
        return {};
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFieldsErrors = {};
    Object.keys(formData).forEach((fieldName) => {
      const value = formData[fieldName];
      const fieldRules = getFieldRules(fieldName); // Pass the current step to getFieldRules
      const error = validations(fieldName, value, fieldRules);
      allFieldsErrors[fieldName] = error;
    });
    console.log(allFieldsErrors);
    if (Object.values(allFieldsErrors).every((error) => !error)) {
      const response = await axios.post("http://localhost:8080/", formData);

      if (response) {
        navigate("/user-table");
        return "Register Succesfull";
      } else {
        return response;
      }
    } else {
      setError(allFieldsErrors);
    }
  };
  const handleKeyPress = (e, pattern) => {
    e.target.value = e.target.value.replace(pattern, "");
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 14) {
      alert("Must be older than 14 years.");
      return "";
    } else {
      setError({...error,dob:''})
      return age;
      
    }
  };

  const handleDateChange = (e) => {
    const dob = e.target.value;
    const age = calculateAge(dob);

    setFormData({ ...formData, dob, age });
  };
  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <div className="col">
            <label htmlFor="first_name">
              First Name{<span style={{ color: "red" }}>*</span>}
            </label>
            <input
              className={`form-control ${error.first_name && "is-invalid"}`}
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              onInput={(e) => handleKeyPress(e, /[^A-Za-z\s]/g)}
              pattern="[A-Za-z ]+"
            />
            {error.first_name && (
              <div className="invalid-feedback">{error.first_name}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="last_name">Last Name</label>
            <input
              className={`form-control ${error.last_name && "is-invalid"}`}
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              onInput={(e) => handleKeyPress(e, /[^A-Za-z\s]/g)}
            />
            {error.last_name && (
              <div className="invalid-feedback">{error.last_name}</div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email{<span style={{ color: "red" }}>*</span>}
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <p className="text-danger">{error.email}</p>}
        </div>
        <div className="form-group row">
          <div className="col">
            <label htmlFor="country">
              Country{<span style={{ color: "red" }}>*</span>}
            </label>
            <select
              className={`form-control ${error.country && "is-invalid"}`}
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select a country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {error.country && (
              <div className="invalid-feedback">{error.country}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="state">
              State{<span style={{ color: "red" }}>*</span>}
            </label>
            <select
              className={`form-control ${error.state && "is-invalid"}`}
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={!formData.country}
            >
              <option value="">Select a state</option>
              {statesByCountry[formData.country] &&
                statesByCountry[formData.country].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
            {error.state && (
              <div className="invalid-feedback">{error.state}</div>
            )}
          </div>
        </div>
        <div className="form-group row">
          <div className="col">
            <label htmlFor="city">
              City{<span style={{ color: "red" }}>*</span>}
            </label>
            <select
              className={`form-control ${error.city && "is-invalid"}`}
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
            >
              <option value="">Select a city</option>
              {citiesByState[formData.state] &&
                citiesByState[formData.state].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
            {error.city && <div className="invalid-feedback">{error.city}</div>}
          </div>
          <div className="col"></div>
        </div>
        <div className="form-group row">
          <div className="col">
            <label htmlFor="date">
              Date of Birth{<span style={{ color: "red" }}>*</span>}
            </label>
            <input
              type="date"
              className={`form-control ${error.dob && "is-invalid"}`}
              name="dob"
              value={formData.dob}
              onChange={handleDateChange}
            />
            {error.dob && (
              <div className="invalid-feedback">{error.dob}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="age">
              Age{<span style={{ color: "red" }}>*</span>}
            </label>
            <input
              type="text"
              className={`form-control ${error.age && "is-invalid"}`}
              name="age"
              readOnly
              placeholder="Age"
              value={formData.age}
            />
          </div>
        </div>
        <div className="form-group row">
          <label>Gender:{<span style={{ color: "red" }}>*</span>}</label>
          <div className="col">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
          </div>
          <div className="col">
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default SignUp;
