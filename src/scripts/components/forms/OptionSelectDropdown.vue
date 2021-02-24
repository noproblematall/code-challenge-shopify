<template lang="pug">
  .option-select.option-select--dropdown
    select-input(
      ref="select",
      v-model="currentValue",
      :label="label",
      :options="optionSet",
      required
    )
</template>

<script>
  import SelectInput from 'scripts/components/forms/SelectInput.vue';

  export default {
    name: 'OptionSelectDropdown',
    components: { SelectInput },
    props: {
      value: String,
      product: Object,
      label: String,
      option: {
        type: String,
        default: 'option1',
        validator(val) {
          return ['option1', 'option2', 'option3'].includes(val);
        },
      },
    },
    data() {
      return {
        currentValue: this.value,
      };
    },
    computed: {
      optionSet() {
        const variantOptions = this.product.variants.slice().map((variant) => variant[this.option]);
        return [...new Set(variantOptions)].map((option) => ({ label: option, value: option }));
      },
    },
    watch: {
      currentValue() {
        this.$emit('input', this.currentValue);
      },
    },
    methods: {
      update(newValue) {
        this.$refs.select.update(String(newValue));
      },
    },
  };
</script>

<style scoped lang="scss"></style>
