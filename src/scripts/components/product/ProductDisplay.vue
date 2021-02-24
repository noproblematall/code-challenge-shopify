<template lang="pug">
  .product-display--wrapper(v-if="product")
    .product-display
      .hero__background
      .container
        .row
          .small-12.medium-7.column
            product-carousel(:images="product.images")
          .small-12.medium-5.column(v-if="$mq !== 'mobile'")
            .product-info
              slot(name="content")
            product-form-gift-card(v-if="product.type === 'Gift Card'" :product="product")
            product-form(v-else :product="product")
            slot(name="icons")
    .container(v-if="$mq === 'mobile'")
      .row
        .column.small-12
          .product-info
            slot(name="content")
          product-form-gift-card(v-if="product.type === 'Gift Card'" :product="product")
          product-form(v-else :product="product")
          slot(name="icons")
</template>

<script>
  import storeProduct from 'scripts/mixins/storeProduct';

  import ProductForm from 'scripts/components/product/ProductForm.vue';
  import ProductFormGiftCard from 'scripts/components/product/ProductFormGiftCard.vue';
  import ProductCarousel from 'scripts/components/product/ProductCarousel.vue';

  export default {
    name: 'ProductDisplay',
    components: { ProductForm, ProductFormGiftCard, ProductCarousel },
    mixins: [storeProduct],
    mounted() {
      // wait for the display to render, then initialize yotpo
      if (window.yotpo) {
        const interval = setInterval(() => {
          if (window.yotpo.initialized && this.$refs.productDisplay) {
            const api = new window.Yotpo.API(window.yotpo);
            api.refreshWidgets();
            clearInterval(interval);
          }
        }, 1000);
      }
    },
  };
</script>

<style scoped lang="scss">
  .product-display {
    position: relative;
    overflow: hidden;
    margin-bottom: $grid-gutter;

    @include mobile-only {
      padding-bottom: 24px;
    }

    &--wrapper {
      @include mobile-only {
        padding-bottom: 24px;
      }
    }

    & > .container {
      margin-top: 24px;

      @include tablet-up {
        z-index: 1;
        position: relative;
        margin-top: 72px;
      }
    }
  }
</style>
