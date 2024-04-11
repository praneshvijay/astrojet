// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import {Navigate } from "react-router-dom";

// const FlightSearch = () => {
//     const [airport, setAirport] = useState([]);
//     const [redirect, setRedirect] = useState(false);
//     const [details, setDetails] = useState({});

//     useEffect(() => {   
//         const fetchAirports = async () => {
//             try {   
//                 const response = await fetch('/api/airports');  
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch airports');
//                 }
//                 const airports = await response.json();
//                 setAirport(airports);
//             } catch (error) {
//                 console.error('Error fetching airports:', error.message);
//             }
//         };  
//         fetchAirports();
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const from = e.target.from.value;
//         const to = e.target.to.value;
//         const option = e.target.option.value;
//         const adults = parseInt(e.target.adults.value);
//         const children = parseInt(e.target.children.value);
//         const infants = parseInt(e.target.infants.value);
//         const passengers = adults + children + infants;
//         const date = e.target.departure.value;
//         //Date to day
//         const day = new Date(date).getDay();
//         const clas = e.target.class.value;
//         const returndate = e.target.return.value;
//         const data = {
//             from: from,
//             to: to,
//             option: option,
//             passengers: passengers,
//             date: date,
//             returndate: returndate,
//             class: clas,
//             adults: adults,
//             children: children,
//             infants: infants,
//             day: day,
//         };
        
//         const now = new Date();
//         if (date === "" || from === "" || to === "" || from === to) {
//             alert("Invalid Date or source or destination");
//         } else {
//             const date1 = new Date(date);
//             if (date1 < now) {
//                 alert("Invalid Date");
//             } else if (option === "round-trip") {
//                 if (returndate === "") {
//                     alert("Invalid Date");
//                 } else {
//                     const date2 = new Date(returndate);
//                     if (date2 < now || date1 > date2) {
//                         alert("Invalid Date");
//                     } else {
//                         setDetails(data);
//                         setRedirect(true);
//                     }
//                 }
//             } else {
//                 setDetails(data);
//                 setRedirect(true);
//             }
//         }
//     };

//     const retur = () => {
//         document.getElementById("return").disabled = false;
//     };

//     const retu = () => {
//         document.getElementById("return").disabled = true;
//     };

//     return ( 
//         <div className="FlightSearch">
//             { redirect && <Navigate to={{ pathname: "/flights", state: details }} /> }
//             <div className="wrapper">
//                 <form className="form" onSubmit={handleSubmit}>
//                     <h2 className="title">Search Flights</h2>
//                     <div className="options">
//                         <input
//                             type="radio"
//                             name="option"
//                             id="one"
//                             value="one-way"
//                             defaultChecked
//                             onClick={retu}
//                         />
//                         <label>One Way</label>
//                         <input
//                             type="radio"
//                             name="option"
//                             id="round"
//                             value="round-trip"
//                             onClick={retur}
//                         />
//                         <label>Round Trip</label>
//                         <div className="class-type">
//                             <label className="class">Class</label>
//                             <select className="class" name="class">
//                                 <option value="bc">Business Class</option>
//                                 <option value="ec">Economy Class</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="search-place">
//                         <fieldset className="place">
//                             <legend>From</legend>
//                             <div className="textbox">
//                                 <Select
//                                     className="textbox"
//                                     placeholder="City or Airport"
//                                     options={airport}
//                                     getOptionLabel={(option) =>
//                                         option.cityname + "(" + option.code + ")"
//                                     }
//                                     getOptionValue={(option) => option.cityname}
//                                     isSearchable={true}
//                                     isClearable={true}
//                                     isLoading={airport.length === 0}
//                                     name="from"
//                                 />
//                             </div>
//                         </fieldset>
//                         <fieldset className="place">
//                             <legend>To</legend>
//                             <Select
//                                 className="textbox"
//                                 placeholder="City or Airport"
//                                 options={
//                                     airport.length
//                                     ? airport
//                                     : [{ city: "Loading", code: "Loading" }]
//                                 }
//                                 getOptionLabel={(option) => option.cityname + "(" + option.code + ")"}
//                                 getOptionValue={(option) => option.cityname}
//                                 isSearchable={true}
//                                 isClearable={true}
//                                 isLoading={airport.length === 0}
//                                 name="to"
//                             />
//                         </fieldset>
//                         <div className="choose-time">
//                             <div className="time">
//                                 <label className="time-header">Departure</label>
//                                 <input
//                                     type="date"
//                                     placeholder="Departure Date"
//                                     className="date"
//                                     name="departure"
//                                 />
//                             </div>
//                             <div className="time">
//                                 <label className="time-header">Arrival</label>
//                                 <input
//                                     type="date"
//                                     placeholder="Return Date"
//                                     id="return"
//                                     className="date"
//                                     name="return"
//                                     disabled
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="age">
//                         <div className="adults-age">
//                             <label className="adults">Adults</label>
//                             <select className="adults" name="adults">
//                                 {[...Array(6)].map((_, i) => (
//                                     <option key={i} value={i + 1}>{i + 1}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="children-age">
//                             <label className="children">Children</label>
//                             <select className="children" name="children">
//                                 {[...Array(5)].map((_, i) => (
//                                     <option key={i} value={i}>{i}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="infants-age">
//                             <label className="infants">Infants</label>
//                             <select className="infants" name="infants">
//                                 {[...Array(5)].map((_, i) => (
//                                     <option key={i} value={i}>{i}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <button className="search-button" type="submit">
//                             Show Available Flights
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default FlightSearch;

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Navigate } from "react-router-dom";

