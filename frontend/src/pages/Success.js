import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const Success = () => {
    const user1 = localStorage.getItem("user");
    let email = user1.split('"')[3];
    const body = {email: email};
    useEffect(() => {
        const Update = async () => {
            try{
                const response = await fetch('/api/user/success', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if(response.ok){
                    console.log("Success");
                }
                else{
                    console.log("Error");
                }
            }
            catch(error){
                console.log(error);
            }
        }
        Update();
    }, []);
    return (
        <div>
            <h2>Payment Successful</h2>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default Success;

