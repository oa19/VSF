<template>
  <SfCallToAction
    class="om-hero"
    :title="$t('Subscribe to Newsletters')"
    :description="
      $t(
        'Be aware of upcoming sales and events. Receive gifts and special offers!'
      )
    "
    :image="newsletterImage"
  >
    <template #button>
      <div class="hero-content">
        <FilterSelect
          v-for="(data, i) in filterSelectBtnsData"
          :key="i"
          :selectButtonData="data"
          :popupData="filterPopUpMock"
          @update-status="changeStatus"
        />
        <SfButton
          class="color-primary search-button"
          @click="showNewsletterPopup"
        >
          <div class="search-button-content">
            Search
            <SfIcon
              icon="search"
              size="xs"
              color="white"
              view-box="0 0 24 24"
              :coverage="1"
            />
          </div>
        </SfButton>
      </div>
    </template>
    <template #title>
      <div class="title">
        SUB TITLE PULLED FROM API
      </div>
    </template>
    <template #description>
      <LHero id="3b9678b7-23ad-4b61-bf13-7dfc7fdcc5dc" />
    </template>
  </SfCallToAction>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SfCallToAction, SfButton, SfIcon } from '@storefront-ui/vue';
import { checkWebpSupport } from 'theme/helpers';
import { ModalList } from 'theme/store/ui/modals';
import LHero from 'theme/components/lexas/l-hero';
import FilterSelect from './filter-select';

export default {
  name: 'OmHero',
  components: {
    SfCallToAction,
    SfButton,
    LHero,
    FilterSelect,
    SfIcon
  },
  computed: {
    ...mapState({
      isWebpSupported: (state) => state.ui.isWebpSupported
    }),
    newsletterImage () {
      return checkWebpSupport(
        [
          {
            image: {
              webp: '/assets/hero/background.jpg',
              fallback: '/assets/hero/background.jpg'
            }
          }
        ],
        this.isWebpSupported
      )[0].image;
    }
  },
  data () {
    return {
      filterSelectBtnsData: [
        { text: 'Select Make', popupIsOpen: false },
        { text: 'Select Model', popupIsOpen: false },
        { text: 'Select Trim', popupIsOpen: false },
        { text: 'Select Year', popupIsOpen: false }
      ],
      filterPopUpMock: new Array(9).fill({ icon: '', text: 'Abarth', quantity: 3 })
    };
  },
  methods: {
    ...mapActions('ui', {
      openModal: 'openModal'
    }),
    showNewsletterPopup () {
      this.openModal({ name: ModalList.Newsletter });
    },
    changeStatus (text) {
      this.filterSelectBtnsData.forEach((d) => {
        if (d.text === text) {
          d.popupIsOpen = !d.popupIsOpen
        } else {
          d.popupIsOpen = false
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
.om-hero {
  margin: var(--spacer-xl) 0;
  box-sizing: border-box;
  display: block;
  @include for-desktop {
    margin: calc(var(--spacer-sm)) 0;
    border-radius: var(--border-radius);
  }
  .title {
    color: white;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 3px;
    margin-bottom: 7px;
  }
  .hero-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12rem;
    padding: 1rem;
    background: white;
    border-radius: var(--border-radius);
    .select-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .search-button {
    width: 8.75rem;
    .search-button-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sf-icon {
        margin-left: 1rem;
      }
    }
  }
  ::v-deep .filter-select:last-child .select-button {
    margin-right: 0;
  }
}
</style>
