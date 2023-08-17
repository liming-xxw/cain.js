const AppStore = new Map();
const AppFnStore = new Map();
// 创建一个全局组件缓存
const createStore = (name, val, app) => {
  const use = app.addBucket();
  AppStore.set(name, use);
  localStorage.setItem(name, val);
};
const getStore = (name, app) => {
  return (cause, fn) => {
    if (cause) {
      if (!AppFnStore.has(name)) {
        app.setBucket(AppStore.get(name), cause);
      }
      AppFnStore.set(name, cause);
      fn(AppStore.get(name));
    }
    return localStorage.getItem(name);
  };
};

const updateStore = (name, val, app) => {
  localStorage.setItem(name, val);
  const effcts = app.getBucketFn(AppStore.get(name), AppFnStore.get(name));
  console.log(effcts);
  effcts &&
    effcts.forEach((fn) => {
      fn();
    });
};

const removeStore = (name) => {};

// 持久化插件
const intiStore = (option) => {
  const install = (app) => {
    app.addFn("createStore", (name, val) => {
      createStore(name, val, app);
    });
    app.addFn("getStore", (name) => {
      return getStore(name, app);
    });
    app.addFn("updateStore", (name, val) => {
      updateStore(name, val, app);
    });
  };
  return {
    install,
  };
};
window.intiStore = intiStore;
