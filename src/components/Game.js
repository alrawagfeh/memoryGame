import React, { Component } from "react";
class Game extends Component {
  state = {};

  imgStyle = {
    width: "18vmin",
    height: "18vmin"
  };
  render() {
    return (
      <div>
        {this.props.pics.map((x, i) =>
          i % 4 === 0 ? (
            <React.Fragment>
              <br />
              <button>
                {" "}
                <img
                  onClick={() => this.props.onChange(i)}
                  style={this.imgStyle}
                  src={`./images/${x.name}`}
                />
              </button>
            </React.Fragment>
          ) : (
            <button>
              {" "}
              <img
                onClick={() => this.props.onChange(i)}
                style={this.imgStyle}
                src={`./images/${x.name}`}
              />
            </button>
          )
        )}
      </div>
    );
  }
}

export default Game;
