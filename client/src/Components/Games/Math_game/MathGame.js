import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./redux/index";
import Start from "./containers/Start";
import MathQuiz from "./containers/MathQuiz";

class MathGame extends Component {
  gameStart = () => {
    this.props.onStartGame();
  };

  render() {
    const userData = sessionStorage.getItem("userData");

    if (!userData) {
      return null; // or render a loading state if needed
    }

    return (
      <div className="Mathgame">
        <header className="Mathgame-header">
          {!this.props.isStarted ? (
            <Start startPressed={this.gameStart} />
          ) : (
            <MathQuiz {...this.props} gameStart={this.gameStart} />
          )}
        </header>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MathGame);

