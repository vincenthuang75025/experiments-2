import React, { Component } from "react";

class Writeup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <embed src={require(`../../public/writeup.pdf`)} type="application/pdf"   height="700px" width="100%"/>
    );
  }
}

export default Writeup;
