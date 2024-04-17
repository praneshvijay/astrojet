// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const Payment = () => {
//     const location = useLocation();
//     const [dataf, setDataf] = useState(location.state);
//     const [stripePromise, setStripePromise] = useState(null);
//     const [clientSecret, setClientSecret] = useState("");

//     return (  
//         <h2>Payment Box</h2>
//     );
// }
 
// export default Payment;

import React from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const [dataf] = React.useState(location.state);
    const [bookstatus, setBookstatus] = React.useState(false);
    console.log(dataf);
    const option = dataf.Details.details.option;
    const flightId = dataf.Details.flightid;
    const flightId1 = dataf.Details.flightid1;
    const objectId = dataf.Details.objectId;
    const objectId1 = dataf.Details.objectId1;
    const clas = dataf.Details.details.class;
    const adults = dataf.Details.details.adults;
    const children = dataf.Details.details.children;
    const infants = dataf.Details.details.infants;
    const depcode = dataf.Details.details.depcode;
    const arrcode = dataf.Details.details.arrcode;
    let classd;
    if (clas === "bc") {
        classd = "Business";
    } else {
        classd = "Economy";
    }
    let user1 = localStorage.getItem("user");
    console.log(user1);
    let email = user1.split('"')[3];

    const book = async() => {
        if(bookstatus) return;
        const booking = {
            user_email: email,
            option: dataf.Details.details.option,
            flight1: flightId,
            flight2: flightId1,
            flight1_id: objectId,
            flight2_id: objectId1,
            date: dataf.Details.details.date,
            return_date: dataf.Details.details.returndate,
            from: dataf.Details.details.from,
            to: dataf.Details.details.to,
            depcode: depcode,
            arrcode: arrcode,
            class: clas,
            fare:dataf.fare,
            discount:dataf.discount,
            passengers: { 
                adults: dataf.adult,
                children: dataf.child,
                infants: dataf.infant,
            }
        }

        // console.log(booking);
        try{
            const response = await fetch('/api/user/addbooking', {
                method: 'POST',
                body: JSON.stringify(booking),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if(response.ok){
                setBookstatus(true);
            }
            else{
                console.log("Error");
            }
        }
        catch(error){
            console.log(error);
        }
    }
    const handleClick = async() => {
        await book();
        let items = []
        let option;
        if(dataf.Details.details.option==="one-way"){
            option = "one-way";
            items = [
                {
                    id: objectId,
                    class: clas,
                    adults: adults,
                    children: children,
                    infants: infants,
                }
            ]
        } else {
            option = "round-trip";
            items = [
                {
                    id: objectId,
                    class: clas,
                    adults: adults,
                    children: children,
                    infants: infants,
                },
                {
                    id: objectId1,
                    class: clas,
                    adults: adults,
                    children: children,
                    infants: infants,
                }
            ]
        }
        fetch("/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items, option, discount: dataf.discount
        }),
        })
        .then(res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        })
        .then(({ url }) => {
            console.log(url)
            window.location = url;
        })
        .catch(e => {
            console.error(e.error);
        });
    };

    return (
        <div>
        <h1>Review Journey Details</h1>
        {option === "one-way" ?
        <div className='passenger-list'>
            <div>
                <h3>Departing Flight</h3>
                <table>
                    <tr>
                        <th>Flight ID</th>
                        <th>Class</th>
                        <th>Adults</th>
                        <th>Children</th>
                        <th>Infants</th>
                        <th>Departure Code</th>
                        <th>Arrival Code</th>
                    </tr>
                    <tr>
                        <td>{flightId}</td>
                        <td>{classd}</td>
                        <td>{adults}</td>
                        <td>{children}</td>
                        <td>{infants}</td>
                        <td>{depcode}</td>
                        <td>{arrcode}</td>
                    </tr>
                </table>
            </div>
        </div>  
        :
        <div>
            <h3>Departing Flight</h3>
            <p>Flight ID: {flightId}</p>
            <p>Class: {clas}</p>
            <p>Adults: {adults}</p>
            <p>Children: {children}</p>
            <p>Infants: {infants}</p>
            <p>Departure Code: {depcode}</p>
            <p>Arrival Code: {arrcode}</p>
            <h3>Return Flight</h3>
            <p>Flight ID: {flightId1}</p>
            <p>Class: {clas}</p>
            <p>Adults: {adults}</p>
            <p>Children: {children}</p>
            <p>Infants: {infants}</p>
            <p>Departure Code: {depcode}</p>
            <p>Arrival Code: {arrcode}</p>
        </div> 
        }
        <button className="submit-button" onClick={handleClick}>Checkout</button>
        </div>
    );
};

export default Payment;