import React from 'react';

export default function TwoWay({flight}) {
    let classType;
    if(flight.class === "ec"){
        classType = "Economy";
    }else{
        classType = "Business Class";
    }

    const date = new Date(flight.date);
    const return_date = new Date(flight.return_date);   
    return(
        <div className='manage-flight'>
            <h3>Round-Trip</h3>
            <div className='two-way-details'>
                <h3>{date.toLocaleDateString()}</h3>
                <h3>{return_date.toLocaleDateString()}</h3>
            </div>
            <div className='two-way-details'>
                <h3>{flight.flight1}</h3>
                <h3>{flight.flight2}</h3>
            </div>
            <h3>{flight.from}</h3>
            <h3>{flight.to}</h3>
            <h3>₹{flight.fare !==undefined && flight.fare.toLocaleString("en-IN")}</h3>
            <h3>{classType}</h3>
        </div>
    );
}