import { addBucket, setBucket, getBucketFn } from "../responsive";

const createSignal = (val) => {
  const use = addBucket();
  let cuse = null;
  let value = val;
  const get = (cause, fn) => {
    if (cause) {
      console.log("xiaoxiwen");
      setBucket(use, cause);
      cuse = cause;
      fn(use);
    }
    return value;
  };
  const set = (cain) => {
    value = cain;
    const effcts = getBucketFn(use, cuse);
    effcts &&
      effcts.forEach((fn) => {
        fn();
      });
  };
  return [get, set];
};

window.createSignal = createSignal;
