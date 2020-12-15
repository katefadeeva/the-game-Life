import React, {Component, Fragment} from 'react';
import Header from "../header";
import Field from "../field";
import History from "../history";

export default class App extends Component {

  state = {
    x: 0,
    y: 0,
    name: null,
    historyField: []
  }

  changeXY = (x, y) => {
    this.setState({x, y})
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, x*10, y*10);
  }

  changeName = (name) => {
    this.setState((state) => {return{name}});
  }

  changeHistoryFields = (arr) => {
    this.setState((state) => {
      const historyField = [...arr];
      return {historyField};
    })
  }

  render() {
    const {x, y, name, historyField} = this.state;
    return (
        <Fragment>
          <h1>Игра "Жизнь"</h1>
          <Header x={x} y={y} changeXY={this.changeXY}/>
          <Field x={x} y={y} changeName={this.changeName} changeHistoryFields={this.changeHistoryFields}/>
          <History x={x} y={y} name={name} historyField={historyField}/>
        </Fragment>
    )
  }
}