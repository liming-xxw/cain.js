const createStore = (name,val) => {
  
};
const getStore = (name) => {};
// 持久化插件
const intiStore = (app) => {
  app.store = {};
  app.store.createStore = createStore;
  app.store.getStore = getStore
};
window.intiStore = intiStore;
