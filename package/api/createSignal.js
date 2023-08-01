import { addBucket } from "../responsive";

const createSignal = (val) => {
  const use =  addBucket();
  let value = val;
  const get = (cuse) => {
    if (cuse) bucket[use].use = cuse;
    return value;
  };
  const set = (cain) => {
    value = cain;
    bucket[use].fn.forEach((fn) => {
      fn();
    });
  };
  return [get, set];
};
window.createSignal = createSignal;
