import React, { useState, useEffect } from 'react';

const About = () => {
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
    airport.sort(function (a, b) {
        var x = a.city < b.city ? -1 : 1;
        return x;
    });
    return (
        <div className="about">
            <div className="about-us">
                <h1 className="header">About us</h1>
                <p className="content">
                Of all the books in the world, the best stories are found between the
                pages of passport. We will help you create the best of them.
                </p>
                <p className="content">
                We are a team of travel enthusiasts who want to make your travel
                experience as smooth as possible. We are here to help you find the
                best flight deals and to make your travel experience as smooth as
                possible.
                </p>
            </div>
            <h2 className="services">Our Services:</h2>
            <p className="services-text">We operate in the following airports</p>
            <ul className="service-list">
                {airport.map((airports) => {
                return (
                    <li key={airports._id} className="airports">
                    {airports.city}
                    </li>
                );
                })}
            </ul>
            <h2 className="contacts">Contact Information</h2>
            <div className="contacts-content">
                <div>
                    <p className="contacts-text">
                    For any queries, please contact us at the following:
                    </p>
                    <p className="contact-email">
                    <a href="mailto:astrojet10@gmail.com">
                        <i className="fa fa-envelope"></i>
                        &ensp;Send Email
                    </a>
                    </p>
                    <p className="contact-phone">
                    <a href="tel:+919488957649">
                        <i className="fa fa-phone"></i>
                        &ensp;Call Us
                    </a>
                    </p>
                </div>
                {/* <Link to="/feedback"><button>Feedback</button></Link> */}
            </div>
        </div>
    );
}
 
export default About;