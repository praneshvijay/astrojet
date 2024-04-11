import React from "react";
import './Book.css';

export default function Infant(){
    const [infant, setInfant] = React.useState({
        fname: '',
        lname: '',
        dob: '',
        gender: '',
    });
    
    function HandleChange(event){
        const {name, value, type} = event.target;
        
        setInfant((prevValue) => {
            if(type === "checkbox"){
                return {
                    ...prevValue,
                    [name]: !prevValue[name]
                }
            }else{
            return {
                ...prevValue,
                [name]: value
            };  
        }
        });
    }

    return(
        <div className="infant">
            <div className="col1">
                <div className="name-input">
                    <input
                        type="text"
                        name="fname"
                        value={infant.fname}
                        onChange={HandleChange}
                        className="infant-fname"
                        required
                        placeholder="First Name"
                    />
                    <div className="space"></div>
                    <input
                        type="text"
                        name="lname"
                        value={infant.lname}
                        onChange={HandleChange}
                        className="infant-lname"
                        required
                        placeholder="Last Name"
                    />
                </div>
            </div>
            <div className="col2">
                <div className="gender-input">
                    <label className="class">Gender</label>
                    <select className="infant-gender" name="gender" onChange={HandleChange} value = {infant.gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="space"></div>
                <div className="space"></div>
                <div className="dob-input">
                    <label>DOB</label>
                    <input
                        type="date"
                        name="dob"
                        value={infant.dob}
                        onChange={HandleChange}
                        className="infant-dob"
                        required
                    />
                </div>
            </div>
        </div>
    );
}