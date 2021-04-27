<template>
  <div class="om-vehicle-cart-card">
    <div v-if="data.active" class="active-content">
      Active
    </div>
    <SfCallToAction class="header">
      <template #title>
        <SfImage
          :src="data.imgUrl"
        />
      </template>
      <template #button>
        <h3 class="title">
          {{ data.title }}
        </h3>
      </template>
    </SfCallToAction>
  </div>
</template>

<script>
import { SfImage, SfCallToAction } from '@storefront-ui/vue';
import LHeaderStatus from 'theme/components/lexas/l-header-status.vue';

export default {
  name: 'OmVehicleCartCard',
  components: {
    SfImage,
    SfCallToAction,
    LHeaderStatus
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          active: false,
          imgUrl:
            'https://uc.uxpin.com/files/1182538/1139806/2020_BMW_3Series_MSport_Saloon_600x450_-54bcb8eec58507bb248e528a5d7b1c23.jpg',
          title: 'BMW 330i M Sport 2020'
        }
      }
    }
  }
  // methods: {
  //   handleClick () {
  //     console.log('hey')
  //   }
  // }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.om-vehicle-cart-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  overflow: hidden;
  background: white;
  margin: var(--spacer-sm) 0;
  cursor: pointer;
  @include for-desktop {
    ::v-deep .sf-call-to-action {
      --call-to-action-padding: 0 0;
      --call-to-action-text-container-width: 45%;
      min-height: 100%;
      padding: var(--spacer-base) 0px;
    }
  }
  .active-content {
    background: var(--c-primary);
    position: absolute;
    overflow: hidden;
    padding: 2px var(--spacer-xl);
    border-top-left-radius: var(--border-radius);
    font-weight: 700;
    font-size: 24px;
    color: white;
    letter-spacing: 3px;
    z-index: 1;
  }
  // &:hover {
  //   .title {
  //     text-decoration: underline;
  //   }
  // }
  .sf-image {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    color: var(--c-grey-text);
    font-size: var(--spacer-base);
    margin-top: 0;
    width: 50%;
    padding-right: var(--spacer-xl);
  }
  .check__icon {
    position: relative;
    top: -65px;
    right: 0;
  }
}
</style>
