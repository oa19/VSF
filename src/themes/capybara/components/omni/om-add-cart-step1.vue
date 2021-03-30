<template>
  <div class="om-add-cart-step1">
    <SfCallToAction
      :class="[{ 'is-fit': isFit }, 'header']"
      :title="$t(title)"
      :description="description"
      :image="image"
    >
      <template #button v-if="isFit">
        <div class="check__icon is-fit">
          <SfCircleIcon
            class="icon"
            icon="chevron_down"
            icon-size="20px"
            icon-color="white"
            disabled
          />
        </div>
      </template>
      <template #button v-else>
        <div class="check__icon not-fit">
          <SfCircleIcon
            class="icon"
            icon="cross"
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
import { SfCallToAction, SfIcon, SfCircleIcon } from '@storefront-ui/vue';
import { mapActions } from 'vuex';

export default {
  name: 'OmAddCartStep1',
  components: {
    SfCallToAction,
    SfIcon,
    SfCircleIcon
  },
  props: {
    isFit: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  },
  computed: {
    title () {
      return this.isFit ? `It's fit` : `This product does not fit your`;
    }
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
  background: white;
  .sf-call-to-action {
    &.is-fit {
      background-position: right;
      background-size: contain;
      background-size: 50%;
      ::v-deep .sf-call-to-action__title {
        font-size: 55px;
        font-weight: bold;
        text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb,
          0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px RGB(0 0 0 / 10%),
          0 0 5px RGB(0 0 0 / 10%), 0 1px 3px RGB(0 0 0 / 30%),
          0 3px 5px RGB(0 0 0 / 20%), 0 5px 10px RGB(0 0 0 / 25%),
          0 10px 10px RGB(0 0 0 / 20%), 0 20px 20px RGB(0 0 0 / 15%);
      }
      ::v-deep .sf-call-to-action__description {
        font-weight: bold;
        font-style: italic;
        font-size: 20px;
        color: #2b2b2b;;
        text-shadow: 1px 1px 2px #d8d6d6;
      }
    }
  }
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
    &.not-fit {
      ::v-deep .sf-button {
        --button-background: #808080;
      }
    }
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
