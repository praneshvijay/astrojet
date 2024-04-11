import React from "react";
import "./Book.css";

export default function Children(){
    const [children, setChildren] = React.useState({
        fname: '',
        lname: '',
        dob: '',
        gender: '',
    });
    function HandleChange(event){
        const {name, value, type} = event.target;
        
        setChildren((prevValue) => {
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
        <div className="children">
            <div className="col1">
                <div className="name-input">
                    <input
                        type="text"
                        name="fname"
                        value={children.fname}
                        onChange={HandleChange}
                        className="child-fname"
                        required
                        placeholder="First Name"
                    />
                    <div className="space"></div>
                    <input
                        type="text"
                        name="lname"
                        value={children.lname}
                        onChange={HandleChange}
                        className="child-lname"
                        required
                        placeholder="Last Name"
                    />
                </div>
            </div>
            <div className="col2">
                <div className="gender-input">
                    <label className="class">Gender</label>
                    <select className="child-gender" name="gender" onChange={HandleChange} value={children.gender}>
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
                        value={children.dob}
                        onChange={HandleChange}
                        className="child-dob"
                        required
                    />
                </div>
            </div>
        </div>
    );
}