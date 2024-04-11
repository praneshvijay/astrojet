import React from "react";

export default function Passenger(props) {
  console.log(props);
  return (
    <tr>
      <td>{props.fname}</td>
      <td>{props.lname}</td>
      <td>{props.gender}</td>
      <td>{props.age}</td>
    </tr>
  );
}
