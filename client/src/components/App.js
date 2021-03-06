import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import PrivateProgress from "./pages/PrivateProgress";
import PublicProgress from "./pages/PublicProgress";
import NavBar from "./modules/Navbar.js";
import Writeup from "./pages/Writeup";
// import Progress from "./modules/Progress";
import Manage from "./pages/Manage";

import "../utilities.css";


import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      publicId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
        get("/api/finduser", {id: user._id}).then((user2) => {
          this.setState({publicId: user2.publicid});
        })
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      get("/api/finduser", {id: user._id}).then((user2) => {
        this.setState({publicId: user2.publicid});
      })
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    this.setState({publicId: undefined});
    post("/api/logout");
  };

  render() {
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
          publicId={this.state.publicId}
          />
        <Router>
          <Skeleton
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <PrivateProgress
            path="/progress"
            userId={this.state.userId}
          />
          <Manage
            path="/manage"
            userId={this.state.userId}
            publicId={this.state.publicId}
          />
          <NotFound default />
          <PublicProgress
            path="/progress/:userId"
            id={this.state.userId}
          />
          <Writeup 
           path="/writeup"
          />
        </Router>
      </>
    );
  }
}

export default App;
