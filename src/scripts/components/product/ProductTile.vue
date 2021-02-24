<template lang="pug">
  a.product-tile.u-no-link(:href="product.url", :class="tileClass", @mouseover="enter", @mouseleave="leave")
    .product-tile__image-wrapper(v-if="image")
      img.product-tile__image(:src="currentImage", :alt="image.alt")
      .product-tile__badge(v-if="productBadge")
        .product-tile__badge__text {{ productBadge }}
    .product-tile__content
      h3.product-tile__title {{ product.title }}
      .product-tile__details
        p.product-tile__price(v-if="isOnSale")
          | {{ product.price | moneyWithoutDecimals }}
          span.product-tile__price__original {{ comparePrice | moneyWithoutDecimals }}
        p.product-tile__price(v-else) {{ product.price | moneyWithoutDecimals }}
      .product-tile__cta(v-if="!horizontal")
          primary-button(label="Shop Now")
</template>

<script>
  import { getProductBadge } from 'scripts/helpers/tags.js';
  import { getSizedImageUrl } from 'scripts/helpers/images.js';

  import PrimaryButton from 'scripts/components/buttons/PrimaryButton.vue';

  export default {
    name: 'ProductTile',
    components: { PrimaryButton },
    props: {
      product: Object,
      disableHover: {
        type: Boolean,
        default: false,
      },
      horizontal: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        hovered: false,
      };
    },
    computed: {
      tileClass() {
        return {
          'disable-hover': this.disableHover,
          'product-tile--horizontal': this.horizontal,
        };
      },
      image() {
        const image = this.product.images[0];

        return {
          src: getSizedImageUrl(image.src, '450x'),
          alt: image.alt,
        };
      },
      hoverImage() {
        const image = this.product.images[1];

        return {
          src: getSizedImageUrl(image.src, '450x'),
          alt: image.alt,
        };
      },
      currentImage() {
        return this.hovered && !this.disableHover && this.hoverImage ? this.hoverImage.src : this.image.src;
      },
      productBadge() {
        return getProductBadge(this.product.tags);
      },
      comparePrice() {
        const price = this.product.variants[0].compare_at_price;
        return !Number.isNaN(price) ? price : this.product.price;
      },
      isOnSale() {
        return this.comparePrice > this.product.price;
      },
    },
    methods: {
      enter() {
        if (!this.disableHover) this.hovered = true;
      },
      leave() {
        this.hovered = false;
      },
    },
  };
</script>

<style scoped lang="scss">
  .product-tile {
    position: relative;
    background-color: $bg--light;
    padding: 15px;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    margin: 2px;

    &--horizontal {
      padding: 12px;
      flex-direction: row-reverse;
      text-align: left;
      justify-content: space-between;
    }

    @include tablet-up {
      padding: 30px;
    }

    .slide & {
      height: 100%;
    }

    &__image {
      margin: 0 auto 20px;

      .product-tile--horizontal & {
        margin: 0;
        max-width: 70px;
        align-self: center;
      }
    }

    &__title {
      margin: 0 0 6px;
      font-size: rem(15);
      line-height: 1.4;

      @include tablet-up {
        font-size: rem(18);
      }

      .product-tile--horizontal & {
        font-size: rem(18);
      }
    }

    &__quantity {
      font-weight: bold;
      margin-top: 12px;
      transition: 0.3s ease all;

      &--limited {
        color: $text--accent;
      }

      &--oos {
        color: $text--mid;
      }
    }

    &__price {
      margin: 0;
      font-size: rem(14);
      line-height: 1.4;

      @include tablet-up {
        font-size: rem(18);
      }

      .product-tile--horizontal & {
        font-size: rem(18);
      }
    }

    &__cta {
      padding-top: 10px;
    }
  }
</style>
