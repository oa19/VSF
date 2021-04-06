<template>
  <div class="m-menu sf-mega-menu bg-white">
    <SfMegaMenu
      :title="title || currentCategoryTitle"
      :visible="visible"
    >
      <SfMegaMenuColumn
        :title="title"
      >
        <SfList>
          <SfListItem
            v-for="category in categoriesIds"
            :key="category._uid"
          >
            <router-link
              to="/"
              @click.native="$emit('close')"
            >
              <SfMenuItem :label="category.tier_2_name" @mouseover.native="setCurrentCategory(category)" />
            </router-link>
          </SfListItem>
        </SfList>
      </SfMegaMenuColumn>
      <SfMegaMenuColumn
        v-if="showSubCategories"
      >
        <SfList>
          <transition name="sf-fade">
            <SfListItem
              v-for="category in currentCategory.tier_3_linked"
              :key="category._uid"
            >
              <router-link
                :to="category.tier_3_link_url.linktype"
                @click.native="$emit('close')"
              >
                <SfMenuItem :label="category.tier_3_link_title" />
              </router-link>
            </SfListItem>
          </transition>
        </SfList>
      </SfMegaMenuColumn>
      <template #aside>
        <div class="aside-menu">
          <SfBanner
            v-for="(banner, i) in banners"
            :key="i"
            :title="banner.title"
            :image="banner.image"
            class="aside-banner"
            :class="`aside-banner--${banner.type}`"
          />
        </div>
      </template>
    </SfMegaMenu>
  </div>
</template>
<script>
import { SfMegaMenu, SfList, SfMenuItem, SfBanner } from '@storefront-ui/vue';
import { mapGetters, mapState } from 'vuex';
import { checkWebpSupport } from 'theme/helpers'
export default {
  components: { SfMegaMenu, SfList, SfMenuItem, SfBanner },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    categoriesIds: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    visible (value) {
      this.currentCategory = null
    }
  },
  computed: {
    ...mapState({
      isWebpSupported: state => state.ui.isWebpSupported
    }),
    ...mapGetters({
      getCategories: 'category/getCategories',
      getCurrentCategory: 'category/getCurrentCategory',
      getPromotedOffers: 'promoted/getPromotedOffers'
    }),
    currentCategoryTitle () {
      return this.getCurrentCategory.name || ''
    },
    banners () {
      return checkWebpSupport(this.getPromotedOffers.menuAsideBanners, this.isWebpSupported)
    },
    showSubCategories () {
      return !!this.currentCategory
    }
  },
  methods: {
    setCurrentCategory (category) {
      this.currentCategory = category
    }
  },
  data () {
    return {
      currentCategory: null
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
.m-menu {
  padding: 0;
  position: absolute;
  left: 0;
  width: 100%;
  top: 100%;
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: 0.2s;
  .router-link-exact-active {
    --menu-item-font-weight: bold;
  }
}
.aside-menu {
  display: flex;
  justify-content: stretch;
  flex-wrap: wrap;
  @include for-desktop {
     justify-content: space-between;
  }
}
.aside-banner {
  margin-bottom: var(--spacer-sm);
  text-transform: uppercase;
  --banner-height: 300px;
  &--mobile {
    display: none;
    @include for-mobile {
      display: block;
    }
  }
  &--desktop {
    --banner-width: 300px;
    display: none;
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      display: block;
    }
  }
}
</style>
