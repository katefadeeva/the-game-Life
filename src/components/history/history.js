import React, {Component } from 'react';
import Table from "../table";

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
        const currentField = new Array(historyField);
        const newObj = new NewHistoryState(state.id, x, y, name, currentField);
        const history = [...state.history, newObj];
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
          <Table history={history} />
        </div>
    )
  }
}