import React, {Component, Fragment} from 'react';
import Header from "../header";
import Field from "../field";

export default class App extends Component {

  state = {
    x: 0,
    y: 0
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

  render() {
    const {x, y} = this.state;
    return (
        <Fragment>
          <h1>Игра "Жизнь"</h1>
          <Header x={x} y={y} changeXY={this.changeXY}/>
          <Field x={x} y={y} />
        </Fragment>
    )
  }
}