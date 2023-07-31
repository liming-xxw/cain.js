const createStore = (name, val) => {};
const getStore = (name) => {};
// 持久化插件
const intiStore = (app) => {
  const install = (app) => {};

  console.log(app);
  app.store = {};
  app.store.createStore = createStore;
  app.store.getStore = getStore;
  return {
    install,
  };
};
window.intiStore = intiStore;
