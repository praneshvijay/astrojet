import React, { useState, createContext} from 'react';
import { Link } from 'react-router-dom';
import OneWay from '../components/OneWay';
import PassengerList from '../components/PassengerList';
import './Manage.css';
import TwoWay from '../components/TwoWay';

export const ManageContext = createContext();

const Manage = () => {
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    if (localStorage.getItem("user") === null) {
        return (
          <div>
            <h1>Profile</h1>
            <h3>You have been logged out</h3>
            <Link to={"/"}>
              <button>Home</button>
            </Link>
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
          </div>
        );
    }

    if(bookings.length === 0 && loading){
        let user1 = localStorage.getItem("user");
        // console.log(user1);
        let email = user1.split('"')[3];
        // console.log(email);
        const fetchUserBookings = async () => {
            try {   
                const response = await fetch(`/api/user/getbooking/${email}`);  
                if (!response.ok) {
                    throw new Error('Failed to fetch booking details');
                }
                const booking = await response.json();
                setBookings(booking);
                console.log(booking);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching booking details:', error.message);
            }
        };
        fetchUserBookings();
    }
    return (
        <ManageContext.Provider value={{ bookings, setBookings }}>
            <div className="manage">
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        {bookings.length === 0 ? (
                            <h1 className="manage-header">No Bookings</h1>
                        ) : (
                            bookings.map((booking) => {
                                if (booking.option === "one-way") {
                                    return (
                                        <div className='one-way'>
                                        
                                            <OneWay flight={booking} />
                                            <PassengerList flight={booking} />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className='round-trip'>
                                            <TwoWay flight={booking} />
                                            <PassengerList flight={booking} />
                                        </div>
                                    )
                                }
                            })
                        )}
                    </>
                )}
            </div>
        </ManageContext.Provider>
    );
}
export default Manage;