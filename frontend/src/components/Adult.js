import React, { useState } from "react";
import "./Book.css";

export default function Adult() {
  const [adult, setAdult] = React.useState({
    fname: "",
    lname: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    firstTimeFlier: "false",
    cowinCertificate: null,
  });

  function HandleChange(event) {
    const { name, value, type, files } = event.target;
    
    setAdult((prevValue) => {
      if (type === "checkbox") {
        return {
          ...prevValue,
          [name]: !prevValue[name],
        };
      } else if (type === "file") {
        console.log(files[0]);
        console.log(files);
        return {
          ...prevValue,
          [name]: files,
        };
      } else {
        return {  
          ...prevValue,
          [name]: value,
        };
      }
    });
  }

  return (
    <form className="adult">
      <div className="col1">
        <div className="name-input">
          <div className="adult-fname">
          <input
            type="text"
            name="fname"
            value={adult.fname}
            onChange={HandleChange}
            className="adult-fname"
            required
            placeholder="First Name"
          /></div>
          <div className="space"></div>
          <div className="adult-lname">
          <input
            type="text"
            name="lname"
            value={adult.lname}
            onChange={HandleChange}
            className="adult-lname"
            required
            placeholder="Last Name"
          /></div>
        </div>
      </div>
      <div className="col-3">
        <div className="adult-email">
          <input
            type="text"
            name="email"
            value={adult.email}
            className="adult-email"
            onChange={HandleChange}
            placeholder="Email"
          /></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="adult-phone">
          <input
            type="text"
            name="phone"
            value={adult.phone}
            className="adult-phone"
            onChange={HandleChange}
            placeholder="Phone No"
          /></div>
      </div> 
      <div className="col2">
        <div className="adult-gender">
        <div className="gender-input">
          <label className="class">Gender</label>
          <select className="adult-gender" name = "gender" onChange={HandleChange} value={adult.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div></div>
        <div className="space"></div>
        <div className="space"></div>
        <div className="adult-dob">
        <div className="dob-input">
          <label>DOB</label>
          <input
            type="date"
            name="dob"
            value={adult.dob}
            onChange={HandleChange}
            className="adult-dob"
            required
          />
        </div></div>
          <div className="checkbox">
          <div className="adult-firstTimeFlier">
            <label>First Time Flier</label>
            <input
              type="checkbox"
              name="firstTimeFlier"
              className="adult-firstTimeFlier"
              value={adult.firstTimeFlier}
              onChange={HandleChange}
            />
        </div></div>
      </div>
      <div className="cowin">
        <div className="adult-cowinCertificate">
          <label>Cowin Certificate (only in .jpeg/.png format) </label>
          <br></br>
          <input
            type="file"
            name="cowinCertificate"
            className="adult-cowinCertificate"
            onChange={HandleChange}
            accept=".jpeg,.png"
            required
          />
        </div>
      </div>
    </form>
  );
}
