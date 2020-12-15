import React, {Component } from 'react';

import './field.css';
import Save from "../save";

let mas = [];
let masPrev = [];
let countLife = 0;
let timer;

export default class Field extends Component {
  state = {
    x: 0,
    y: 0,
    count: 0,
    mas2: []
  }

  componentDidMount() {
    const {x, y} = this.props;
    this.setState({
      width: x,
      height: y
    })
    this.goLife(x,y);
  }

  componentDidUpdate(prevProps,prevState) {
    const {x, y} = this.props;
    const { count, mas2 } = this.state;
    if (x !== prevProps.x || y !== prevProps.y) {
      this.setState({x, y})
      this.goLife(x,y);
    }
    if (count !== prevState.count) this.setState({count});
    if (mas2.join() !== prevState.mas2.join()) {
      this.setState((state) => {
        const newArr = [...mas2];
        return { mas2: newArr }
      })
    }
  }

  goLife = (n,m) => { //создает поле необходимого размера
    for (let i = 0; i < m; i++) {
      mas[i] = [];
      for (let k = 0; k < n; k++) {
        mas[i][k] = 0
      }
    }
  }

  clickField = (event) => { // считывание клика по полю и отрисовка
    const newEvent = event.nativeEvent;
    let x = newEvent.offsetX;
    let y = newEvent.offsetY;
    x = Math.floor(x/10);
    y = Math.floor(y/10);
    mas[y][x] = 1;
    this.drawField(event.currentTarget);
    this.setState((state) => {
      let newArr = [...mas];
      return {mas2: newArr}
    })
  }

  drawField = () => { //рисуется точка на поле
    const { x, y } = this.state;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, x*10, y*10);
    countLife = 0;
    for (let i = 0; i < y; i++) {
      for (let k = 0; k < x; k++) {
        if (mas[i][k] === 1) {
          countLife++;
          ctx.fillStyle = 'rgb(85, 67, 168)';
          ctx.fillRect(k*10, i*10, 10,10);
        } else {
          countLife--;
        }
      }
    }
  }

  startLife = () => {
    const { x, y } = this.state;
    const { countNeighbors, drawField, gameOver, startLife } = this;
    let mas3 = [];
    for (let i = 0; i < y; i++) {
      mas3[i] = [];
      for (let k = 0; k < x; k++) {
        let neighbors;
        if (mas[i][k] === 1) {
          neighbors = countNeighbors(i, k, 1);
          (neighbors === 2 || neighbors === 3) ? mas3[i][k] = 1 : mas3[i][k] = 0;
        }
        if (mas[i][k] === 0) {
          neighbors = countNeighbors(i, k, 0);
          (neighbors === 3) ? mas3[i][k] = 1 : mas3[i][k] = 0;
        }
      }
    }
    masPrev = [...mas];
    mas = [...mas3];
    drawField();
    this.setState((state) => {
      const mas2 = [...mas];
      return {
        count: state.count + 1,
        mas2
      }
    })
    timer = setTimeout(startLife, 500);
    gameOver();
  }

  gameOver = () => {
    if (masPrev.join() === mas.join() || countLife === 0) {
      this.pauseTimeout();
      alert('Game over');
      this.setState({count: 0});
    }
  }

  pauseTimeout = () => {
    clearTimeout(timer);
  }

  countNeighbors = (i, k, value) => {
    const { x, y } = this.state;
    const { fpm, fpp } = this;
    let neighbors = 0;
    if (mas[fpm(i, y)-1][k] === 1 && mas[i][k] === value) neighbors++; //проверка верхнего соседа (по оси y)
    if (mas[i][fpp(k, x)+1] === 1 && mas[i][k] === value) neighbors++; // проверка по правой границе (по оси x)
    if (mas[fpp(i, y)+1][k] === 1 && mas[i][k] === value) neighbors++; //проверка нижнего соседа
    if (mas[i][fpm(k, x)-1] === 1 && mas[i][k] === value) neighbors++; // проверка слева (по оси x)
    if (mas[fpm(i, y)-1][fpp(k, x)+1] === 1 && mas[i][k] === value) neighbors++; // по диагонали правый верхний угол
    if (mas[fpp(i, y)+1][fpp(k, x)+1] === 1 && mas[i][k] === value) neighbors++; // по диагонали правый нижний угол
    if (mas[fpp(i, y)+1][fpm(k, x)-1] === 1 && mas[i][k] === value) neighbors++; // по диагонали левый нижний угол
    if (mas[fpm(i, y)-1][fpm(k, x)-1] === 1 && mas[i][k] === value) neighbors++; // по диагонали левый верхний угол
    return neighbors;
  }

  fpm = (i, m) => {
    if (i === 0) return m;
    else return i;
  }

  fpp = (i, m) => {
    if (i === (m - 1)) return -1;
    else return i;
  }

  render() {
    const {x, y, count, mas2} = this.state;
    return (
        <div className="field">
          <div className="button-field">
            <button id="start"
                    onClick={this.startLife}
            >Start
            </button>
            <button id="pause"
                    onClick={this.pauseTimeout}
            >Pause
            </button>
            <Save changeSaveState={this.props.changeSaveState} mas={mas2}/>
          </div>
          <p>Поколение: {count}</p>
          <canvas id="canvas"
                  width={`${x*10}px`}
                  height={`${y*10}px`}
                  onClick={(event) => {
                    this.clickField(event) }
                  }>
          </canvas>
        </div>
    )
  }
}