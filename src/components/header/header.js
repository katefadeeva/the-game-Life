import React, {Component} from 'react';

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
        <div className="header">
          <p className="x">Введите x:</p>
          <input type="text" onChange={this.onChangeX}/>
          <p className="y">Введите y:</p>
          <input type="text" onChange={this.onChangeY}/><br/>
          <button className="start" onClick={(event) => {
            this.props.changeXY(x,y, event.currentTarget);
          }
          }>Start Game</button>
          <p>X:{x}, Y:{y}</p>
        </div>
    )
  }
}