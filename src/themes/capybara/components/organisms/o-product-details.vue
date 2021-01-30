<template>
  <div class="o-product-details product" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    <meta itemprop="priceCurrency" :content="$store.state.storeView.i18n.currencyCode">
    <meta itemprop="price" :content="parseFloat(product.price_incl_tax).toFixed(2)">
    <meta itemprop="availability" :content="availability">
    <meta itemprop="url" :content="product.url_path">
    <MProductGallery
      :gallery="gallery"
      :configuration="productConfiguration"
    />
    <div class="product__info">
      <MProductShortInfo
        :product="product"
        :custom-options="productCustomOptions"
        :reviews="reviews"
      />
      <div>
        <h2 class="add-cart-step-text">Step 1 - Check Compatibility</h2>
        <OmAddCartStep1></OmAddCartStep1>
        <h2 class="add-cart-step-text">Step 2 - Select Delivery Method</h2>
        <OmAddCartStep2></OmAddCartStep2>
        <h2 class="add-cart-step-text">Step 3 - Select Quantity</h2>
        <MProductAddToCart
          class="product__add-to-cart"
          :product="product"
          :stock="productStock"
        />
      </div>
      <MProductAdditionalInfo
        :product="product"
        :reviews="reviews"
        :attributes="productAttributes"
      />
    </div>
  </div>
</template>
<script>
import get from 'lodash-es/get'
import { mapActions } from 'vuex';
import { SfButton } from '@storefront-ui/vue';
import MProductGallery from 'theme/components/molecules/m-product-gallery';
import MProductShortInfo from 'theme/components/molecules/m-product-short-info';
import MProductAddToCart from 'theme/components/molecules/m-product-add-to-cart';
import MProductAdditionalInfo from 'theme/components/molecules/m-product-additional-info';
import MProductOptionsConfigurable from 'theme/components/molecules/m-product-options-configurable';
import MProductOptionsBundle from 'theme/components/molecules/m-product-options-bundle';
import MProductOptionsCustom from 'theme/components/molecules/m-product-options-custom';
import MProductOptionsGroup from 'theme/components/molecules/m-product-options-group';
import OmAddCartStep1 from 'theme/components/omni/om-add-cart-step1'
import OmAddCartStep2 from 'theme/components/omni/om-add-cart-step2'
import { ModalList } from 'theme/store/ui/modals';

export default {
  components: {
    SfButton,
    MProductGallery,
    MProductShortInfo,
    MProductAddToCart,
    MProductAdditionalInfo,
    MProductOptionsConfigurable,
    MProductOptionsBundle,
    MProductOptionsCustom,
    MProductOptionsGroup,
    OmAddCartStep1,
    OmAddCartStep2
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    productGallery: {
      type: Array,
      default: () => []
    },
    productConfiguration: {
      type: Object,
      default: () => ({})
    },
    productCustomOptions: {
      type: Object,
      default: () => ({})
    },
    productAttributes: {
      type: Array,
      default: () => []
    },
    productStock: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    gallery () {
      return this.productGallery.map(imageObject => ({
        id: imageObject.id,
        mobile: {
          url: imageObject.src,
          alt: this.product.name
        },
        desktop: {
          url: imageObject.src,
          alt: this.product.name
        }
      }));
    },
    reviews () {
      const baseReviews = get(this.$store.state.review, 'items.items', [])
      return baseReviews.map((review) => ({
        author: review.nickname,
        date: review.created_at,
        message: `${review.title}: ${review.detail}`,
        rating: 1 // TODO: remove hardcode
      }))
    },
    availability () {
      return this.product.stock && this.product.stock.is_in_stock ? 'InStock' : 'OutOfStock'
    },
    sizeOption () {
      return get(this.productConfiguration, 'size', false)
    }
  },
  methods: {
    ...mapActions('ui', {
      openModal: 'openModal'
    }),
    openSizeGuide () {
      this.openModal({ name: ModalList.SizeGuide })
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto var(--spacer-xs);
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
      padding: 0;
    }
  }
  &__add-to-cart {
    margin: var(--spacer-base) 0 0;
    @include for-desktop {
      margin-top: var(--spacer-sm);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  .add-cart-step-text {
    color: var(--add-cart-step-text-color);
    font-weight: 600;
  }
}

.section {
  border-bottom: 1px solid #f1f2f3;
  padding-bottom: 10px;
  @include for-desktop {
    border: 0;
    padding-bottom: 0;
  }
}
</style>
