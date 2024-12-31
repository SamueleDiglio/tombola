import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-container-content">
        <h1>BENVENUTO NELLA TOMBOLA!</h1>
        <h3>Seleziona un opzione:</h3>
        <div className="linkContainer">
          <Link to="/Tombola">
            <button>
              <h3>Tombola</h3>
            </button>
          </Link>
          <Link to="/Cartella">
            <button>
              <h3>Cartella</h3>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
