<template lang="pug">
  .input.input--quantity
    label.u-sr-only(v-if="label") {{ label }}
    icon-button.input--quantity__decrement.u-icon-primary(
      label="Decrease Quantity", 
      icon="minus", 
      size="10px",
      :disabled="disableDecrement",
      @click="decrement"
    )
    input.input--quantity__input(
      type="text", 
      v-model="currentValue",
      :min="min", 
      :max="max" 
      :placeholder="placeholder",
      readonly
    )
    icon-button.input--quantity__increment.u-icon-primary(
      label="Increase Quantity", 
      icon="plus", 
      size="10px",
      :disabled="disableIncrement",
      @click="increment"
    )
</template>

<script>
  import TextInput from 'scripts/components/forms/TextInput.vue';
  import IconButton from 'scripts/components/buttons/IconButton.vue';

  export default {
    name: 'QuantityInput',
    components: { TextInput, IconButton },
    extends: TextInput,
    props: {
      min: {
        type: Number,
        default: 0,
      },
      max: Number,
      value: Number,
      disableIncrement: {
        type: Boolean,
        default: false,
      },
      disableDecrement: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      increment() {
        if (typeof this.max === 'undefined' || this.currentValue < this.max) this.currentValue += 1;
      },
      decrement() {
        if (this.currentValue > this.min) this.currentValue -= 1;
      },
    },
  };
</script>

<style scoped lang="scss">
  .input--quantity {
    position: relative;
    max-width: 105px;
    flex-shrink: 0;

    &__input {
      border-radius: 23px;
    }

    &__increment,
    &__decrement {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &.button {
        padding: 16px;
      }

      &[disabled] {
        opacity: 0.4;

        &,
        &:hover {
          background-color: transparent;
        }
      }
    }

    &__increment {
      right: 0;
    }

    &__decrement {
      left: 0;
    }

    [type='text'] {
      background-color: transparent;
      color: $color--primary;
      letter-spacing: 1.88px;
      border: 2px solid $color--primary;
      padding-left: 40px;
      padding-right: 40px;
      text-align: center;
      font-weight: bold;
    }

    .icon {
      fill: $color--primary;
    }
  }
</style>
