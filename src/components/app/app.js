import React, {Component, Fragment} from 'react';
import Header from "../header";
import Field from "../field";
import History from "../history";

export default class App extends Component {

  state = {
    x: 0,
    y: 0,
    saveState: null,
    arr: null
  }

  changeXY = (x, y) => {
    this.setState({
      x: x,
      y: y
    })
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, x*10, y*10);
  }

  changeSaveState = (obj) => {
    this.setState({
      saveState: obj
    })
  }

  changeArr = (arr) => {
    console.log(arr);
    this.setState({
      arr: arr
    })
  }

  render() {
    const {x, y, saveState} = this.state;
    return (
        <Fragment>
          <h1>Игра "Жизнь"</h1>
          <Header x={x} y={y} changeXY={this.changeXY} changeSaveState={this.changeSaveState}/>
          <Field x={x} y={y} changeArr={this.changeArr}/>
          <History arr={saveState} x={x} y={y}/>
        </Fragment>
    )
  }
}