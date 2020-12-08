import React, {Component} from 'react';
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
          <span className="x">Ширина: <input type="text" onChange={this.onChangeX} size="3"/>
          </span>
          <span className="y">Высота: <input type="text" onChange={this.onChangeY} size="3"/></span>

          <button className="start-game" onClick={(event) => {
            this.props.changeXY(x,y, event.currentTarget);
            document.querySelector('.field').style.display = 'block';
          }
          }>Start Game</button>
        </header>
    )
  }
}