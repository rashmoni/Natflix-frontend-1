// Node modules
import { Link } from "react-router-dom";

// Project files
import Logo from "assets/images/logo.svg";
import data from "data/links-admin.json";

export default function NavigationBarAdmin() {
  // Components
  const Links = data.map((item) => (
    <Link key={item.id} to={item.url}>
      {item.label}
    </Link>
  ));

  return (
    <nav className="navigation-bar">
      <Link to="/admin">
        <img src={Logo} />
      </Link>
      {Links}
    </nav>
  );
}