const FlightSearch = () => {
    const [airport, setAirport] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [details, setDetails] = useState({});

    useEffect(() => {   
        const fetchAirports = async () => {
            try {   
                const response = await fetch('/api/airports');  
                if (!response.ok) {
                    throw new Error('Failed to fetch airports');
                }
                const airports = await response.json();
                setAirport(airports);
            } catch (error) {
                console.error('Error fetching airports:', error.message);
            }
        };  
        fetchAirports();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const from = e.target.from.value;
        const to = e.target.to.value;
        const option = e.target.option.value;
        const adults = parseInt(e.target.adults.value);
        const children = parseInt(e.target.children.value);
        const infants = parseInt(e.target.infants.value);
        const passengers = adults + children + infants;
        const date = e.target.departure.value;
        //Date to day
        const day = new Date(date).getDay();
        const clas = e.target.class.value;
        const returndate = e.target.return.value;
        const returnday = new Date(returndate).getDay();
        let depcode;
        let arrcode;
        if(from) depcode  = airport.find((option) => option.cityname === from).code;
        if(to) arrcode  = airport.find((option) => option.cityname === to).code;
        const data = {
            from: from,
            to: to,
            option: option,
            passengers: passengers,
            date: date,
            returndate: returndate,
            class: clas,
            adults: adults,
            children: children,
            infants: infants,
            day: day,
            returnday: returnday, 
            depcode: depcode,
            arrcode: arrcode,
        };
        
        const now = new Date();
        if (date === "" || from === "" || to === "" || from === to) {
            alert("Invalid Date or source or destination");
        } else {
            const date1 = new Date(date);
            if (date1 < now) {
                alert("Invalid Date");
            } else if (option === "round-trip") {
                if (returndate === "") {
                    alert("Invalid Date");
                } else {
                    const date2 = new Date(returndate);
                    if (date2 < now || date1 > date2) {
                        alert("Invalid Date");
                    } else {
                        setDetails(data);
                        setRedirect(true);
                    }
                }
            } else {
                setDetails(data);
                setRedirect(true);
            }
        }
    };

    const retur = () => {
        document.getElementById("return").disabled = false;
    };

    const retu = () => {
        document.getElementById("return").disabled = true;
    };

    return ( 
        <div className="FlightSearch">
            {redirect && <Navigate to="/flights"  state={details}/>}
            <div className="wrapper">
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="title">Search Flights</h2>
                    <div className="options">
                        <input
                            type="radio"
                            name="option"
                            id="one"
                            value="one-way"
                            defaultChecked
                            onClick={retu}
                        />
                        <label>One Way</label>
                        <input
                            type="radio"
                            name="option"
                            id="round"
                            value="round-trip"
                            onClick={retur}
                        />
                        <label>Round Trip</label>
                        <div className="class-type">
                            <label className="class"></label>
                            <div className = "space"></div>
                            <select className="class" name="class">
                                <option value="bc">Business Class</option>
                                <option value="ec">Economy Class</option>
                            </select>
                        </div>
                        <div className="adults-age">
                            <label className="adults">Adults</label>
                            <select className="adults" name="adults">
                                {[...Array(6)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="children-age">
                            <label className="children">Children</label>
                            <select className="children" name="children">
                                {[...Array(5)].map((_, i) => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </div>
                        <div className="infants-age">
                            <label className="infants">Infants</label>
                            <select className="infants" name="infants">
                                {[...Array(5)].map((_, i) => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="search-place">
                        <fieldset className="place">
                            <legend>From</legend>
                            <div className="textbox">
                                <Select
                                    className="textbox"
                                    placeholder="City"
                                    options={airport}
                                    getOptionLabel={(option) =>
                                        option.cityname + "(" + option.code + ")"
                                    }
                                    getOptionValue={(option) => option.cityname}
                                    isSearchable={true}
                                    isClearable={true}
                                    isLoading={airport.length === 0}
                                    name="from"
                                    defaultValue={airport.find((option) => option.cityname === "Delhi")}
                                />
                            </div>
                        </fieldset>
                        <fieldset className="place">
                            <legend>To</legend>
                            <Select
                                className="textbox"
                                placeholder="City"
                                options={
                                    airport.length
                                    ? airport
                                    : [{ city: "Loading", code: "Loading" }]
                                }
                                getOptionLabel={(option) => option.cityname + "(" + option.code + ")"}
                                getOptionValue={(option) => option.cityname}
                                isSearchable={true}
                                isClearable={true}
                                isLoading={airport.length === 0}
                                name="to"
                            />
                        </fieldset>
                        <div className="space"></div>
                        <div className="choose-time">
                            <div className="time">
                                <label className="time-header">Departure</label>
                                <input
                                    type="date"
                                    placeholder="Departure Date"
                                    className="date"
                                    name="departure"
                                />
                            </div>
                            <div className="time">
                                <label className="time-header">Arrival</label>
                                <input
                                    type="date"
                                    placeholder="Return Date"
                                    id="return"
                                    className="date"
                                    name="return"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="space"></div>
                        <button className="search-button" type="submit">
                        Search
                    </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default FlightSearch;
