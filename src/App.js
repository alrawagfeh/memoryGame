import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./components/Game";

class App extends Component {
  state = {
    pictures: [
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true },
      { name: "cover.jpg", status: "in", covered: true }
    ],
    numberOfTries: 0
  };

  pics = [
    { name: "chicken.png", status: "in", covered: true },
    { name: "crab.png", status: "in", covered: true },
    { name: "dolphin.png", status: "in", covered: true },
    { name: "goldfish.png", status: "in", covered: true },
    { name: "horse.png", status: "in", covered: true },
    { name: "octopus.png", status: "in", covered: true },
    { name: "rabbit.png", status: "in", covered: true },
    { name: "turtle.png", status: "in", covered: true },
    { name: "chicken.png", status: "in", covered: true },
    { name: "crab.png", status: "in", covered: true },
    { name: "dolphin.png", status: "in", covered: true },
    { name: "goldfish.png", status: "in", covered: true },
    { name: "horse.png", status: "in", covered: true },
    { name: "octopus.png", status: "in", covered: true },
    { name: "rabbit.png", status: "in", covered: true },
    { name: "turtle.png", status: "in", covered: true }
  ];

  firstSelection = null;
  firstSelectionIndex = -1;
  secondSelection = null;
  secondSelectionIndex = -1;

  shuffle = () => {
    let i = this.pics.length;
    let temp2 = [...this.state.pictures];
    while (i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.pics[i];
      this.pics[i] = this.pics[j];
      this.pics[j] = temp;
      temp2[i].name = "cover.jpg";
      temp2[i].covered = true;
      temp2[i].status = "in";
    }

    this.setState({ pictures: temp2, numberOfTries: 0 });
  };

  findUncovered = () => {
    return this.state.pictures.reduce(
      (acc, curr) => (!curr.covered && curr.status === "in" ? acc + 1 : acc),
      0
    );
  };
  temp = [...this.state.pictures];

  flipImage = index => {
    this.setState({ numberOfTries: this.state.numberOfTries + 1 });
    if (this.state.pictures[index].covered) {
      this.temp[index].name = this.pics[index].name;
      this.temp[index].covered = false;
      if (this.firstSelection === null) {
        this.firstSelection = this.temp[index].name;
        this.firstSelectionIndex = index;
      } else {
        this.secondSelection = this.temp[index].name;
        this.secondSelectionIndex = index;
      }
    } else {
      this.temp[index].name = "cover.jpg";
      this.temp[index].covered = true;
    }
  };

  checkPickedImages = () => {
    if (this.firstSelection === this.secondSelection) {
      this.temp[this.firstSelectionIndex].status = "out";
      this.temp[this.secondSelectionIndex].status = "out";
      this.firstSelection = null;
      this.firstSelectionIndex = -1;
      this.secondSelectionIndex = -1;
      this.secondSelection = null;
    }
  };
  resetSelectedImages = index => {
    this.firstSelection = null;
    this.firstSelectionIndex = -1;
    this.secondSelectionIndex = -1;
    this.secondSelection = null;
    if (!this.state.pictures[index].covered) {
      // if the clicked image was not covered then cover the selected images
      for (let i = 0; i < this.temp.length; i++) {
        if (
          !this.state.pictures[i].covered &&
          this.state.pictures[i].status === "in"
        ) {
          this.temp[i].name = "cover.jpg";
          this.temp[i].covered = true;
        }
      }
    }
  };
  handleChange = index => {
    if (this.state.pictures[index].status != "in") return;
    if (this.findUncovered() < 2 && this.state.pictures[index].covered) {
      // if zero or one image selected so far and the current selected image is covered
      this.flipImage(index);
      this.checkPickedImages();
    } else this.resetSelectedImages(index); // if number of uncovered images equals two or the selected image was uncovered
    this.setState({ pictures: this.temp });
  };

  render() {
    return (
      <div
        style={{
          marginLeft: "2vw",
          marginRight: "2vw",
          marginTop: "2vh",
          marginButtom: "2vh",
          textAlign: "center"
        }}
      >
        <img style={{ width: "60vmin" }} src="./images/title.png" alt="title" />
        <Game pics={this.state.pictures} onChange={this.handleChange} />
        <button
          style={{ margin: "3vmin", fontSize: "2vmin" }}
          onClick={this.shuffle}
        >
          New Game
        </button>
        <label
          style={{
            margin: "2vmin",
            fontSize: "2vmin",
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: "lightblue",
            paddingLeft: 5,
            paddingRight: 5
          }}
        >
          Number of Clicks: {this.state.numberOfTries}
        </label>
      </div>
    );
  }
}

export default App;
