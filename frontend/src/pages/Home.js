import FlightSearch from "../components/FlightSearch";
import Slideshow from "../components/Slideshow";

const Home = () => {
  return ( 
    <div className="Home">
      <Slideshow/>
      <FlightSearch />
    </div>
  );
}
 
export default Home;