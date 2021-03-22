<template>
  <div class="om-add-cart-step2">
    <SfRadio
      v-for="d in data"
      :key="d.value"
      :name="d.value"
      :value="d.value"
      :selected="selectedRadio"
      @input="clickHanlder(d.value)"
    >
      <template #label>
        <div class="label-wrapper">
          <span>{{ d.label }}</span>
          <span class="label-price">{{ d.price }}</span>
        </div>
      </template>
    </SfRadio>
  </div>
</template>

<script>
import { SfRadio } from '@storefront-ui/vue';

export default {
  name: 'OmAddCartStep2',
  components: {
    SfRadio
  },
  data () {
    return {
      data: [
        { label: 'Home Delivery', price: '', value: 'homeDelivery' },
        { label: 'Click & Collect', price: 'Free', value: 'clickCollect' },
        {
          label: 'Have this item fitted by us',
          price: '+£20',
          value: 'haveItem'
        }
      ],
      selectedRadio: 'homeDelivery'
    };
  },
  methods: {
    clickHanlder (value) {
      this.selectedRadio = value;
    }
  }
};
</script>
<style lang="scss" scoped>
.om-add-cart-step2 {
  display: flex;
  flex-direction: column;
  .sf-radio {
    background: white;
    margin: calc(var(--spacer-sm) * 0.3) 0;
    padding: var(--spacer-xs) var(--spacer-sm);
    border-radius: var(--border-radius);
  }
  .label-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label-price {
      font-weight: 600;
      font-size: 20px;
      color: var(--add-cart-step-text-color);
    }
  }
}

::v-deep {
  --radio-container-align-items: center;
  .sf-radio--is-active {
    background: transparent;
  }
}
</style>
