<template lang="pug">
  form.product-form(@submit.prevent="addToCart", novalidate)
    .product-form__options
      option-select-buttons.product-form__options__option1(
        v-if="hasVariants"
        label="Size"
        :product="product"
        option="option1"
        v-model="selectedOption1"
      )
      option-select-dropdown.product-form__options__option2(
        v-if="hasComplexVariants"
        label="Color"
        :product="product"
        option="option2"
        v-model="selectedOption2"
      )
    p.product-form__price      strong {{ product.price | money }}
    .product-form__atc
      quantity-input.product-form__quantity(
        label="Quantity"
        v-model="quantity"
        :min="1"
        :max="remainingQuantity"
      )
      submit-button(
        :label="buttonLabel"
        :inline="true"
        :disabled="isDisabled"
        :loading="adding"
      )
</template>

<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_learnq"] }] */
import { getVariantFromProduct } from 'scripts/helpers/product.js';
import { purchaseTypeSingle, purchaseTypeRecurring } from 'scripts/config/subscriptions.js';

import Icon from 'scripts/components/basic/Icon.vue';
import RadioInput from 'scripts/components/forms/RadioInput.vue';
import QuantityInput from 'scripts/components/forms/QuantityInput.vue';
import OptionSelectDropdown from 'scripts/components/forms/OptionSelectDropdown.vue';
import OptionSelectButtons from 'scripts/components/forms/OptionSelectButtons.vue';
import SelectInput from 'scripts/components/forms/SelectInput.vue';
import SubmitButton from 'scripts/components/buttons/SubmitButton.vue';

export default {
  name: 'ProductForm',
  components: {
    Icon,
    RadioInput,
    QuantityInput,
    OptionSelectDropdown,
    OptionSelectButtons,
    SelectInput,
    SubmitButton,
  },
  props: {
    product: Object,
  },
  data() {
    return {
      purchaseTypeSingle,
      purchaseTypeRecurring,
      quantity: 1,
      adding: false,
      selectedPurchaseType: purchaseTypeSingle,
      selectedOption1: '',
      selectedOption2: '',
    };
  },
  computed: {
    isDisabled() {
      return this.adding || !this.currentVariantIsAvailable;
    },
    buttonLabel() {
      return this.currentVariantIsAvailable ? 'Add to Cart' : 'Sold Out';
    },
    // variant data
    hasVariants() {
      return this.product ? this.product.variants.length > 1 : false;
    },
    hasComplexVariants() {
      return this.product ? this.product.options.length > 1 : false;
    },
    currentVariant() {
      let currentVariant;

      if (this.hasVariants) {
        currentVariant = this.product.variants.find((variant) => variant.option1 === this.selectedOption1);
      } else if (this.hasComplexVariants) {
        currentVariant = this.product.variants.find((variant) => variant.option1 === this.selectedOption1 && variant.option2 === this.selectedOption2);
      }

      if (currentVariant) {
        return currentVariant;
      }

      // if we're still here... return the first variant
      return this.product.variants[0];
    },
    currentVariantIsAvailable() {
      if (this.currentVariant.inventory_management === '' || this.currentVariant.inventory_policy === 'continue') {
        return true;
      }

      return this.remainingQuantity > 0;
    },
    remainingQuantity() {
      return this.currentVariant.remaining_quantity;
    },
    currentPrice() {
      return this.currentVariant.price;
    },
  },
  mounted() {
    const interval = setInterval(() => {
      if (this.product) {
        clearInterval(interval);
        this.setDefaultOption();
      }
    }, 100);
  },
  methods: {
    publishToKlaviyo(product) {
      const item = {
        Name: product.title,
        ProductID: product.id,
        Categories: product.collections,
        ImageURL: `https:${product.images[0]}`,
        URL: product.url,
        Brand: product.vendor,
        Price: product.price,
        CompareAtPrice: product.compare_at_price,
      };

      // klaviyo
      if (window._learnq) {
        window._learnq.push(['track', 'Added to Cart', item]);
      }
    },
    addToCart() {
      const addProduct = {
        id: this.currentVariant.id,
        quantity: this.quantity,
      };

      this.adding = true;

      this.publishToKlaviyo(this.product);

      this.$store
        .dispatch('cart/addItem', addProduct)
        .then(() => this.$store.dispatch('cart/openSidecart'))
        .catch((error) => this.$store.dispatch('toast/send', { text: error, type: 'error' }))
        .then(() => {
          this.adding = false;
        });
    },
    setDefaultOption() {
      const defaultVariant = this.variantParam ? getVariantFromProduct(this.product, this.variantParam) : this.product.variants[0];

      if (this.$refs.variantSelector) {
        this.$refs.variantSelector.update(defaultVariant.option1);
      }
    },
  },
};
</script>

<style lang="scss">
.product-form {
  margin-top: 36px;

  &__price {
    font-size: rem(16);
    margin-bottom: 15px;
    line-height: 20px;
  }

  &__atc {
    display: flex;
  }

  &__quantity {
    margin-right: 14px;

    > label {
      margin-right: 5px;
    }
  }

  &__options {
    &__option1,
    &__option2,
    &__option3 {
      margin-bottom: $content-gutter;
    }
  }

  &__variant-select-wrapper {
    display: flex;
    margin-bottom: 16px;
  }

  &__savings {
    font-size: rem(12);
    line-height: 1.4;
    margin-top: 10px;
    margin-bottom: 10px;

    @include mobile-only {
      text-align: center;
    }
  }
}
</style>
