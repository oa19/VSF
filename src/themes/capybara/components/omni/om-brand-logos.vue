<template>
  <SfCarousel
    class="om-brand-logos"
    :settings="{
      animationDuration: 3000,
      rewind: false,
      perTouch: true,
      gap: 0,
    }"
  >
    <SfCarouselItem v-for="(logo, index) in logos" :key="index">
      <SfImage :src="logo" class="logo-wrapper" :alt="logo" loading="lazy" />
    </SfCarouselItem>
  </SfCarousel>
</template>

<script>
import { SfImage, SfCarousel } from '@storefront-ui/vue';
import StoryblokMixin from 'src/modules/storyblok/components/StoryblokMixin';

export default {
  name: 'OmBrandLogos',
  components: {
    SfImage,
    SfCarousel
  },
  data () {
    return {
      logosMock: new Array(11).fill('assets/brand/Jaguar.png')
    };
  },
  mixins: [StoryblokMixin],
  computed: {
    logos () {
      return this.storyContent && this.storyContent['brand_grid']
        ? this.storyContent['brand_grid'].logos.map(({ logo }) => logo.filename)
        : [];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.om-brand-logos {
  background: white;
  &.sf-carousel {
    ::v-deep .sf-carousel__controls {
      display: none;
    }
    ::v-deep .sf-carousel__wrapper {
      max-width: 100%;
    }
  }
  .sf-carousel-item {
    text-align: center;
    // width: 160px !important;
  }
  ::v-deep .sf-image img {
    transition: transform 0.3s;
    height: 80px;
    width: auto;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }
}
</style>
