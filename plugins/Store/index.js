const createStore = (name, val) => {
  localStorage.setItem(name, val);
};
const getStore = (name) => {
  localStorage.getItem(name);
};

// 持久化插件
const intiStore = (option) => {
  const install = (app) => {
    app.addFn("createStore", (name, val) => {
      createStore(name, val);
    });
    app.addFn("getStore", (name) => {
      getStore(name);
    });
  };
  return {
    install,
  };
};
window.intiStore = intiStore;
