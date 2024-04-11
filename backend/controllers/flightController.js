const Airport = require('../models/airportModel');
const Flight = require('../models/flightModel');

const getAirports = async (req, res) => {
    try {
        const airports = await Airport.find();
        res.status(200).json(airports);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getFlights = async (req, res) => {
    const{source, destination, day} = req.params
    let dday;
    switch (parseInt(day)) {
        case 1:
          dday="MON";
          break;
        case 2:
          dday="TUE";
          break;
        case 3:
          dday="WED";
          break;
        case 4:
          dday="THUR";
          break;
        case 5:
          dday="FRI";
          break;
        case 6:
          dday="SAT";
          break;
        case 7:
          dday="SUN";
          break;
    }
    try{
        const flights = await Flight.find({source, destination, days: dday}).sort({arrival: 1})
        console.log(flights)
        res.status(200).json(flights)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

const getroundFlights = async (req, res) => {
    const{source, destination, day1, day2} = req.params
    let dday1, dday2;
    switch (parseInt(day1)) {
        case 1:
          dday1="MON";
          break;
        case 2:
          dday1="TUE";
          break;
        case 3:
          dday1="WED";
          break;
        case 4:
          dday1="THUR";
          break;
        case 5:
          dday1="FRI";
          break;
        case 6:
          dday1="SAT";
          break;
        case 7:
          dday1="SUN";
          break;
    }
    switch (parseInt(day2)) {
      case 1:
        dday2="MON";
        break;
      case 2:
        dday2="TUE";
        break;
      case 3:
        dday2="WED";
        break;
      case 4:
        dday2="THUR";
        break;
      case 5:
        dday2="FRI";
        break;
      case 6:
        dday2="SAT";
        break;
      case 7:
        dday2="SUN";
        break;
  }
    try{
        const flights1 = await Flight.find({source, destination, days: dday1}).sort({arrival: 1})
        const flights2 = await Flight.find({source: destination, destination: source, days: dday2}).sort({arrival: 1})
        console.log(flights1)
        console.log(flights2)
        res.status(200).json({flight1: flights1, flight2: flights2})
    } catch (error) {
        res.status(404).json({ message: error.message})
    }

}


module.exports = { getAirports, getFlights, getroundFlights};
