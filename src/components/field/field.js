import React, {Component} from 'react';

import './field.css';

export default class Field extends Component {
  state = {
    x: 0,
    y: 0,
  }

  mas = []

  componentDidMount() {
    const {x, y} = this.props;
    this.setState({
      width: x,
      height: y
    })
    this.goLife(x,y);
  }

  componentDidUpdate(prevProps) {
    const {x, y} = this.props;
    if (x !== prevProps.x || y !== prevProps.y) {
      this.setState({
        x: x,
        y: y
      })
    }
    this.goLife(x,y);
  }

  goLife = (n,m) => { //создает поле необходимого размера
    for (let i = 0; i < m; i++) {
      this.mas[i] = [];
      for (let j = 0; j < n; j++) {
        this.mas[i][j] = 0
      }
    }
  }

  clickField = (event) => {
    const newEvent = event.nativeEvent;
    let x = newEvent.offsetX;
    let y = newEvent.offsetY;
    x = Math.floor(x/10);
    y = Math.floor(y/10);
    this.mas[y][x] = 1;
    this.drawField(event.currentTarget);
  }

  drawField = (target) => {
    const { x, y } = this.state;
    const ctx = target.getContext('2d');
    ctx.clearRect(0, 0, x*10, y*10);
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        if (this.mas[i][j] === 1) {
          ctx.fillRect(j*10, i*10, 10,10);
        }
      }
    }
  }



  render() {
    const {x, y} = this.state;
    return (
        <canvas id="canvas"
                width={`${x*10}px`}
                height={`${y*10}px`}
                onClick={(event) => {
                  this.clickField(event) }
                }>
        </canvas>
    )
  }
}