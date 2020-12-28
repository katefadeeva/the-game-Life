import React, {Component, Fragment} from 'react';
import Header from "../header";
import Field from "../field";
import History from "../history";

export default class App extends Component {

  state = {
    x: 0,
    y: 0,
    name: null,
    historyField: [],
    loadField: []
  }

  changeXY = (x, y) => {
    this.setState({x, y})
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, x*10, y*10);
  }

  changeName = (name) => {
    this.setState(() => {return{name}});
  }

  changeHistoryFields = (arr) => {
    this.setState(() => {
      const historyField = JSON.parse(JSON.stringify(arr));
      return {historyField};
    })
  }

  changeStateLoadField = (arr, x, y) => {
    console.log(arr, x, y);
    this.setState(() => {
      const loadField = JSON.parse(JSON.stringify(arr));
      return {x, y, loadField}
    })
    // const canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, x*10, y*10);
  }

  render() {
    const {x, y, name, historyField, loadField} = this.state;
    return (
        <Fragment>
          <h1>Игра "Жизнь"</h1>
          <Header x={x} y={y} changeXY={this.changeXY}/>
          <Field x={x} y={y} changeName={this.changeName} changeHistoryFields={this.changeHistoryFields} loadField={loadField}/>
          <History x={x} y={y} name={name} historyField={historyField} changeStateLoadField={this.changeStateLoadField}/>
        </Fragment>
    )
  }
}