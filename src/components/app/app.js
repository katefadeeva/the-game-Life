import React, {Component, Fragment} from 'react';
import Header from "../header";
import Field from "../field";

export default class App extends Component {

  state = {
    x: 0,
    y: 0
  }

  changeXY = (x, y, target) => {
    this.setState({
      x: x,
      y: y
    })
    target.remove();
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