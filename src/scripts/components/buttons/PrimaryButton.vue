<template lang="pug">
  button.button(
    type="button", 
    ref="button",
    :class="buttonClass",
    :disabled="isDisabled",
    @click.stop="$emit('click')"
  )
    icon(v-if="icon", :name="icon", :size="iconSize")
    span {{ label }}
</template>

<script>
  import Icon from 'scripts/components/basic/Icon.vue';

  export default {
    name: 'PrimaryButton',
    components: { Icon },
    props: {
      label: String,
      icon: String,
      iconSize: {
        type: String,
        default() {
          return this.small ? '12px' : '16px';
        },
      },
      small: {
        type: Boolean,
        default: false,
      },
      full: {
        type: Boolean,
        default: false,
      },
      secondary: {
        type: Boolean,
        default: false,
      },
      simple: {
        type: Boolean,
        default: false,
      },
      text: {
        type: Boolean,
        default: false,
      },
      flex: {
        type: Boolean,
        default: false,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      buttonClass() {
        return {
          'button--primary': this.secondary === false,
          'button--secondary': this.secondary === true,
          'button--small': this.small === true,
          'button--simple': this.simple === true,
          'button--full': this.full === true,
          'button--text': this.text === true,
          'button--flex': this.flex === true,
          'button--inline': this.inline === true,
        };
      },
      isDisabled() {
        return this.disabled || this.loading;
      },
    },
  };
</script>

<style scoped lang="scss"></style>
