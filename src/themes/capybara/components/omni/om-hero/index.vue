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
        <div class="hero-content-selector">
          <FilterSelect
            v-for="(data, i) in selectorData"
            :key="i"
            :dropdown-data="getCurrentSelectorData(i, data)"
            :dropdown-index="i"
            @toggle-dropdown="toggleDropdown"
            @hide-dropdown="hideDropdown"
            @dropdown-item-click="dropdownItemClick"
          />
        </div>
        <SfButton
          class="color-primary search-button"
          @click="onSearch"
          :disabled="disableSearch()"
        >
          <div class="search-button-content">
            SELECT &<br>
            SAVE MODEL
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
import { mapState, mapActions, mapGetters } from 'vuex';
import { SfCallToAction, SfButton } from '@storefront-ui/vue';
import { checkWebpSupport } from 'theme/helpers';
import LHero from 'theme/components/lexas/l-hero';
import FilterSelect from './filter-select';
import vehicleData from 'theme/resource/vehicles.json';
import { getTopLevelCategories } from 'theme/helpers';
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers';
import * as VehicleStorage from 'theme/store/vehicles-storage';

export const dropdownKeys = [
  'Brand',
  'Model',
  'Year',
  'Bodytype',
  'Fuel',
  'Engine Size',
  'Trim'
];

export default {
  name: 'OmHero',
  components: {
    SfCallToAction,
    SfButton,
    LHero,
    FilterSelect
  },
  computed: {
    ...mapState({
      isWebpSupported: (state) => state.ui.isWebpSupported
    }),
    ...mapGetters({
      getAttributeIdByLabel: 'vehicles/getAttributeIdByLabel'
    }),
    ...mapGetters('category', ['getCategories', 'getCurrentCategory']),
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
    },
    vehicles () {
      return vehicleData[VehicleStorage.VEHICLE_DATA_KEY];
    },
    categories () {
      return getTopLevelCategories(this.getCategories);
    }
  },
  data () {
    return {
      initialSelectorData: [],
      selectorData: [],
      selectedItems: {},
      resultProducts: []
    };
  },
  methods: {
    ...mapActions('ui', {
      openModal: 'openModal'
    }),
    async onSearch () {
      const filteredVehicles = this.vehicles.find((data) => {
        return Object.values(this.selectedItems).every(
          (item) => Object.values(data).indexOf(item) >= 0
        );
      });
      VehicleStorage.saveVehicles(filteredVehicles.National_code)
      this.$router.push(formatCategoryLink(this.categories[0]));
    },
    toggleDropdown (kindIndex) {
      this.selectorData = this.selectorData.map((d, index) => {
        if (index === kindIndex) {
          d.showDropdown = !d.showDropdown;
        } else {
          d.showDropdown = false;
        }
        return d;
      });
    },
    hideDropdown () {
      this.selectorData.forEach((d) => {
        d.showDropdown = false;
      });
    },
    getCurrentSelectorData (index, dropdownItems) {
      const newDropdownItems = Object.assign(dropdownItems);
      if (this.selectedItems[`level${index + 1}`]) {
        const filteredVehicles = this.vehicles.filter((data) => {
          return Object.values(this.selectedItems).every(
            (item) => Object.values(data).indexOf(item) >= 0
          );
        });
        if (index + 2 <= dropdownKeys.length) {
          const nextDropdownItems = this.getLevelNDropdownItems(
            filteredVehicles,
            index + 2
          );
          this.selectorData[index + 1].items = nextDropdownItems;
        }
      }

      return newDropdownItems;
    },
    dropdownItemClick (data, index) {
      this.selectedItems[`level${index + 1}`] = data;
      for (let i = index + 1; i < dropdownKeys.length; i++) {
        delete this.selectedItems[`level${i + 1}`];
      }
    },
    getLevelNDropdownItems (source, level) {
      const dropdownItems = source.reduce((result, vehicle) => {
        if (!result.includes(vehicle[`level${level}`])) {
          result = [...result, vehicle[`level${level}`]];
        }
        return result;
      }, []);

      return dropdownItems;
    },
    disableSearch () {
      return Object.values(this.selectedItems).length !== dropdownKeys.length;
    }
  },
  mounted () {
    const level1DropdownItems = this.getLevelNDropdownItems(this.vehicles, 1);
    this.initialSelectorData = dropdownKeys.map((key, index) => {
      const result = {
        text: `Select ${key}`,
        showDropdown: false,
        items: []
      };
      if (index === 0) {
        result.items = level1DropdownItems;
      }
      return result;
    });
    /*
      {"text":"Select Brand","showDropdown":false,"items":["BMW","Nissan"]}
     */
    this.selectorData = this.initialSelectorData;
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
    .hero-content-selector {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 10px;
      align-items: center;
    }
    .hero-content-selector::after {
      content: "";
      flex: auto;
    }
  }
  .search-button {
    width: 8.75rem;
    margin-left: 10px;
    .search-button-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
