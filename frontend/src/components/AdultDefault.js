import React, { useState } from "react";
import "./Book.css";

export default function AdultDefault() {
  const [user, setUser] = useState([]);
  const [adult, setAdult] = React.useState({
    fname: "",
    lname: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    firstTimeFlier: "false",
    cowinCertificate: null,
  });
  

  if(user.length === 0){
    let user1 = localStorage.getItem("user");
    console.log(user1);
    let email = user1.split('"')[3];
    console.log(email);
    const fetchUserDetails = async () => {
      try {   
        const response = await fetch(`/api/user/getuser/${email}`);  
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const user = await response.json();
        setUser(user);
        setAdult(
          {
            fname: user.firstName,
            lname: user.lastName,
            dob: "",
            gender: "",
            email: user.email,
            phone: user.phoneNo,
            firstTimeFlier: "",
            cowinCertificate: null,
          }
        )
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };
    fetchUserDetails();
  }

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
    <div className="adult">
      <div className="col1">
        <div className="name-input">
          <div className="dadult-fname">
          <input
            type="text"
            name="fname"
            value={adult.fname}
            onChange={HandleChange}
            className="dadult-fname"
            required
            placeholder="First Name "
          /></div>
          <div className="space"></div>
          <div className="dadult-lname">
          <input
            type="text"
            name="lname"
            value={adult.lname}
            onChange={HandleChange}
            className="dadult-lname"
            required
            placeholder="Last Name"
            defaultValue={user.lastName}
          /></div>
        </div>
      </div>
      <div className="col-3">
        <div className="dadult-email">
          <input
            type="text"
            name="email"
            value={adult.email}
            className="dadult-email"
            onChange={HandleChange}
            placeholder="Email"
          /></div>
          <div className="space"></div>
          <div className="space"></div>
          <div className="dadult-phone">
          <input
            type="text"
            name="phone"
            value={adult.phone}
            className="dadult-phone"
            onChange={HandleChange}
            placeholder="Phone No"
          /></div>
      </div> 
      <div className="col2">
        <div className="dadult-gender">
        <div className="gender-input">
          <label className="class">Gender</label>
          <select className="dadult-gender" name = "gender" onChange={HandleChange} value={adult.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div></div>
        <div className="space"></div>
        <div className="space"></div>
        <div className="dadult-dob">
        <div className="dob-input">
          <label>DOB</label>
          <input
            type="date"
            name="dob"
            value={adult.dob}
            onChange={HandleChange}
            className="dadult-dob"
            required
          />
        </div></div>
          <div className="checkbox">
          <div className="dadult-firstTimeFlier">
            <label>First Time Flier</label>
            <input
              type="checkbox"
              name="firstTimeFlier"
              className="dadult-firstTimeFlier"
              value={adult.firstTimeFlier}
              onChange={HandleChange}
            />
        </div></div>
      </div>
      <div className="cowin">
        <div className="dadult-cowinCertificate">
          <label>Cowin Certificate (only in .jpeg/.png format) </label>
          <br></br>
          <input
            type="file"
            name="cowinCertificate"
            className="dadult-cowinCertificate"
            onChange={HandleChange}
            accept=".jpeg,.png"
            required
          />
        </div>
      </div>
    </div>
  );
}
