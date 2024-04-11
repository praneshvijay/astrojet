import "./Placemodify.css";
import React from "react";
import { useState, useEffect } from "react";
import { detcontext } from "../pages/FlightDetails.js";
import { useContext } from "react";
import Select from "react-select";

const PlaceModify = () => {
    const [airport, setAirport] = useState([]);
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

    const { details, setDetails } = useContext(detcontext);
    let from;
    // console.log(from);
    let to;
    let option;
    let adults;
    let children;
    let infants;
    let passengers;
    let date;
    let clas;
    let returndate;
    function Handlesub(e) {
        e.preventDefault();
        from = e.target.from.value;
        to = e.target.to.value;
        option = e.target.option.value;
        adults = parseInt(e.target.adults.value);
        children = parseInt(e.target.children.value);
        infants = parseInt(e.target.infants.value);
        passengers = adults + children + infants;
        date = e.target.departure.value;
        clas = e.target.class.value;
        returndate = e.target.return.value;
        const day = new Date(date).getDay();
        const returnday = new Date(returndate).getDay();
        let depcode;
        let arrcode;
        if(from) depcode = airport.find((airport) => airport.cityname === from).code;
        if(to) arrcode = airport.find((airport) => airport.cityname === to).code;
        const datas = {
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
        if (date === "" || from === "" || to === "" || from === to || returndate === "") {
        alert("Invalid Date or source or destination");
        } else {
            const date1 = new Date(date);
            if (date1 < now) {
                alert("Invalid Date");
            } else if (option === "round-trip") {
                const date2 = new Date(returndate);
                if (date2 < now) {
                alert("Invalid Date");
                } else if (date1 > date2) {
                alert("Invalid Date");
                } else {
                setDetails(datas);
                }
            } else {
                setDetails(datas);
            }
        }
    }
    if(details.option === "round-trip") {const element = document.getElementById("remod");
    if (element) {
        element.disabled = false;
    }}
    const retur = () => {
        document.getElementById("remod").disabled = false;
      };
      const retu = () => {
        document.getElementById("remod").disabled = true;
      };
      return (
        // <div className="place-modify">
        //   <form className="place-modify-form" onSubmit={Handlesub}>
        //     <div className="optionsmod">
        //       <div className="way">
        //         <input
        //           type="radio"
        //           name="option"
        //           id="one"
        //           value="one-way"
        //           defaultChecked
        //           onClick={retu}
        //         />
        //         <label>One Way</label>
        //         <input
        //           type="radio"
        //           name="option"
        //           id="round"
        //           value="round-trip"
        //           onClick={retur}
        //         />
        //         <label>Round Trip</label>
        //       </div>
        //       <div className="agemod">
        //         <div className="adults-age">
        //           <label className="adults">Adults</label>
        //           <select className="adults" name="adults" id="admod">
        //             <option value="1">1</option>
        //             <option value="2">2</option>
        //             <option value="3">3</option>
        //             <option value="4">4</option>
        //             <option value="5">5</option>
        //             <option value="6">6</option>
        //           </select>
        //         </div>
        //         <div className="children-age">
        //           <label className="children">Children</label>
        //           <select className="children" name="children" id="chmod">
        //             <option value="0">0</option>
        //             <option value="1">1</option>
        //             <option value="2">2</option>
        //             <option value="3">3</option>
        //             <option value="4">4</option>
        //           </select>
        //         </div>
        //         <div className="infants-age">
        //           <label className="infants">Infants</label>
        //           <select className="infants" name="infants" id="ifmod">
        //             <option value="0">0</option>
        //             <option value="1">1</option>
        //             <option value="2">2</option>
        //             <option value="3">3</option>
        //             <option value="4">4</option>
        //           </select>
        //         </div>
        //         <div className="class-type">
        //           <label className="class">Class</label>
        //           <select className="class" name="class" id="clmod">
        //             <option value="bc">Business Class</option>
        //             <option value="ec">Economy Class</option>
        //           </select>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="dateplace">
        //       <div className="search-place">
        //         <fieldset className="place">
        //           <legend>From</legend>
        //           <div className="textbox">
        //             <Select
        //               className="textbox"
        //               placeholder="City or Airport"
        //               options={airport}
        //               getOptionLabel={(option) =>
        //                 option.city + "(" + option.code + ")"
        //               }
        //               getOptionValue={(option) => option.city}
        //               isSearchable={true}
        //               isClearable={true}
        //               isLoading={airport.length === 0}
        //               name="from"
        //               id="frmod"
        //             />
        //           </div>
        //         </fieldset>
        //         <fieldset className="place">
        //           <legend>To</legend>
        //           <Select
        //             className="textbox"
        //             placeholder="City or Airport"
        //             options={
        //               airport.length
        //                 ? airport
        //                 : [{ city: "Loading", code: "Loading" }]
        //             }
        //             getOptionLabel={(option) =>
        //               option.city + "(" + option.code + ")"
        //             }
        //             getOptionValue={(option) => option.city}
        //             isSearchable={true}
        //             isClearable={true}
        //             isLoading={airport.length === 0}
        //             name="to"
        //             id="tomod"
        //           />
        //         </fieldset>
        //         <div className="choose-timemod">
        //           <div className="time">
        //             <label className="time-header">Departure</label>
        //             <input
        //               type="date"
        //               placeholder="Departure Date"
        //               className="date"
        //               name="departure"
        //               id="demod"
        //             />
        //           </div>
        //           <div className="time">
        //             <label className="time-header">Arrival</label>
        //             <input
        //               type="date"
        //               placeholder="Return Date"
        //               id="remod"
        //               className="date"
        //               name="return"
        //               disabled
        //             />
        //           </div>
        //         </div>
        //       </div>
        //       <div className="modify">
        //         <button className="modify-button" type="submit">
        //           Modify
        //         </button>
        //       </div>
        //     </div>
        //   </form>
        // </div>
        <div className="FlightSearch">
            <div className="wrapper">
                <form className="form" onSubmit={Handlesub}>
                    <h2 className="title">Search Flights</h2>
                    <div className="options">
                        <input
                            type="radio"
                            name="option"
                            id="one"
                            value="one-way"
                            onClick={retu}
                            defaultChecked = {details.option === "one-way"}
                        />
                        <label>One Way</label>
                        <input
                            type="radio"
                            name="option"
                            id="round"
                            value="round-trip"
                            onClick={retur}
                            defaultChecked = {details.option === "round-trip"}
                        />
                        <label>Round Trip</label>
                        <div className="class-type">
                            <label className="class"></label>
                            <div className = "space"></div>
                            <select className="class" name="class">
                                <option value="bc">Business Class</option>
                                <option value="ec" selected = {details.class === "ec"}>Economy Class</option>
                            </select>
                        </div>
                        <div className="adults-age">
                            <label className="adults">Adults</label>
                            <select className="adults" name="adults">
                                {[...Array(6)].map((_, i) => (
                                    <option key={i} value={i + 1} selected = {details.adults === i+1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="children-age">
                            <label className="children">Children</label>
                            <select className="children" name="children">
                                {[...Array(5)].map((_, i) => (
                                    <option key={i} value={i} selected = {details.children === i}>{i}</option>
                                ))}
                            </select>
                        </div>
                        <div className="infants-age">
                            <label className="infants">Infants</label>
                            <select className="infants" name="infants">
                                {[...Array(5)].map((_, i) => (
                                    <option key={i} value={i} selected = {details.infants === i}>{i}</option>
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
                                    id="demod"
                                    defaultValue={details.date}
                                />
                            </div>
                            <div className="time">
                                <label className="time-header">Arrival</label>
                                <input
                                    type="date"
                                    placeholder="Return Date"
                                    id="remod"
                                    className="date"
                                    name="return"
                                    disabled
                                    defaultValue={details.returndate}
                                />
                            </div>
                        </div>
                        <div className="space"></div>
                        <button className="search-button" type="submit">
                        Modify
                    </button>
                    </div>
                    
                </form>
            </div>
        </div>
      );
}
 
export default PlaceModify;