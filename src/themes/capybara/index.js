import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore';
import App from './App';
import routes from './router';
import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import '@vue-storefront/core/lib/passive-listeners';
import { once } from '@vue-storefront/core/helpers';
import { module as cartModule } from './store/cart';

import { claimsStore } from 'theme/store/claims';
import { vehiclesStore } from 'theme/store/vehicles';
import { homepageStore } from 'theme/store/homepage';
import { uiStore } from 'theme/store/ui';
import { promotedStore } from 'theme/store/promoted-offers';
import { instagramStore } from 'theme/store/instagram-images';
import { defaultContentStore } from 'theme/store/default-content';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

import Page from 'theme/components/storyblok/Page'
import Teaser from 'theme/components/storyblok/Teaser'

Vue.component('page', Page)
Vue.component('teaser', Teaser)

once('__VUE_EXTEND_DROPPOINT_VPB__', () => {
  Vue.use(VueProgressBar);
});

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.eventSetDrag = function () {
      el.setAttribute('data-dragging', 'yes');
    }
    el.eventClearDrag = function () {
      el.removeAttribute('data-dragging');
    }
    el.eventOnClick = function (event) {
      var dragging = el.getAttribute('data-dragging');
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el === event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.addEventListener('touchstart', el.eventClearDrag);
    document.addEventListener('touchmove', el.eventSetDrag);
    document.addEventListener('click', el.eventOnClick);
    document.addEventListener('touchend', el.eventOnClick);
  },
  unbind: function (el) {
    document.removeEventListener('touchstart', el.eventClearDrag);
    document.removeEventListener('touchmove', el.eventSetDrag);
    document.removeEventListener('click', el.eventOnClick);
    document.removeEventListener('touchend', el.eventOnClick);
    el.removeAttribute('data-dragging');
  }
});

const themeEntry = App;
function initTheme (app, router, store, config) {
  store.registerModule('themeCart', cartModule);
  // Register theme routes for the current store. In a single store setup this will add routes exactly as they are in the router definition file '[theme]/router/index.js'
  // In a multistore setup, it depends on the config setting 'appendStoreCode' for the current store
  // - true = the store code will be added to the front of all routes, e.g. name: 'de-checkout', path: '/de/checkout'
  // - false = the store code will not be added. In this case you need to define custom routes for each of your stores
  // You can also define custom routes to use a different component, for example for German storeView checkout
  // To do so, exclude the desired storeView from the config.storeViews.mapStoreUrlsFor, set appendStoreCode = false, and map all the urls by your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized }
  // The 4th parameter is the route priority - a higher number will ensure the theme routes override any module routes. The default is 0.
  setupMultistoreRoutes(config, router, routes, 10);

  StorageManager.init('claims');
  store.registerModule('claims', claimsStore);
  store.registerModule('homepage', homepageStore);
  store.registerModule('ui', uiStore);
  store.registerModule('promoted', promotedStore);
  store.registerModule('instagram', instagramStore);
  store.registerModule('defaultContent', defaultContentStore);
  store.registerModule('vehicles', vehiclesStore);
}

export { themeEntry, initTheme };
