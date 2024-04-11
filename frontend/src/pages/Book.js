import React, { useEffect, useState } from "react";
import Adult from "../components/Adult";
import AdultDefault from "../components/AdultDefault";
import Children from "../components/Children";
import Infant from "../components/Infant";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
const api_key = "335725625617448"
const cloud_name = "dn54ixooo"

const Book = () => {
    const location = useLocation();
    // console.log(location);
    const [Details] = React.useState(location.state);
    const [ffmu, setffmu] = useState(false);
    const [ffm, setFfm] = React.useState(0);
    const [fare, setFare] = React.useState(
        Math.floor((Details.details.adults + Details.details.children) * Details.fare +
        Details.details.infants * Details.fare * 0.5)
    );
    const [discount, setDiscount] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [dataf, setDataf] = useState({});
    function ffmchecked(e) {
        setffmu(e.target.checked);
        if (e.target.checked) {
          setFare(fare - Math.floor(ffm / 1000) * 100);
          setDiscount(Math.floor(ffm / 1000) * 100);
        } else {
          setFare(fare + Math.floor(ffm / 1000) * 100);
          setDiscount(0);
        }
    }
    let user1 = localStorage.getItem("user");
    let email = user1.split('"')[3];
    useEffect(() => {
        const fetchFfm = async () => {
            try {   
                const response = await fetch(`/api/user/getffm/${email}`);  
                if (!response.ok) {
                    throw new Error('Failed to fetch ffm');
                }
                const ffm = await response.json();
                setFfm(ffm.ffm);
            } catch (error) {
                console.error('Error fetching ffm details:', error.message);
            }
        };
        fetchFfm();
    });
    async function handleSub(event) {
        console.log("Submitted");
        event.preventDefault();
        var nd = document.getElementsByClassName("dadult-fname");
        var ndi = document.getElementsByClassName("dadult-lname");
        var ad = document.getElementsByClassName("dadult-dob");
        var gd = document.getElementsByClassName("dadult-gender");
        var ed = document.getElementsByClassName("dadult-email");
        var pd = document.getElementsByClassName("dadult-phone");
        var fd = document.getElementsByClassName("dadult-firstTimeFlier");
        var cd = document.getElementsByClassName("dadult-cowinCertificate");
        var n = document.getElementsByClassName("adult-fname");
        var nij = document.getElementsByClassName("adult-lname");
        var a = document.getElementsByClassName("adult-dob");
        var g = document.getElementsByClassName("adult-gender");
        var e = document.getElementsByClassName("adult-email");
        var p = document.getElementsByClassName("adult-phone");
        var f = document.getElementsByClassName("adult-firstTimeFlier");
        var c = document.getElementsByClassName("adult-cowinCertificate");
        var nc = document.getElementsByClassName("child-fname");
        var nci = document.getElementsByClassName("child-lname");
        var ac = document.getElementsByClassName("child-dob");
        var gc = document.getElementsByClassName("child-gender");
        var ni = document.getElementsByClassName("infant-fname");
        var nii = document.getElementsByClassName("infant-lname");
        var ai = document.getElementsByClassName("infant-dob");
        var gi = document.getElementsByClassName("infant-gender");
        var adult = [];
        var child = [];
        var infant = [];
        var ftm = false;
        for (var i = 0; i < ni.length; i++) {
            const birthDate = new Date(ai[i].value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if((age)>2){
                alert("Infants age must be less than 2");
                return;
            }
            infant.push({
                fname: ni[i].value,
                lname: nii[i].value,
                dob: ai[i].value,
                gender: gi[i].value,
            });
        }
        for (i = 0; i < nc.length; i++) {
            const birthDate = new Date(ac[i].value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if((age)<2&&(age)>15){
                alert("Children age must be between 2 and 15");
                return;
            }
            child.push({
                fname: nc[i].value,
                lname: nci[i].value,
                dob: ac[i].value,
                gender: gc[i].value,
            });
        }
        console.log(n.length);
        console.log(nd.length);

        let photos = [];

        const signatureResponse = await axios.get("/get-signature")
        console.log("signature got")
        console.log("signature got")

        for (i=1;i<nd.length;i++)
        {
            const data = new FormData()
            data.append("file", cd[i].files[0])
            data.append("api_key", api_key)
            data.append("signature", signatureResponse.data.signature)
            data.append("timestamp", signatureResponse.data.timestamp)

            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, data, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: function (e) {
                console.log(e.loaded / e.total)
                }
            })
            console.log(cloudinaryResponse.data)

            // send the image info back to our server
            const photoData = {
                public_id: cloudinaryResponse.data.public_id,
                version: cloudinaryResponse.data.version,
                signature: cloudinaryResponse.data.signature
            }         
            photos.push(photoData);
        }


        console.log(photos);

        for (i = 1; i < nd.length; i++) {
            if (fd[i].checked) {
                ftm = true;
            }
            const birthDate = new Date(ad[i].value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if((age)<15){
                alert("Adults age must be greater than 15");
                return;
            }
            adult.push({
                fname: nd[i].value,
                lname: ndi[i].value,
                gender: gd[i].value,
                dob: ad[i].value,
                email: ed[i].value,
                phone: pd[i].value,
                firstTimeFlier: fd[i].checked,
                cowinCertificate: photos[i-1],
            });
        }



        for (i = 1; i < n.length; i++) {
            if (f[i].checked) {
                ftm = true;
            }
            const birthDate = new Date(a[i].value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if((age)<15){
                alert("Adults age must be greater than 15");
                return;
            }
            adult.push({
                fname: n[i].value,
                lname: nij[i].value,
                gender: g[i].value,
                dob: a[i].value,
                email: e[i].value,
                phone: p[i].value,
                firstTimeFlier: f[i].checked,
                cowinCertificate: c[i].files[0],
            });
        }
        const data = {
            adult: adult,
            child: child,
            infant: infant,
            Details: Details,
            user: localStorage.getItem("user"),
            ffmUsed: ffmu,
            ftm: ftm,
            fare: fare,
            discount: discount,
        };
            if (data) {
                setRedirect(true);
                setDataf(data);
            } 
    }

    if(redirect){
        return <Navigate to="/verify" state={dataf} />;
    }
    return (    
        <div className="book-wrapper">
            
        <form onSubmit={handleSub} encType="multipart/form-data">
            <h1 className="book-wrapper-header">Passenger Details</h1>
            {[...Array(Details.details.adults)].map((e, i) => {
            console.log(i);
            return (
                <div>
                <h3 className="adult-header">Adult {i + 1}</h3>
                {i === 0 ? <AdultDefault /> : <Adult />}
                </div>
            );
            })}
            {[...Array(Details.details.children)].map((e, i) => {
            return (
                <div>
                <h3 className="child-header">Child {i + 1}</h3>
                <Children />
                </div>
            );
            })}
            {[...Array(Details.details.infants)].map((e, i) => {
            return (
                <div>
                <h3 className="infant-header">Infant {i + 1}</h3>
                <Infant />
                </div>
            );
            })}
            <div className="ffm-wrapper">
            <label className="ffm-label">Available FFM: {ffm}</label>
            <br />
            <label className="ffm-label">
                Use FFM (you will get a discount of ₹{Math.floor(ffm / 1000) * 100})
            </label>
            <input
                type="checkbox"
                className="ffm-checkbox"
                onChange={(e) => ffmchecked(e)}
                disabled={ffm < 1000}
            />
            </div>
            <h3 className="fare-header">
            Total Fare: ₹{fare.toLocaleString("en-IN")}
            </h3>
            <button type="submit" className="submit-button">
            Book
            </button>
        </form>
    </div>
  );
}
 
export default Book;