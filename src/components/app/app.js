import React, {Component, Fragment} from 'react';
import Header from "../header";
import Field from "../field";
import History from "../history";
import isEquals from "../../utils/utils";

export default class App extends Component {

  state = {
    x: 0,
    y: 0,
    saveState: {
      name: null,
      arr: [],
      x: 0,
      y: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { saveState } = this.state;
    if (!isEquals(saveState, prevState.saveState)) {
      let newObj = {};
      Object.assign(newObj, saveState);
      this.setState({newObj})
    }
  }

  changeXY = (x, y) => {
    this.setState({x, y})
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, x*10, y*10);
  }

  changeSaveState = (obj) => {
    console.log(obj.arr);
    const { x, y } = this.state;
    let newObj = {};
    Object.assign(newObj, obj);
    newObj.x = x;
    newObj.y = y;
    this.setState({
      saveState: newObj
    })
  }

  render() {
    const {x, y, saveState} = this.state;
    return (
        <Fragment>
          <h1>Игра "Жизнь"</h1>
          <Header x={x} y={y} changeXY={this.changeXY}/>
          <Field x={x} y={y} changeSaveState={this.changeSaveState}/>
          <History obj={saveState} />
        </Fragment>
    )
  }
}