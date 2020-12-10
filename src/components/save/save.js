import React, {Component, Fragment} from 'react';

export default class Save extends Component {

  save = () => {

    this.props.changeSaveState();
  }

  render() {
    return (
        <Fragment>
          <button className="load">Load State</button>
          <button className="save" onClick={this.save}>Save State</button>
        </Fragment>
    )
  }
}