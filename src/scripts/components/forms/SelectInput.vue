<template lang="pug">
  .input.input--select(:class="inputClass")
    label(v-if="label", :for="'select' + _uid", :class="labelClass") {{ label }}
    v-select(
      ref="vSelect",
      v-if="!showNativeSelect",
      :options="optionSet",
      :disabled="disabled",
      :clearable="false",
      :value="selectedValue",
      :placeholder="defaultOption",
      :searchable="false",
      :select-on-tab="true",
      @input="update",
      :components="{ OpenIndicator }"
    )
    select(v-else, v-model="currentValue", :disabled="disabled", :id="'select' + _uid")
      option(v-if="!required", :value="null") {{ defaultOption }}
      option(v-for="option in options", :value="option.value", :key="option.value") {{ option.label }}
    icon(v-if="showNativeSelect", name="chevron-down", size="16px")
</template>

<script>
  import vSelect from 'vue-select';

  import TextInput from 'scripts/components/forms/TextInput.vue';
  import Icon from 'scripts/components/basic/Icon.vue';

  export default {
    name: 'SelectInput',
    components: {
      vSelect,
      Icon,
    },
    extends: TextInput,
    props: {
      options: {
        type: Array,
        default: () => [],
      },
      selected: {
        type: String,
        default: '',
      },
      hideLabel: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        currentValue: '',
        OpenIndicator: {
          template: '<div class="v-select__toggle"><svg :class="{ toggle: true, icon: true }"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-down"></use></svg></div>',
        },
      };
    },
    computed: {
      defaultOption() {
        return this.placeholder !== '' ? this.placeholder : '';
      },
      optionSet() {
        return this.required ? this.options : [{ label: this.defaultOption, value: 'default' }, ...this.options];
      },
      selectedValue() {
        return this.options.find((option) => option.value === this.currentValue);
      },
      showNativeSelect() {
        return this.$mq === 'mobile';
      },
      labelClass() {
        return {
          'u-sr-only': this.hideLabel,
        };
      },
      inputClass() {
        return {
          error: Boolean(this.error),
          disabled: this.disabled,
        };
      },
    },
    watch: {
      currentValue() {
        this.$emit('input', this.currentValue);
      },
    },
    mounted() {
      if (this.required && this.currentValue === '' && this.options.length > 0) {
        this.currentValue = this.options[0].value;
        this.$emit('input', this.currentValue);
      }

      if (this.selected !== '') {
        const selected = { value: this.selected };
        this.updateValue(selected);
      }
    },
    methods: {
      update(newValue) {
        this.currentValue = newValue.value;
      },
      selectVueSelect(event) {
        this.$refs.vSelect.toggleDropdown(event);
      },
    },
  };
</script>

<style scoped lang="scss"></style>
