import React, { useEffect } from 'react';

const Cancel = () => {
    const user1 = localStorage.getItem("user");
    let email = user1.split('"')[3];
    const body = {email: email};
    useEffect(() => {
        const Delete = async () => {
            try{
                const response = await fetch('/api/user/cancel', {
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
        Delete();
    }, []);
    return (
        <div>
            <h1>Your Payment has been cancelled</h1>
        </div>
    );
}
 
export default Cancel;