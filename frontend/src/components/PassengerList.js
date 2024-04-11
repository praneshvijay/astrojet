import React from "react";
import Passenger from "./Person";

export default function PassengerList({ flight }) {
  return (
    <div className="passenger-list">
      <h3>Passenger List</h3>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Age</th>
        </tr>
        {flight.passengers.adults.map((adult) => {
          const birthDate = new Date(adult.dob);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
          }
          console.log(age)
          let gender;
          if(adult.gender === 'male'){
            gender = 'M'
          }
          else{
            gender = 'F'
          }
          return (
            <Passenger
              fname={adult.fname}
              lname={adult.lname}
              gender={gender}
              age={age}
            />
          );
        })}
        {flight.passengers.children.length !== 0 &&
          flight.passengers.children.map((child) => {
            let gender;
            if(child.gender === 'male'){
              gender = 'M'
            }
            else{
              gender = 'F'
            }
            return (
              <Passenger
                fname={child.fname}
                lname={child.lname}
                gender={gender}
                dob={child.dob}
              />
            );
          })}
        {flight.passengers.infants.length !== 0 &&
          flight.passengers.infants.map((infant) => {
            let gender;
            if(infant.gender === 'male'){
              gender = 'M'
            }
            else{
              gender = 'F'
            }
            return (
              <Passenger
                name={infant.fname}
                lname={infant.lname}
                gender={gender}
                dob={infant.dob}
              />
            );
          })}
      </table>
    </div>
  );
}
