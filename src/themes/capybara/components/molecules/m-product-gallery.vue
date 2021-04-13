<template>
  <div class="m-product-gallery">
    <!-- <SfGallery
      ref="gallery"
      :images="gallery"
    /> -->
    <svg-viewer :image-id="imageId" :image-code="imageCode" />
  </div>
</template>

<script>
import isEqual from 'lodash-es/isEqual';
import SvgViewer from 'theme/components/svgViewer/index.vue';
import { mapGetters } from 'vuex';
// import { SfGallery } from '@storefront-ui/vue';

export default {
  name: 'MProductGallery',
  components: {
    // SfGallery
    SvgViewer
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
      getCurrentProduct: 'product/getCurrentProduct'
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
      let code = 1;
      if (this.getCurrentProduct.image_code) {
        return this.getCurrentProduct.image_code;
      } else {
        return code
      }
    }
  },
  watch: {
    currentIndex () {
      this.$refs.gallery.go(this.currentIndex);
    }
  }
};
</script>
<style lang="scss" scoped>
.m-product-gallery {
  flex: 1;
}
</style>
