<template>
  <div class="om-add-cart-step1">
    <SfCallToAction
      class="header"
      :title="$t(`It's fit`)"
      :description="$t('BMW 330i M Sport 2020')"
      image="/assets/hero/background.jpg"
    >
      <template #button>
        <div class="check__icon">
          <SfCircleIcon
            class="icon"
            icon="chevron_down"
            icon-size="20px"
            icon-color="white"
            disabled
          />
        </div>
      </template>
    </SfCallToAction>
    <div class="footer" @click="openVehicleCart({ type: 'vehiclecart' })">
      <span>Change Vehicle</span>
      <SfIcon
        icon="chevron_right"
        size="xxs"
        color="white"
        role="button"
        class="button"
      />
    </div>
  </div>
</template>

<script>
import {
  SfImage,
  SfCallToAction,
  SfIcon,
  SfCircleIcon,
  SfButton
} from '@storefront-ui/vue';
import { mapActions } from 'vuex';

export default {
  name: 'OmAddCartStep1',
  components: {
    SfImage,
    SfCallToAction,
    SfIcon,
    SfCircleIcon,
    SfButton
  },
  data () {
    return {
      logosMock: new Array(11).fill('assets/brand/Jaguar.png')
    };
  },
  methods: {
    ...mapActions({
      openVehicleCart: 'ui/toggleSidebar'
    })
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.om-add-cart-step1 {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: var(--border-radius);
  overflow: hidden;
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacer-xs) var(--spacer-sm);
    background: var(--c-primary);
    color: white;
    cursor: pointer;
  }
  .check__icon {
    position: relative;
    top: -65px;
    right: 0;
  }
}

::v-deep {
  --call-to-action-padding: var(--spacer-xs) var(--spacer-sm);
  .sf-button:disabled {
    --button-background: var(--c-primary);
  }
  --button-size: 2.25rem;
}
</style>
