<template>
  <div>
    <div v-if="item">
      <div>{{ item[`message${camelCasePosition}`] }}</div>
    </div>
  </div>
</template>

<script>
import LexascmsItemMixin from 'src/modules/vsf-lexascms/src/mixins/LexascmsItem';

export default {
  mixins: [ LexascmsItemMixin ],

  props: {
    contentType: {
      type: String,
      default: 'headerStatus'
    },
    position: {
      type: String,
      default: 'center'
    }
  },

  computed: {
    camelCasePosition () {
      return this.position.charAt(0).toUpperCase() + this.position.slice(1)
    }
  }
}
</script>
