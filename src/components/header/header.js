import React, {Component} from 'react';
import Save from "../save";
import './header.css';

export default class Header extends Component {

  state = {
    x: null,
    y: null,
  }

  componentDidMount() {
    const { x, y } = this.props;
    this.setState({
      x: x,
      y: y
    })
  }

  onChangeX = (event) => {
    const val = event.currentTarget.value;
    this.setState({
      x: val
    })
  }

  onChangeY = (event) => {
    const val = event.currentTarget.value;
    this.setState({
      y: val
    })
  }


  render() {
    const {x, y} = this.state;
    return (
        <header className="header">
          <p>Для начала игры необходимо ввести Ширину и Высоту игрового поля</p>
          <span className="x">Ширина: <input type="text" onChange={this.onChangeX} size="4" maxLength="4"/>
          </span>
          <span className="y">Высота: <input type="text" onChange={this.onChangeY} size="4" maxLength="4"/></span>
          <button className="start-game" onClick={() => {
            this.props.changeXY(x,y);
            document.querySelector('.field').style.display = 'block';
          }
          }>Start Game</button>
          <Save changeSaveState={this.props.changeSaveState}/>
        </header>
    )
  }
}