import React, {Component } from 'react';
import isEquals from "../../utils/utils";

export default class History extends Component {

  state = {
    arrHistory: [],
    obj: {
      name: null,
      arr: [],
      x: 0,
      y: 0
    }
  }

  componentDidUpdate(prevProps) {
    const { obj } = this.props;
    if (!isEquals(obj, prevProps.obj)) {
      let newObj = {};
      Object.assign(newObj, obj);
      this.setState((state) => {
        console.log(newObj.arr);
        console.log(state.arrHistory);
        const arrHistory = [...state.arrHistory, newObj];
        return {
          obj: newObj,
          arrHistory
        }
      })
    }
  }

  render() {
    const {obj, arrHistory } = this.state;
    // console.log(obj);
    console.log(arrHistory);
    return (
        <div>
          <p>{(obj) ? obj.name : null}</p>
        </div>
    )
  }
}