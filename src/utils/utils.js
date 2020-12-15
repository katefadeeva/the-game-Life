function isEquals(obj1, obj2) {
  return (obj1.name === obj2.name &&
      obj1.arr.join() === obj2.arr.join() &&
      obj1.x === obj2.x &&
      obj1.y === obj2.y);
}

export default isEquals;