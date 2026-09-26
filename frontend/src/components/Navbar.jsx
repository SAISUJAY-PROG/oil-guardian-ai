import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";


function Navbar() {

  return (

    <nav className="home-navbar">

      <Link
        to="/"
        className="brand"
      >

        <ShieldCheck size={30} />

        <div>

          <h2>
            OIL Guardian AI
          </h2>

          <span>
            Industrial Safety Intelligence
          </span>

        </div>

      </Link>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/employee">
          Employee
        </Link>

        <Link to="/officer">
          Officer
        </Link>

      </div>

    </nav>

  );

}


export default Navbar;