<template>
  <div class="svg-container" id="svgContainer">
    <div v-if="loading">
      {{ loadingMessage }}
    </div>
    <svg-viewer-element
      v-else
      :image-code="imageCode"
      :image-id="imageId"
      :width="width"
      :height="height"
      @finishLoading="finishLoading"
    />
  </div>
</template>

<script>
import SvgViewerElement from './svg-viewer.vue';

export default {
  name: 'SvgViewer',
  components: {
    SvgViewerElement
  },
  props: {
    imageCode: {
      type: String,
      default: '43'
    },
    imageId: {
      type: String,
      default: '713500110101',
      required: true
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    }
  },
  watch: {
    imageCode: {
      immediate: true,
      handler (val) {
        console.log('hey', '_____');
      }
    },
    imageId: {
      immediate: true,
      handler (val) {
        console.log('hey, Image ID')
      }
    }
  },
  data () {
    return {
      loading: true,
      loadingMessage: 'Loading image...'
    };
  },
  methods: {
    finishLoading ({ status, message }) {
      this.loading = status;
      this.loadingMessage = message;
    }
  },
  mounted () {
    console.log('hey');
  }
};
</script>
<style lang="scss" scoped>
.svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
