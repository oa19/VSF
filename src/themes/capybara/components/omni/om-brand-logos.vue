<template>
  <div class="om-brand-logos">
    <div
      v-for="(logo, index) in logos"
      class="om-brand-logos__item"
      :key="index"
    >
      <SfImage
        :src="logo"
        :srcsets="[]"
        class="logo-wrapper"
        alt="logo"
      />
    </div>
  </div>
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
  list-style-type: none;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  background: #ffffff;
  /* margin-top: 20px; */
  justify-content: space-between;

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
