import React, {Component } from 'react';

import './field.css';
import Save from "../save";

let field = [];
let fieldPrev = [];
let countLife = 0;
let timer;

export default class Field extends Component {
  state = {
    x: 0,
    y: 0,
    generationCount: 0
  }

  componentDidMount() {
    const {x, y} = this.props;
    this.setState(() => {return {x, y}});
    this.goLife(x,y);
  }

  componentDidUpdate(prevProps,prevState) {
    const {x, y, loadField} = this.props;
    const { generationCount } = this.state;
    if (x !== prevProps.x || y !== prevProps.y) {
      this.setState(() => {return {x, y}})
      this.goLife(x,y);
    }
    if (generationCount !== prevState.generationCount) this.setState(() => {return {generationCount}});
    if (loadField !== prevProps.loadField) {
      field = JSON.parse(JSON.stringify(loadField));
      this.drawField();
    }
  }

  goLife = (n,m) => { //создает поле необходимого размера
    for (let i = 0; i < m; i++) {
      field[i] = [];
      for (let k = 0; k < n; k++) {
        field[i][k] = 0
      }
    }
  }

  clickField = (event) => { // считывание клика по полю и отрисовка
    const newEvent = event.nativeEvent;
    let x = newEvent.offsetX;
    let y = newEvent.offsetY;
    x = Math.floor(x/10);
    y = Math.floor(y/10);
    field[y][x] = 1;
    this.drawField(event.currentTarget);
    this.props.changeHistoryFields(field);
  }

  drawField = () => { //рисуется точка на поле
    const { x, y } = this.state;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, x*10, y*10);
    countLife = 0;
    for (let i = 0; i < y; i++) {
      for (let k = 0; k < x; k++) {
        if (field[i][k] === 1) {
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
    let nextField = [];
    for (let i = 0; i < y; i++) {
      nextField[i] = [];
      for (let k = 0; k < x; k++) {
        let neighbors;
        if (field[i][k] === 1) {
          neighbors = countNeighbors(i, k, 1);
          (neighbors === 2 || neighbors === 3) ? nextField[i][k] = 1 : nextField[i][k] = 0;
        }
        if (field[i][k] === 0) {
          neighbors = countNeighbors(i, k, 0);
          (neighbors === 3) ? nextField[i][k] = 1 : nextField[i][k] = 0;
        }
      }
    }
    fieldPrev = [...field];
    field = [...nextField];
    drawField();
    this.props.changeHistoryFields(field);
    this.setState((state) => {return {generationCount: state.generationCount +1}});
    timer = setTimeout(startLife, 500);
    gameOver();
  }

  gameOver = () => {
    if (fieldPrev.join() === field.join() || countLife === 0) {
      this.pauseTimeout();
      alert('Game over');
      this.setState({generationCount: 0});
    }
  }

  pauseTimeout = () => {
    clearTimeout(timer);
  }

  countNeighbors = (i, k, value) => {
    const { x, y } = this.state;
    const { fpm, fpp } = this;
    let neighbors = 0;
    if (field[fpm(i, y)-1][k] === 1 && field[i][k] === value) neighbors++; //проверка верхнего соседа (по оси y)
    if (field[i][fpp(k, x)+1] === 1 && field[i][k] === value) neighbors++; // проверка по правой границе (по оси x)
    if (field[fpp(i, y)+1][k] === 1 && field[i][k] === value) neighbors++; //проверка нижнего соседа
    if (field[i][fpm(k, x)-1] === 1 && field[i][k] === value) neighbors++; // проверка слева (по оси x)
    if (field[fpm(i, y)-1][fpp(k, x)+1] === 1 && field[i][k] === value) neighbors++; // по диагонали правый верхний угол
    if (field[fpp(i, y)+1][fpp(k, x)+1] === 1 && field[i][k] === value) neighbors++; // по диагонали правый нижний угол
    if (field[fpp(i, y)+1][fpm(k, x)-1] === 1 && field[i][k] === value) neighbors++; // по диагонали левый нижний угол
    if (field[fpm(i, y)-1][fpm(k, x)-1] === 1 && field[i][k] === value) neighbors++; // по диагонали левый верхний угол
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
    const {x, y, generationCount} = this.state;
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
            <Save changeName={this.props.changeName}/>
          </div>
          <p>Поколение: {generationCount}</p>
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