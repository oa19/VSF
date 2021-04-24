<template>
  <div class="om-header-status">
    <div class="status-item">
      <SfImage :width="30" :height="40" src="/assets/icons8-large-courier-truck-64.png" />
      <span>{{ title }}</span>
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
import StoryblokMixin from 'src/modules/storyblok/components/StoryblokMixin';

export default {
  name: 'OmHeaderStatus',
  components: {
    SfImage,
    LHeaderStatus
  },
  mixins: [StoryblokMixin],
  computed: {
    ...mapState({
      isWebpSupported: (state) => state.ui.isWebpSupported
    }),
    title () {
      return this.story && this.story['global'] ? this.story['global'].content.header_links[1].confidence_message[0].confidence_title : '';
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.om-header-status {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #16a085;
  color: white;
  height: 60px;
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
