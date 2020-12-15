import React, {Component, Fragment} from 'react';

export default class Save extends Component {

  state = {
    name: null
  }

  componentDidUpdate(prevProps, prevState) {
    const { name } = this.state;
    if (name !== prevState.name) {
      this.setState({name});
    }
  }

  addInput = (event) => {
    event.target.style.display = 'none';
    document.querySelector('.name').style.display = 'inline-block';
  }

  onChangeName = (event) => {
    const val = event.currentTarget.value;
    this.setState({
      name: val
    });
  }

  render() {
    const { name } = this.state;
    return (
        <Fragment>
          <button className="save" onClick={(event) => {this.addInput(event)}}>Save State</button>
          <span className="name">Введите имя:
            <input id="text" type="text" size="8" onChange={this.onChangeName}/>
            <button className="ok" onClick={() => {
              this.props.changeName(name);
              document.getElementById('text').value = "";
              document.querySelector('.name').style.display = 'none';
              document.querySelector('.save').style.display = 'inline-block';
            }}>OK</button>
          </span>
        </Fragment>
    )
  }
}