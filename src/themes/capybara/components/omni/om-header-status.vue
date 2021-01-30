<template>
  <div class="om-header-status">
    <div class="status-item">
      <SfImage :width="30" :height="40" src="/assets/icons8-large-courier-truck-64.png" />
      <LHeaderStatus position="left" class="status-item-title" id="0a351517-3e71-4bc4-b259-b67d8e68e4b9" />
    </div>
    <div class="status-item">
      <SfImage :width="30" :height="40" src="/assets/icons8-large-courier-truck-64.png" />
      <LHeaderStatus position="center" class="status-item-title" id="0a351517-3e71-4bc4-b259-b67d8e68e4b9" />
    </div>
    <div class="status-item">
      <SfImage :width="30" :height="40" src="/assets/icons8-large-courier-truck-64.png" />
      <LHeaderStatus position="right" class="status-item-title" id="0a351517-3e71-4bc4-b259-b67d8e68e4b9" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import {
  SfImage
} from '@storefront-ui/vue';
import LHeaderStatus from 'theme/components/lexas/l-header-status.vue';

export default {
  name: 'OmHeaderStatus',
  components: {
    SfImage,
    LHeaderStatus
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.om-header-status {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: var(--c-primary);
  color: white;
  .status-item {
    display: flex;
    justify-content: center;
    align-items: center;
    .status-item-title {
      margin-left: 1em;
    }
  }
}
</style>
