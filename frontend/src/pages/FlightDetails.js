import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Placemodify from "../components/PlaceModify";
import { Navigate } from "react-router-dom";
import Plane from "../components/Planes.js";
import Plane1 from "../components/Planes1.js";
import Plane2 from "../components/Planes2.js";

export const detcontext = React.createContext();
export const det1context = React.createContext();

const FlightDetails = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState(location.state);
    // console.log(details);
    const [data, setData] = React.useState([]);
    const [det1, setDet1] = React.useState({});
    const [det2, setDet2] = React.useState({});
    const [redirect, setRedirect] = React.useState(false);

    function formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = date.getDate();
      let daySuffix = 'th';
    
      if (day === 1 || day === 21 || day === 31) {
        daySuffix = 'st';
      } else if (day === 2 || day === 22) {
        daySuffix = 'nd';
      } else if (day === 3 || day === 23) {
        daySuffix = 'rd';
      }
    
      const options = { month: 'short', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
    
      return `${day}${daySuffix}, ${formattedDate}`;
    }

    useEffect(() => {
        setLoading(true);   
        const fetchFlights = async () => {
            if(details.option === "one-way"){
                try {   
                  const response = await fetch(`/api/flightsearch/${details.from}/${details.to}/${details.day}`);  
                  if (!response.ok) {
                      throw new Error('Failed to fetch flights');
                  }
                  const data = await response.json();
                  setData(data);
                  setLoading(false);
                  console.log(data);
              } catch (error) {
                  console.error('Error fetching airports:', error.message);
              }
            }
            else{
                try {   
                  const response = await fetch(`/api/roundflightsearch/${details.from}/${details.to}/${details.day}/${details.returnday}`);  
                  if (!response.ok) {
                      throw new Error('Failed to fetch flights');
                  }
                  const data = await response.json();
                  setData(data);
                  setLoading(false);
                  console.log(data);
              } catch (error) {
                  console.error('Error fetching airports:', error.message);
              }
              
            }
        };  
        fetchFlights();
    }, [details]);
    
    if (loading) {
      return (
        <div className="loading">
          <h1>Searching for your best rides...</h1>
        </div>
      );
    }
    const fodate = formatDate(details.date);
    const fordate = formatDate(details.returndate);
    if (details.option !== "one-way") {
        const HandleBook = (e) => {
          if (det1.id === undefined || det2.id === undefined) {
            alert("Select a flight for both the journeys");
          } else {
            setRedirect(true);
          }
        };
        if (redirect) {
          // console.log(details);
          // console.log(det1.id);
          // console.log(det2.id);
          const state = {
            details: details,
            flightid: det1.flightid,
            flightid1: det2.flightid,
            duration: det1.duration + det2.duration,
            fare: det1.ticketfare + det2.ticketfare,
            arrives: det1.arrival,
            departs: det1.departure,
            arrives1: det2.arrival,
            departs1: det2.departure,
            objectId: det1.id,
            objectId1: det2.id,
          };
          console.log(state);
          return <Navigate to="/book" state={state} />;
        }
        return (
          <>
            <div>
              <detcontext.Provider value={{ details, setDetails }}>
                <Placemodify />
              </detcontext.Provider>
            </div>
              <div className="flights">
                <h1 className="flights-header">Available Flights</h1>
                <div className="details-top">
                  <h3 className="flight-name">Departing Flight</h3>
                  <h3 className="trip">{details.from} - {details.to}</h3>
                  <h3 className="date">{fodate}</h3>
                  <h3 className="class">{(details.class === "bc")?"Business Class":"Economy Class"}</h3>
                  <h3 className="passengers">Passengers: {details.passengers}</h3>
                </div>
                {(data.flight1&&data.flight2&&data.flight1.length && data.flight2.length) ? (
                    <det1context.Provider value={{ det1, setDet1, det2, setDet2 }}>
                      {data.flight1.map((available) => {
                        return (
                          <Plane1
                            details={details}
                            flightid={available.flightid}
                            arrival={available.arrival}
                            departure={available.departure}
                            ticketfare={ (details.class === "ec") ? available.ec_ticket : available.bs_ticket }
                            id={available._id}
                          />
                        );
                      })}
                      <div className="details-top">
                        <h3 className="flight-name">Returning Flight</h3>
                        <h3 className="trip">{details.to} - {details.from}</h3>
                        <h3 className="date">{fordate}</h3>
                        <h3 className="class">{(details.class === "bc")?"Business Class":"Economy Class"}</h3>
                        <h3 className="passengers">Passengers: {details.passengers}</h3>
                      </div>
                      {data.flight2.map((available) => {
                        return (
                          <Plane2
                            details={details}
                            flightid={available.flightid}
                            arrival={available.arrival}
                            departure={available.departure}
                            ticketfare={ details.class === "ec" ? available.ec_ticket : available.bs_ticket }
                            id={available._id}
                          />
                        );
                      })}
                      <button className="book-button" onClick={HandleBook}>
                        Book
                      </button>
                    </det1context.Provider>)
                      :
                      ( 
                        <h1 className="no-available">
                          No flights available. Sorry for the inconvenience.
                        </h1>
                      )
                    }
              </div>
            
          </>
        );
    }
    return (
      <>
        <div>
          <detcontext.Provider value={{ details, setDetails }}>
            <Placemodify />
          </detcontext.Provider>
        </div>
        <div className="flights">
          <h1 className="flights-header">Available Flights</h1>
          <div className="details-top">
              <h3 className="flight-name">Departing Flight</h3>
              <h3 className="trip">{details.from} - {details.to}</h3>
              <h3 className="date">{fodate}</h3>
              <h3 className="class">{(details.class === "bc")?"Business Class":"Economy Class"}</h3>
              <h3 className="passengers">Passengers: {details.passengers}</h3>
            </div>
          {data.length ? (
            data.map((available) => {
            return (
              <Plane
                details={details}
                flightid={available.flightid}
                arrival={available.arrival}
                departure={available.departure}
                ticketfare={(details.class === "ec" ) ? available.ec_ticket : available.bs_ticket}
                id={available._id}
              />
            );
          })
        ) : (
          <h1 className="no-available">
            No flights available. Sorry for the inconvenience.
          </h1>
        )}
      </div>
      
    </>
  );
}
 
export default FlightDetails;