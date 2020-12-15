import React, {Component, Fragment} from 'react';

function NewState(name, arr) {
  this.name = name;
  this.arr = [...arr];
  return;
}

export default class Save extends Component {

  state = {
    name: null,
    arr: []
  }

  componentDidMount() {
    const { mas } = this.props;
    this.setState((state) => {
      const arr = [...mas]
      return {arr}
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { name } = this.state;
    if (name !== prevState.name) {
      this.setState({
        name
      })
    }
    const { mas } = this.props;
    if (mas.join() !== prevProps.mas.join()) {
      this.setState((state) => {
        const arr = [...mas];
        return {arr};
      })
    }
  }

  addInput = () => {

  }

  onChangeName = (event) => {
    const val = event.currentTarget.value;
    this.setState({
      name: val
    });
  }

  save = () => {
    const { name, arr } = this.state;
    const { changeSaveState } = this.props;
    const obj = new NewState(name, arr);
    changeSaveState(obj);
  }

  render() {
    return (
        <Fragment>
          <button className="save" onClick={this.addInput}>Save State</button>
          <span className="name">Введите имя: <input type="text" size="8" onChange={this.onChangeName}/></span>
          <button className="ok" onClick={this.save}>OK</button>
        </Fragment>
    )
  }
}