import React, { Component } from "react";
import "antd/dist/antd.css";
import {Image} from "antd"

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "191645467216-brmqnq0k6t0r6dvrh59369rreg9bssnv.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
    console.log(this.props);
  }

  render() {
    return (
      <>
        <div style={{margin: '0% 10%', height: '100%'}}>
        <h1 style={{'text-align': 'center'}}>About</h1>
        <div>This is a goal-tracking system. Define your own goals, log progress regularly, and get colorful displays of your progress over time! Progress can be private or shared with friends. </div>
        {this.props.userId ? <div/>: <div style={{'text-align': 'center', 'font-weight': 'bold'}}>Log in to get started &#x1F60a;</div>}
        <Image src={require(`../../public/img/view1.png`)}/>
        <Image src={require(`../../public/img/view2.png`)}/>
        <div style={{'margin': '5% 0% 0% 20%'}}>Built by <a href="https://github.com/vincenthuang75025">Vincent Huang</a>, <a href="https://github.com/JonathanXu1">Jonathan Xu</a>, <a href="https://github.com/jerry1ye10">Jerry Ye</a> as part of Project School 2021. Read about our <a href="/writeup">ideation process</a>.</div>
        </div>
      </>
    );
  }
}

export default Skeleton;
