import React from 'react';

export default function OneWay({flight}) {
    let classType;
    if(flight.class === "ec"){
        classType = "Economy";
    }else {
        classType = "Business Class";
    }

    const date = new Date(flight.date);
    return(
        <div className='manage-flight'>
            <h3>One-Way</h3>
            <h3>{date.toLocaleDateString()}</h3>
            <h3>{flight.flight1}</h3>
            <h3>{flight.from}</h3>
            <h3>{flight.to}</h3>
            <h3>₹{flight.fare !==undefined && flight.fare.toLocaleString("en-IN")}</h3>
            <h3>{classType}</h3>
        </div>
    );
}