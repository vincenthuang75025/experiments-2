import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Navbar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "191645467216-brmqnq0k6t0r6dvrh59369rreg9bssnv.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages.
 * @param {String} userId of the user
 */

const NavBar = (props) => {
    return (
    <>
      <nav className="NavBar-container">
        <div className="NavBar-linkContainer u-inlineBlock">
          {props.userId ? 
          <>
          <Link to="/manage" className="NavBar-link">
            Manage
          </Link>
        <Link to="/progress" className="NavBar-link">
            Private Progress
        </Link>
        <Link to={`/progress/${props.publicId}`} className="NavBar-link">
            Public Progress
        </Link></> : <div/>}
        <Link to="/" className="NavBar-title u-inlineBlock NavBar-Mainlink NavBar-link">
          About
        </Link>
        </div>
        <div className="LoginButton">
          {props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-login"
            />
          )}
        </div>
      </nav>
      <hr/>
    </>
    );
}

export default NavBar;