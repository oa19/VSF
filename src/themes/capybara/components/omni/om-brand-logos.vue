<template>
  <div class="om-brand-logos">
    <div v-for="logo in logosMock" :key="logo" class="logo-wrapper">
      <SfImage :src="logo" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import {
  SfImage
} from '@storefront-ui/vue';

export default {
  name: 'OmBrandLogos',
  components: {
    SfImage
  },
  data () {
    return {
      logosMock: new Array(11).fill('assets/brand/Jaguar.png')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.om-brand-logos {
  display: flex;
  // flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: white;
  .logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--spacer-xs);
    border: 1px solid var(--_c-gray-accent-lighten);
  }
}

::v-deep .sf-image img {
  height: auto !important;
  width: 100px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.2)
  }
}
</style>
