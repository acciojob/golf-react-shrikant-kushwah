import React, { Component, useState } from "react";
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderBall: false,
      posi: 0,
      ballPosition: { left: "0px" }
    };
    this.renderChoice = this.renderBallOrButton.bind(this)
    this.buttonClickHandler = this.buttonClickHandler.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  };

  buttonClickHandler() {
    this.setState({ renderBall: true }, () => {
      const ball = document.getElementById("ball")
      if (ball) ball.focus()
    })
  }
  renderBallOrButton() {
    if (this.state.renderBall) {
      return <div className="ball" id="ball" tabIndex="0" style={this.state.ballPosition}></div>
    } else {
      return <button className="start" id="start" onClick={this.buttonClickHandler}>Start</button>
    }
  }

  //handle arrow right key
  handleKeyDown(event) {
    if (!this.state.renderBall) return;
    if (event.key === "ArrowRight" || event.keyCode === 39) {
      this.setState(((preState) => {
        const newPosition = preState.posi + 5;
        return {
          posi: newPosition,
          ballPosition: { left: `${newPosition}px` }
        }
      }))
    }
  }

  // bind ArrowRight keydown event
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown)
  }

  render() {
    return (
      <div className="playground">
        {this.renderBallOrButton()}
      </div>
    )
  }
}

export default App;
