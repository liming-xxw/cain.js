const createStore = (name, val) => {
  localStorage.setItem(name, val);
};
const getStore = (name) => {
  return () => {
    return localStorage.getItem(name);
  };
};

const updateStore = (name, val) => {
  localStorage.setItem(name, val);
};

const removeStore = (name) => {};

// 持久化插件
const intiStore = (option) => {
  const install = (app) => {
    app.addFn("createStore", (name, val) => {
      createStore(name, val);
    });
    app.addFn("getStore", (name) => {
      return getStore(name);
    });
    app.addFn("updateStore", (name, val) => {
      updateStore(name, val);
    });
  };
  return {
    install,
  };
};
window.intiStore = intiStore;
