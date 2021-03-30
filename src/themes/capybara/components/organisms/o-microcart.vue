<template>
  <component
    v-if="sidebar.open || isMicrocartComponentLoaded || isVehicleCartLoaded"
    :is="currentComponent"
    @close="$store.commit('ui/closeSidebar')"
    @reload="reloadComponent()"
  />
</template>

<script>
import { mapState } from 'vuex';
import ALoadingSpinner from 'theme/components/atoms/a-loading-spinner';
import ALoadingError from 'theme/components/atoms/a-loading-error';

const OMicrocartPanel = () =>
  import(
    /* webpackChunkName: "vsf-microcart" */ 'theme/components/organisms/o-microcart-panel'
  );
const OmVehicleCart = () =>
  import(
    /* webpackChunkName: "vsf-microcart" */ 'theme/components/omni/om-vehicle-cart/index'
  );

export default {
  data () {
    return {
      isMicrocartComponentLoaded: false,
      isVehicleCartLoaded: false,
      theMicrocartAsyncComponent: () => ({
        component: OMicrocartPanel().then((component) => {
          this.isMicrocartComponentLoaded = true;
          return component;
        }),
        loading: ALoadingSpinner,
        error: ALoadingError,
        timeout: 3000
      }),
      theVehicleCartAsyncComponent: () => ({
        component: OmVehicleCart().then((component) => {
          this.isVehicleCartLoaded = true;
          return component;
        }),
        loading: ALoadingSpinner,
        error: ALoadingError,
        timeout: 3000
      })
    };
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.ui.sidebar
    }),
    currentComponent () {
      return this.sidebar.type === 'microcart' ? this.theMicrocartAsyncComponent : this.theVehicleCartAsyncComponent
    }
  },
  methods: {
    reloadComponent () {
      this.sidebar.type === 'microcart'
        ? (this.theMicrocartAsyncComponent = () => ({
          component: OMicrocartPanel().then((component) => {
            this.isMicrocartComponentLoaded = true;
            return component;
          }),
          loading: ALoadingSpinner,
          error: ALoadingError,
          timeout: 3000
        }))
        : (this.theVehicleCartAsyncComponent = () => ({
          component: OmVehicleCart().then((component) => {
            this.isVehicleCartLoaded = true;
            return component;
          }),
          loading: ALoadingSpinner,
          error: ALoadingError,
          timeout: 3000
        }));
    }
  }
};
</script>
