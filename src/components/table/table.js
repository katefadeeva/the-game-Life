import React, {Component} from 'react';

import './table.css';

export default class Table extends Component {
  state = {
    history: []
  }

  componentDidUpdate(prevProps) {
    const { history } = this.props;
    if (JSON.stringify(history) !== JSON.stringify(prevProps.history)) {
      this.setState((state) => {
        const newHistory = [...history];
        return {history: newHistory}
      });
    }
  }

  render() {
    const { history } = this.state;
    return (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Width</th>
              <th>Height</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          { history.map(item => {
            return (<tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.x}</td>
              <td>{item.y}</td>
              <td><button>Load</button></td>
            </tr>)
          })}
          </tbody>
        </table>
    )
  }
}