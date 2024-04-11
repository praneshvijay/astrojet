// require('dotenv').config();
// const nodemailer = require('nodemailer');
// const Mailgen = require('mailgen');

// const User = require('../models/userModel')

// let nodeConfig = {
//     service : 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// }

// let transporter = nodemailer.createTransport(nodeConfig);

// let MailGenerator = new Mailgen({
//     theme: "default",
//     product : {
//         name: "AstroJet",
//         link: 'http://localhost:3000/home'
//     }
// });

// const signupMail = async (req, res) => {
//     const { email, firstName } = req.body;

//     // body of the email
//     const Email = {
//         body : {
//             name: firstName,
//             intro : `Welcome to Astrojet! We\'re very excited to have you on board.`,
//             outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
//         }
//     };

//     const emailBody = MailGenerator.generate(Email);
//     const emailText = MailGenerator.generatePlaintext(Email);

//     let emailOptions = {
//         from : `AstroJet <${process.env.EMAIL}>`,
//         to: email,
//         subject : "Welcome to AstroJet :)",
//         text: emailText,
//         html: emailBody
//     }

//     // send mail
//     transporter.sendMail(emailOptions)
//         .then(() => {
//             return res.status(200).send({ msg: "You should receive an email from us."})
//         })
//         .catch(error => res.status(500).send({ error }))
// }

// module.exports = { signupMail }

require('dotenv').config();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const User = require('../models/userModel');

let nodeConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "AstroJet",
        link: 'http://localhost:3000/home'
    }
});

