import React, {Component } from 'react';

import "./history.css";

function NewHistoryState(id, x, y, name, arr) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.name = name;
  this.arr = [...arr];
  return;
}

export default class History extends Component {

  state = {
    id: 0,
    history: [],
  }

  componentDidUpdate(prevProps) {
    const {x, y, name, historyField} = this.props;
    if (name !== prevProps.name) {
      this.setState((state) => {
        const currentField = JSON.parse(JSON.stringify(historyField));
        const newObj = new NewHistoryState(state.id, x, y, name, currentField);
        const history = [newObj, ...state.history];
        return {
          history,
          name,
          id: state.id + 1
        }
      });
    }
  }

  render() {
    const { history } = this.state;
    return (
        <div className="history">
          <h2>История игры</h2>
          <table className="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Width</th>
              <th>Height</th>
              <th></th>
            </tr>
            </thead>
            <tbody id="table__body">
            { history.map(item => {
              return (<tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.x}</td>
                <td>{item.y}</td>
                <td><button onClick={() => {this.props.changeStateLoadField(item.arr, item.x, item.y)}}>Load</button></td>
              </tr>)
            })}
            </tbody>
          </table>
        </div>
    )
  }
}