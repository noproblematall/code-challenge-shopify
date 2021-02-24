import 'core-js';

import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import VueScript2 from 'scripts/lib/script2';
import VueLazyLoad from 'vue-lazyload';
import VueMq from 'vue-mq';
import { mapState } from 'vuex';

import { loading } from 'scripts/config/images.js';
import components from './components/index.js';
import store from './store/index.js';
import { ucfirst, upcase, unhandleize } from './filters/string.js';
import { money, moneyWithoutDecimals } from './filters/money.js';

__webpack_public_path__ = window.__webpack_public_path__; // eslint-disable-line no-underscore-dangle, camelcase

const cssVars = require('../styles/variables.scss');

Vue.config.productionTip = false;

Vue.use(Vue2TouchEvents);
Vue.use(VueScript2);

Vue.use(VueLazyLoad, {
  loading,
  preload: 1.3,
  attempt: 1,
});

Vue.use(VueMq, {
  breakpoints: {
    mobile: parseInt(cssVars.breakTablet, 10),
    tablet: parseInt(cssVars.breakDesktop, 10),
    desktop: parseInt(cssVars.breakHd, 10),
    hd: Infinity,
  },
});

Vue.filter('ucfirst', ucfirst);
Vue.filter('upcase', upcase);
Vue.filter('unhandleize', unhandleize);
Vue.filter('money', money);
Vue.filter('moneyWithoutDecimals', moneyWithoutDecimals);

new Vue({
  store,
  comments: true,
  components,
  computed: {
    ...mapState({
      checkout: state => state.cart
    }),
    featuredProductSlidesToShow() {
      if (this.$mq === 'mobile') return 1.8;
      if (this.$mq === 'tablet') return 3;
      return 4;
    },
  },
  created() {
    // on creation, initialize app data
    this.$store.dispatch('cart/init');
    this.$store.dispatch('products/init');
  },
  mounted() {
    // on mount, start listening for load events
    // on a section load, re-mount section to reflect admin changes
    document.addEventListener('shopify:section:load', (event) => {
      const sectionContainer = document.getElementById(event.target.id);
      const NewComponent = Vue.extend({
        components,
        template: event.target.innerHTML,
      });
      const component = new NewComponent().$mount();

      sectionContainer.innerHTML = '';
      sectionContainer.appendChild(component.$el);
    });
  },
}).$mount('#app');
