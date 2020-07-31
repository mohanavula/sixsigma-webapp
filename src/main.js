import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

window.EventDispatcher = new class {
  constructor() {
      this.vue = new Vue();
  }

  fire(event, data = null) {
      this.vue.$emit(event, data);
  }

  listen(event, callback) {
      this.vue.$on(event, callback);
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
