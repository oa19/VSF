<template>
  <div class="m-product-gallery">
    <SfGallery
      v-if="isJpgRender"
      ref="gallery"
      :images="gallery"
    />
    <svg-viewer
      v-if="!isJpgRender"
      :is-full-image="isFullImage"
      :image-id="imageId"
      :image-code="imageCode"
    />
    <SfIcon
      v-if="!isJpgRender"
      :icon="buttonIcon"
      size="lg"
      color="red"
      role="button"
      class="button"
      @click="handleClick"
    />
  </div>
</template>

<script>
import isEqual from 'lodash-es/isEqual';
import SvgViewer from 'theme/components/svg-viewer.vue';
import { mapGetters } from 'vuex';
import { SfButton, SfIcon, SfGallery } from '@storefront-ui/vue';

export default {
  name: 'MProductGallery',
  components: {
    // SfGallery
    SvgViewer,
    SfButton,
    SfIcon,
    SfGallery
  },
  props: {
    gallery: {
      type: Array,
      required: true
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  computed: {
    variantImage () {
      let variantImage = this.gallery.find((image) => {
        let selectThis = true;
        for (const [key, value] of Object.entries(this.configuration)) {
          if (
            typeof image.id !== 'undefined' &&
            typeof image.id[key] !== 'undefined' &&
            image.id[key] !== value.id
          ) {
            selectThis = false;
          }
        }
        return (
          selectThis ||
          (image.id &&
            image.id.color &&
            String(image.id.color) === String(this.configuration.color.id))
        );
      });

      if (!variantImage) {
        variantImage = this.gallery.find((image) => {
          return (
            typeof image.id.color !== 'undefined' &&
            typeof this.configuration.color !== 'undefined' &&
            String(image.id.color) === String(this.configuration.color.id)
          );
        });
      }

      if (!variantImage) {
        variantImage = this.gallery[0];
      }

      return variantImage;
    },
    currentIndex () {
      const index = this.gallery.findIndex((imageObject) =>
        isEqual(imageObject.id, this.variantImage.id)
      );

      return index === -1 ? 0 : index;
    },
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct',
      getAttributeLabelById: 'vehicles/getAttributeLabelById'
    }),
    imageId () {
      if (this.getCurrentProduct && this.getCurrentProduct.image_id) {
        const imageIdAry = this.getCurrentProduct.image_id.split('.');
        return imageIdAry[0];
      } else {
        return '713500110101';
      }
    },
    imageCode () {
      let code = '1';
      if (this.getCurrentProduct.image_code) {
        return this.getCurrentProduct.image_code;
      } else {
        return code;
      }
    },
    buttonIcon () {
      return this.isFullImage ? 'arrow_left' : 'arrow_right'
    },
    isJpgRender () {
      const productLabel = this.getAttributeLabelById('product_type', this.getCurrentProduct.product_type)
      if (productLabel === 'accessories') {
        return true;
      } else {
        return false;
      }
    }
  },
  data () {
    return {
      isFullImage: false
    }
  },
  watch: {
    currentIndex () {
      this.$refs.gallery.go(this.currentIndex);
    }
  },
  methods: {
    handleClick () {
      this.isFullImage = !this.isFullImage
    }
  }
};
</script>
<style lang="scss" scoped>
.m-product-gallery {
  flex: 1;
  position: relative;
  .button {
    position: absolute;
    bottom: 130px;
    right: 0;
    cursor: pointer;
  }
}
</style>
