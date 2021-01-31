<template>
  <div class="filter-select">
    <SfButton
      class="color-light-variant button-wrapper"
      @click="selectButtonHandler()"
    >
      <div class="button-wrapper">
        <span class="button-text">{{ selectButtonData.text }}</span>
        <SfIcon
          v-if="selectButtonData.popupIsOpen"
          icon="chevron_up"
          size="xxs"
          color="black"
          view-box="0 0 24 24"
          :coverage="1"
        />
        <SfIcon
          v-else
          icon="chevron_down"
          size="xxs"
          color="black"
          view-box="0 0 24 24"
          :coverage="1"
        />
      </div>
    </SfButton>
    <div class="filter-button-content" v-show="selectButtonData.popupIsOpen">
      <SfButton
        v-for="(d, index) in popupData"
        :key="index"
        class="color-light-variant"
      >
        <div class="button-wrapper filter-button">
          <SfIcon
            icon="chevron_up"
            size="xxs"
            color="black"
            view-box="0 0 24 24"
            :coverage="1"
          />
          <span class="button-text">{{ d.text }} ({{ d.quantity }})</span>
        </div>
      </SfButton>
    </div>
  </div>
</template>

<script>
import { SfButton, SfIcon } from '@storefront-ui/vue';

export default {
  components: {
    SfButton,
    SfIcon
  },
  props: {
    selectButtonData: {
      type: Object
    },
    popupData: {
      type: Array
    }
  },
  data () {
    return {
      mock: [1, 2, 3, 4]
    };
  },
  methods: {
    selectButtonHandler () {
      this.$emit('update-status', this.selectButtonData.text);
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-select {
  .filter-button-content {
    position: absolute;
    z-index: 1;
    border: 1px solid #dedede;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    padding: 1.8rem 1rem;
    background: white;
    border-radius: var(--border-radius);
    margin-top: 10px;
  }
  .button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .sf-icon {
      margin-left: 1.5rem;
    }
    .button-text {
      font-size: 16px;
      font-weight: 400;
    }
    &.filter-button {
      margin-left: -1rem;
      .sf-icon {
        margin-left: 0;
      }
      .button-text {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