const signupMail = async (req, res) => {
    const { email, firstName } = req.body;

    // body of the email
    const Email = {
        body: {
            name: firstName,
            intro: `Welcome to Astrojet! We're very excited to have you on board.`,
            outro: `Need help, or have questions? Just reply to this email, we'd love to help.`
        }
    };

    const emailBody = MailGenerator.generate(Email);
    const emailText = MailGenerator.generatePlaintext(Email);

    let emailOptions = {
        from: `AstroJet <${process.env.EMAIL}>`,
        to: email,
        subject: "Welcome to AstroJet :)",
        text: emailText,
        html: emailBody
    };

    try {
        await transporter.sendMail(emailOptions);
        //res.status(200).send({ msg: "You should receive an email from us." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


const successMail = async (req, res) => {
    const { adult, booking, flight1, flight2 } = req.body;
    //console.log(adult, booking);

    // body of the email
    let Email
    if( booking.option === "one-way" ){
        Email = {
            body: {
                name: adult.fname,
                intro: `Booking Confirmed !!, Hurray can't wait to fly with you :)<br>
                Here are the details of your Booking and some Instructions :<br><br>
                <table style="border-collapse: collapse;">
                    <tr>
                    <td style="border: 1px solid black; padding: 5px;">Booking Id</td>
                    <td style="border: 1px solid black; padding: 5px;">${booking._id}</td>
                    </tr>
                    <tr>
                    <td style="border: 1px solid black; padding: 5px;">From</td>
                    <td style="border: 1px solid black; padding: 5px;">${booking.from} ${booking.depcode}</td>
                    </tr>
                    <tr>
                    <td style="border: 1px solid black; padding: 5px;">To</td>
                    <td style="border: 1px solid black; padding: 5px;">${booking.to} ${booking.arrcode}</td>
                    </tr>
                    <tr>
                    <td style="border: 1px solid black; padding: 5px;">Date of Travel</td>
                    <td style="border: 1px solid black; padding: 5px;">${booking.date}</td>
                    </tr>
                    <tr>
                    <td style="border: 1px solid black; padding: 5px;">Departure Time</td>
                    <td style="border: 1px solid black; padding: 5px;">${flight1.departure} IST</td>
                    </tr>
                    <tr>
                    <td style="border: 1px solid black; padding: 5px;">Arrival Time</td>
                    <td style="border: 1px solid black; padding: 5px;">${flight1.arrival} IST</td>
                    </tr>
                </table>
                <br>
                <br>
                Gate closes 45 minutes before Scheduled Departure Time !!!<br><br>`,
                outro: 'Need help, or have any queries? Just reply to this email, we\'d love to help.'
            }
              
        };
    }
    else{
        Email = {
            body: {
                name: adult.fname,
                intro: `Booking Confirmed !!, Hurray can't wait to fly with you :)<br>
                Here are the details of your Booking and some Instructions :<br><br>
                <table style="border-collapse: collapse;">
                <tr>
                <td style="border: 1px solid black; padding: 5px;">Booking Id</td>
                <td style="border: 1px solid black; padding: 5px;">${booking._id}</td>
                </tr>
                <tr>
                <td style="border: 1px solid black; padding: 5px;">From</td>
                <td style="border: 1px solid black; padding: 5px;">${booking.from} ${booking.depcode}</td>
                </tr>
                <tr>
                <td style="border: 1px solid black; padding: 5px;">To</td>
                <td style="border: 1px solid black; padding: 5px;">${booking.to} ${booking.arrcode}</td>
                </tr>
                </table>
                <br> Departure Flight Details : <br>
                <table style="border-collapse: collapse;">
                <tr>
                <td style="border: 1px solid black; padding: 5px;">Date of Travel</td>
                <td style="border: 1px solid black; padding: 5px;">${booking.date}</td>
                </tr>
                <tr>
                <td style="border: 1px solid black; padding: 5px;">Departure Time</td>
                <td style="border: 1px solid black; padding: 5px;">${flight1.departure} IST</td>
                </tr>
                <tr>
                <td style="border: 1px solid black; padding: 5px;">Arrival Time</td>
                <td style="border: 1px solid black; padding: 5px;">${flight1.arrival} IST</td>
                </tr>
                </table>
                <br> Return Flight Details : <br>
                <table style="border-collapse: collapse;">
                <tr>
                <td style="border: 1px solid black; padding: 5px;">Date of Travel</td>
                <td style="border: 1px solid black; padding: 5px;">${booking.return_date}</td>
                </tr>
                <tr>
                <td style="border: 1px solid black; padding: 5px;">Departure Time</td>
                <td style="border: 1px solid black; padding: 5px;">${flight2.departure} IST</td>
                </tr>
                <tr>
                <td style="border: 1px solid black; padding: 5px;">Arrival Time</td>
                <td style="border: 1px solid black; padding: 5px;">${flight2.arrival} IST</td>
                </tr>
                </table>
                <br><br>
                Gate closes 45 minutes before Scheduled Departure Time !!!<br><br>`,
                outro: 'Need help, or have any queries? Just reply to this email, we\'d love to help.'
            }
              
        };
    }    

    const emailBody = MailGenerator.generate(Email);
    const emailText = MailGenerator.generatePlaintext(Email);

    let emailOptions = {
        from: `AstroJet <${process.env.EMAIL}>`,
        to: adult.email,
        subject: `BOOKING CONFIRMED`,
        text: emailText,
        html: emailBody
    };

    try {
        await transporter.sendMail(emailOptions);
        //res.status(200).send({ msg: "You should receive an email from us." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const firsttimeflierMail = async (req, res) => {
    const { adult, booking, flight1, flight2 } = req.body;
    console.log(adult);

    // body of the email
    const Email = {
            body: {
                name: adult.fname,
                intro: `First Time Flier Guide<br>
                ID Documents: Carry valid identification documents to the airport. Domestic passengers should have an ID card (Aadhaar, driving licence, PAN, voter ID), while international passengers must have their passport.<br>
                Tickets: Bring a hard copy/soft copy of your air ticket.<br>
                Boarding Pass: For seamless boarding, you must have your boarding pass. Get it printed at the check-in kiosks at the Airport.<br>
                Hand Baggage Guidelines: Articles like nail cutters, scissors, swiss knives, batteries, and liquids more than 100ml are not allowed in hand luggage.<br>
                Check-in Baggage Instructions: Do not carry a power bank, lighter, or e-cigarette in your check-in baggage. Ensure that you do not have any prohibited items in your baggage otherwise it will be confiscated.<br>
                Luggage Screening: Place all your hand baggage for screening and your cell phones, laptops, and electronics in the tray provided. The metal objects like belts and bracelets should also be placed in the trays provided, as they might set off the alarms.<br>
                Personal Check: While your luggage is being checked, you will be required to undergo a personal check at the checking booths.<br>
                Collect Baggage: Once your screening is over, collect your baggage and everything else from the other side of the X-ray machines or screens. Your documents will be verified, and the officials at the counters will allow you to move on to the next step in the airline process.<br>
                Boarding: Once you have your boarding pass, proceed to the boarding gate. The boarding gate number will be mentioned on your boarding pass.<br>
                Gate closes 45 minutes before Scheduled Departure Time !!!<br><br>`,
                outro: 'Need help, or have any queries? Just reply to this email, we\'d love to help.'
            }
              
        };
    
    const emailBody = MailGenerator.generate(Email);
    const emailText = MailGenerator.generatePlaintext(Email);

    let emailOptions = {
        from: `AstroJet <${process.env.EMAIL}>`,
        to: adult.email,
        subject: `FIRST TIME FLIER GUIDE`,
        text: emailText,
        html: emailBody
    };

    try {
        await transporter.sendMail(emailOptions);
        //res.status(200).send({ msg: "You should receive an email from us." });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


module.exports = { signupMail, successMail, firsttimeflierMail };

