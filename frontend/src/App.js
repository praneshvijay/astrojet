import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import React from 'react'
import { useEffect } from 'react'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import FlightDetails from './pages/FlightDetails'
import Book from './pages/Book'
import Profile from './pages/Profile'
import About from './pages/About'
import Manage from './pages/Manage'
import Payment from './pages/Payment'
import Verify from './pages/Verify'
import Success from './pages/Success'
import Cancel from './pages/Cancel'

export const UserProvider = React.createContext();

function App() {
  const [airport, setAirport] = React.useState([]);
  const [Loggedin, setLoggedin] = React.useState(false);
  const { user } = useAuthContext();
  useEffect(() => {   
    const fetchAirports = async () => {
        try {   
            const response = await fetch('/api/airports');  
            if (!response.ok) {
                throw new Error('Failed to fetch airports');
            }
            const airports = await response.json();
            setAirport(airports);
        } catch (error) {
            console.error('Error fetching airports:', error.message);
        }
    };  
    fetchAirports();
}, []);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const date1 = new Date(localStorage.getItem("token"));
      const date = new Date();
      if (date1 > date) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      setLoggedin(false);
    }
  });
  return (
    <div className="App">
      <BrowserRouter>
      <UserProvider.Provider
          value={{ Loggedin, setLoggedin, airport, setAirport }}
        >
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/login" 
              element = {<Login/>}
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route
              path="/flights"
              element={<FlightDetails />}
            />
            <Route
              path="/book"
              element={<Book/>}
            />
            <Route 
              path="/profile" 
              element={<Profile/>} 
            />
            <Route 
              path="/about" 
              element={<About/>}
            />
            <Route 
              path="/manage" 
              element={<Manage/>}
            />
            <Route
              path ="/payment"
              element={<Payment/>}
            />
            <Route
              path = "/verify"
              element = {<Verify/>}
            />
            <Route
              path = "/success"
              element = {<Success/>}
            />
            <Route
              path = "/cancel"
              element = {<Cancel/>}
            />
          </Routes>
        </div>
        </UserProvider.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
