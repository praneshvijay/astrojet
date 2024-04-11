import React from "react";
import { useState} from "react";
import { Link } from "react-router-dom";
import "./profile.css";

const Profile = () => {
    const [user, setUser] = useState([]);
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
    if(user.length === 0){
        let user1 = localStorage.getItem("user");
        console.log(user1);
        let email = user1.split('"')[3];
        console.log(email);
        const fetchUserDetails = async () => {
            try {   
                const response = await fetch(`/api/user/getuser/${email}`);  
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const user = await response.json();
                setUser(user);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            }
        };
        fetchUserDetails();
        console.log(user);
    }
    return (
        <div className="profile">
            <h1 className="profile-header">Profile</h1>
            <div className="profile-content">
            {/* <h3>Name: {user.name}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Phone number: {user.phone}</h3>
            <h3>Date of birth: {user.dob.split("T")[0]}</h3>
            <h3>ffm: {user.ffm}</h3> */}
            <table>
              <td className="attributes">
                <tr>First Name</tr>
                <tr>Last Name</tr>
                <tr>Email</tr>
                <tr>Phone number</tr>
                <tr>FFM</tr>
              </td>
              <td>
                <tr>{user.firstName}</tr>
                <tr>{user.lastName}</tr>
                <tr>{user.email}</tr>
                <tr>{user.phoneNo}</tr>
                <tr>{user.ffm}</tr>
              </td>
            </table>
          </div>
            <div className="buttons">
                <Link to={"/"}>
                <button className="button">Home</button>
                </Link>
                <Link to={"/manage"}>
                <button className="button">Your bookings</button>
                </Link>
            </div>
        </div>
    );
}
 
export default Profile;