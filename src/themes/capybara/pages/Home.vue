<template>
  <div id="home">
    <OmHero />
    <!-- <page :story="story.content" /> -->
    <svg-viewer :image-code="25" :image-id="713500110101" :width="500" :height="500" />
    <SfSection class="section" :title-heading="$t('Shop By Brand')">
      <OmBrandLogos class="brand-logos" />
      <OmCardCollection class="card-collection" />
    </SfSection>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LazyHydrate from 'vue-lazy-hydration';
import { Logger } from '@vue-storefront/core/lib/logger';
import { isServer, onlineHelper } from '@vue-storefront/core/helpers';
import MProductCarousel from 'theme/components/molecules/m-product-carousel';
import ONewsletter from 'theme/components/organisms/o-newsletter';
import AImagesGrid from 'theme/components/atoms/a-images-grid';
import { checkWebpSupport } from 'theme/helpers';
import OmHero from 'theme/components/omni/om-hero/index';
import OmBrandLogos from 'theme/components/omni/om-brand-logos';
import OmCardCollection from 'theme/components/omni/om-card-collection/index';

import { SfHero, SfSection, SfBannerGrid, SfBanner } from '@storefront-ui/vue';
import SvgViewer from 'theme/components/svg-viewer'

export default {
  name: 'Home',
  components: {
    LazyHydrate,
    SfHero,
    SfSection,
    SfBannerGrid,
    SfBanner,
    MProductCarousel,
    ONewsletter,
    AImagesGrid,
    OmHero,
    OmBrandLogos,
    OmCardCollection,
    SvgViewer
  },
  data () {
    return {
      loading: true,
      loadNewsletterPopup: false
    };
  },
  computed: {
    ...mapState({
      isWebpSupported: (state) => state.ui.isWebpSupported
    }),
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      heroImages: 'promoted/getHeadImage',
      promotedOffers: 'promoted/getPromotedOffers',
      newCollection: 'homepage/getEverythingNewCollection',
      dummyInstagramImages: 'instagram/getInstagramImages'
    }),
    isOnline () {
      return onlineHelper.isOnline;
    },
    banners () {
      return checkWebpSupport(
        this.promotedOffers.mainBanners,
        this.isWebpSupported
      );
    },
    heroes () {
      return checkWebpSupport(this.heroImages, this.isWebpSupported);
    },
    instagramImages () {
      return checkWebpSupport(this.dummyInstagramImages, this.isWebpSupported);
    }
  },
  watch: {
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect');
      if (redirectObj) this.$router.push(redirectObj);
      localStorage.removeItem('redirect');
    }
  },
  async asyncData ({ store, context }) {
    Logger.info('Calling asyncData in Home (theme)')();
    if (context) context.output.cacheTags.add(`home`);

    await Promise.all([
      store.dispatch('homepage/fetchNewCollection'),
      store.dispatch('promoted/updateHeadImage'),
      store.dispatch('instagram/updateInstagramImages')
      // store.dispatch('storyblok/fetchAsync', {
      //   value: 'test',
      //   setCurrent: true
      // })
    ]);
    if (context) context.output.cacheTags.add(`storyblok`)
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) {
      this.$bus.$emit('modal-show', 'modal-signup');
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) {
      next((vm) => {
        vm.$store.dispatch('homepage/fetchNewCollection').then(() => {
          vm.loading = false;
        });
      });
    } else {
      next();
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$i18n.t('Home Page'),
      meta: this.$route.meta.description
        ? [
          {
            vmid: 'description',
            name: 'description',
            content: this.$route.meta.description
          }
        ]
        : []
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

#home {
  box-sizing: border-box;
  padding: var(--spacer-sm) var(--spacer-sm);
  background: var(--c-light-variant);
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.sf-hero-item {
  --hero-item-height: 14rem;
  height: initial;
}
.banner-grid {
  margin: var(--spacer-base) 0;
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
  }
}
.brand-logos {
  margin-bottom: var(--spacer-xl);
}
::v-deep .section {
  padding: 0 var(--spacer-xl);
  --section-margin: var(--spacer-xl) 0;
  --section-content-margin: var(--spacer-xl) 0 0 0;
  .sf-heading__title.sf-heading__title--h2 {
    font-weight: 700;
    font-size: 26px;
    color: #444444;
  }
}
</style>
