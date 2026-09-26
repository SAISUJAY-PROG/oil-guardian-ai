import {
  Link
} from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  Home
} from "lucide-react";


function Sidebar() {

  return (

    <aside className="sidebar">

      <Link to="/">
        <Home size={18} />
        Home
      </Link>

      <Link to="/employee">
        <FileText size={18} />
        Employee
      </Link>

      <Link to="/officer">
        <LayoutDashboard size={18} />
        Officer
      </Link>

    </aside>

  );

}


export default Sidebar;