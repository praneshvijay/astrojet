import React, { useState, useEffect} from 'react';
import { Navigate, useLocation } from 'react-router-dom';


// const Verify = () => {
//     const location = useLocation();
//     const [details, setDetails] = useState(location.state);
//     const [loading, setLoading] = useState(true);
//     const [verifystatus, setverify] = useState(null);
//     const useEffect = async() => {

//         fetch("/create-verify", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
 
//                 adults: details.adults,
   
//         }),
//         })
//         .then(res => {
//             if (res.status === 201) return res.json();
//             return res.json().then(json => Promise.reject(json));
//         })
//         .then(({ url }) => {
//             console.log(url)
//             window.location = url;
//         })
//         .catch(e => {
//             console.error(e.error);
//         });
//     };


//     useEffect( () => {
//         setTimeout( () => {
//             setLoading(false);
//             setverify("success");
//         }, 2000);
//     }, []);
//     console.log(details);
//     return ( 
//         <>
//         {loading &&
//             <div>
//                 <h1>Verifying your details</h1>
//             </div>
//         }
//         {verifystatus === "success" &&
//             <Navigate to = "/payment" state = {details}/>   
//         }
//         </>  
//     );
// }
 
// export default Verify;


const Verify = () => {
    const location = useLocation();
    const [details] = useState(location.state);
    const [loading, setLoading] = useState(true);
    const [verifystatus, setVerifyStatus] = useState(null);

    

    console.log("details inside verify = ",details);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/create-verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items: details.adult,
                    })
                });

                console.log(response.status);
    
                if (response.status === 200) {
                        setVerifyStatus(true);
                        setLoading(false);
                } else {
                    alert("Cowin Ceritificate not Matching");
                    setVerifyStatus(false);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error:", error);
            } 
        };

        fetchData();
    }, [details]);

    return (
        <>
            {loading && <div><h1>Verifying your details</h1></div>}
            {verifystatus && <Navigate to='/payment' state={details}/>}
            {!loading && !verifystatus && <Navigate to='/' />}
        </>
    );
};

export default Verify;
