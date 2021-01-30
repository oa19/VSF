<template>
  <div class="om-card-collection">
    <OmCard
      v-for="(card, index) in cardsMock"
      :key="index"
      :data="card"
    />
  </div>
</template>

<script>
import { SfImage } from '@storefront-ui/vue';
import OmCard from './om-card';

export default {
  name: 'OmCardCollection',
  components: {
    SfImage,
    OmCard
  },
  data () {
    return {
      cardsMock: new Array(6).fill({
        imgUrl:
          'https://cdn.shopify.com/s/files/1/0081/3229/6819/files/BMW_Teaser_Accessoire_Interior.jpg?9121191146221420472',
        title: 'Card Title',
        text:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      })
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.om-card-collection {
  margin: var(--spacer-2xl) 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: var(--spacer-xl);
}
</style>
